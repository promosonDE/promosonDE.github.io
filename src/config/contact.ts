/**
 * Contact form configuration.
 *
 * The site is a static build (no backend), so submissions are forwarded to a
 * form-to-email provider which mails them to CONTACT_EMAIL.
 */

/** Where submitted messages are delivered. */
export const CONTACT_EMAIL = 'Promosonpoudel440@gmail.com'

/**
 * Provider used to forward submissions.
 *
 * Switching provider only requires changing `PROVIDER`, `FORM_ENDPOINT` and
 * `FORM_ACTION` below — the payload builder in `src/utils/contact.ts` already
 * carries the field names every supported provider looks for.
 */
export type FormProvider = 'formspree' | 'formsubmit' | 'web3forms' | 'basin'

export const PROVIDER: FormProvider = 'formspree'

/**
 * Formspree form ID, taken from the dashboard's Integration tab
 * (the endpoint there looks like `https://formspree.io/f/xxxxxxxx`).
 *
 * Set `VITE_FORMSPREE_ID` in your host's build environment to keep the ID out
 * of the repository — useful so you can point staging and production at
 * different forms. Falls back to editing the constant below.
 */
const FORMSPREE_ID =
  (import.meta.env.VITE_FORMSPREE_ID as string | undefined)?.trim() || 'YOUR_FORM_ID'

/**
 * Endpoint that receives the POST and emails the submission.
 *
 *   formspree  : https://formspree.io/f/<your-form-id>
 *   formsubmit : https://formsubmit.co/ajax/<your-email>
 *   web3forms  : https://api.web3forms.com/submit
 *   basin      : https://usebasin.com/api/v1/<your-token>
 *
 * While this is still a placeholder the form shows a setup notice and refuses
 * to submit, so visitors never hit a silent failure.
 */
export const FORM_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`

/**
 * Plain endpoint used as the `<form action>` when JavaScript is unavailable —
 * the browser posts directly and Formspree shows its thank-you page.
 */
export const FORM_ACTION = FORM_ENDPOINT

/** Subject line used for the notification email. */
export const FORM_SUBJECT = 'New portfolio enquiry'

/** Extra payload fields some providers require (e.g. Web3Forms `access_key`). */
export const FORM_EXTRA_FIELDS: Record<string, string> = {}

/**
 * Hidden inputs rendered inside the `<form>` so the no-JavaScript fallback
 * still produces a titled, well-formatted notification email.
 */
const HIDDEN_FIELD_NAMES: Record<FormProvider, Record<string, string>> = {
  formspree: { subject: FORM_SUBJECT },
  formsubmit: { _subject: FORM_SUBJECT, _template: 'table' },
  web3forms: { subject: FORM_SUBJECT },
  basin: { _subject: FORM_SUBJECT },
}

export const FORM_HIDDEN_FIELDS: Record<string, string> = {
  ...HIDDEN_FIELD_NAMES[PROVIDER],
  ...FORM_EXTRA_FIELDS,
}

/** True once the endpoint points at a real provider. */
export const IS_FORM_CONFIGURED = !/YOUR_FORM_ID|<your-/i.test(FORM_ENDPOINT)
