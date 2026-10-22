import {
  FORM_ENDPOINT,
  FORM_EXTRA_FIELDS,
  FORM_SUBJECT,
  PROVIDER,
  type FormProvider,
} from '../config/contact'

export interface ContactMessage {
  name: string
  email: string
  message: string
}

/** Error raised when the provider rejects the submission. */
export class ContactFormError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ContactFormError'
  }
}

/**
 * Field each provider uses as a honeypot. They are hidden from humans, so a
 * value in here means a bot filled the form in.
 */
const HONEYPOT_FIELDS: Record<FormProvider, string> = {
  formspree: '_gotcha',
  formsubmit: '_honey',
  web3forms: 'botcheck',
  basin: '_gotcha',
}

export const HONEYPOT_FIELD = HONEYPOT_FIELDS[PROVIDER]

/**
 * Builds the request body for the active provider.
 *
 * Only the names differ between providers — the values are the same — so this
 * stays in one place instead of leaking provider details into the component.
 */
function buildPayload(data: ContactMessage, honeypot: string, senderEmail: string): URLSearchParams {
  const fields: Record<string, string> = {
    name: data.name,
    email: data.email,
    message: data.message,
    ...FORM_EXTRA_FIELDS,
  }

  switch (PROVIDER) {
    case 'formspree':
      // `email` doubles as the Reply-To; `subject` sets the notification title.
      fields.subject = FORM_SUBJECT
      fields._gotcha = honeypot
      break
    case 'formsubmit':
      fields._replyto = senderEmail
      fields._subject = FORM_SUBJECT
      fields._template = 'table'
      fields._honey = honeypot
      break
    case 'web3forms':
      fields.subject = FORM_SUBJECT
      fields.botcheck = honeypot
      break
    case 'basin':
      fields._subject = FORM_SUBJECT
      fields._gotcha = honeypot
      break
  }

  return new URLSearchParams(fields)
}

/**
 * Posts a message to the configured form-to-email endpoint.
 *
 * The body is form-encoded rather than JSON on purpose: it is a "simple"
 * content type, so the browser skips the CORS preflight entirely. We still ask
 * for a JSON response with `Accept: application/json`, which makes the provider
 * report a rejection as a useful message instead of a generic failure.
 *
 * Note: the endpoint ships in the public JS bundle, so the provider should be
 * restricted to your own domain (Formspree: Settings → Restrict to Domain).
 */
export async function submitContactForm(
  data: ContactMessage,
  honeypot = ''
): Promise<void> {
  const body = buildPayload(data, honeypot, data.email)

  let response: Response

  // The provider can be slow on a cold start, so cap the wait rather than
  // leaving the visitor staring at a spinner.
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30000)

  try {
    response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Accept: 'application/json',
      },
      body,
      signal: controller.signal,
    })
  } catch {
    if (controller.signal.aborted) {
      throw new ContactFormError('The request timed out — please try again, or email me directly.')
    }
    throw new ContactFormError('Network error — check your connection and try again.')
  } finally {
    clearTimeout(timeout)
  }

  const payload = await readJson(response)

  // Providers report failures in two different ways:
  //   - an HTTP error status (e.g. Formspree's 429 rate limit), or
  //   - HTTP 200 with `success: false` in the body (FormSubmit does this).
  // Both must be treated as a failure, otherwise visitors are told their
  // message was sent when it was not.
  const failed = payload?.success === false || payload?.success === 'false'

  if (!response.ok || failed) {
    // Formspree allows 20 submissions per minute per IP, then answers 429.
    // Its own wording ("Too many requests") means nothing to a visitor.
    if (response.status === 429) {
      throw new ContactFormError(
        'Too many messages sent from this network — please wait a minute and try again.'
      )
    }
    throw new ContactFormError(providerMessage(payload, response.status))
  }
}

/** Reads the response body as JSON, tolerating a non-JSON body. */
async function readJson(response: Response): Promise<Record<string, unknown> | null> {
  const text = await response.text()
  if (!text) return null
  try {
    const parsed = JSON.parse(text)
    return typeof parsed === 'object' && parsed !== null ? parsed : null
  } catch {
    return null
  }
}

/** Turns a provider failure into a message that makes sense to a visitor. */
function providerMessage(payload: Record<string, unknown> | null, status: number): string {
  const errors = payload?.errors as { message?: string; field?: string }[] | undefined
  const firstFieldError = errors?.[0]
  const detail = String(
    payload?.error ?? payload?.message ?? firstFieldError?.message ?? ''
  )

  // The endpoint exists but has not been activated yet — a one-off state that
  // resolves itself once the activation email is confirmed.
  if (/activation|activat/i.test(detail)) {
    return 'The contact form is being activated — please email me directly in the meantime.'
  }

  if (/restrict|domain|allowed origin/i.test(detail)) {
    return 'The contact form is not allowed to send from this address — please email me directly.'
  }

  if (firstFieldError?.field) {
    return `${firstFieldError.field}: ${firstFieldError.message ?? 'is not valid'}`
  }

  if (detail) return detail
  return `The server responded with ${status}. Please try again.`
}
