import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import SectionHeading from './SectionHeading'
import { CONTACT_EMAIL, FORM_ACTION, FORM_HIDDEN_FIELDS, IS_FORM_CONFIGURED } from '../config/contact'
import { profile } from '../data/resume'
import { HONEYPOT_FIELD, submitContactForm } from '../utils/contact'

type SubmitState = 'idle' | 'sending' | 'success' | 'error'
type CopyTarget = 'email' | 'phone' | null

interface FormFields {
  name: string
  email: string
  message: string
}

type FieldErrors = Partial<Record<keyof FormFields, string>>

const EMPTY_FIELDS: FormFields = { name: '', email: '', message: '' }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(fields: FormFields): FieldErrors {
  const errors: FieldErrors = {}

  if (!fields.name.trim()) {
    errors.name = 'Name is required.'
  }

  const email = fields.email.trim()
  if (!email) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'That email address does not look valid.'
  }

  const message = fields.message.trim()
  if (!message) {
    errors.message = 'Please write a message.'
  } else if (message.length < 10) {
    errors.message = 'Message looks too short — 10 characters minimum.'
  }

  return errors
}

export default function ContactSection() {
  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<SubmitState>('idle')
  const [statusMsg, setStatusMsg] = useState('')
  const [copied, setCopied] = useState<CopyTarget>(null)
  const honeypot = useRef<HTMLInputElement>(null)
  const copyTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const update = (key: keyof FormFields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }))
    // Clear the error for a field as soon as the visitor edits it.
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
    if (state === 'error') setState('idle')
  }

  const copy = async (value: string, target: Exclude<CopyTarget, null>) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(target)
      clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(null), 2200)
    } catch {
      // Clipboard access can be blocked; the mailto/tel links still work.
      setCopied(null)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (state === 'sending') return

    // Honeypot filled in => almost certainly a bot. Pretend it worked.
    if (honeypot.current?.value) {
      setState('success')
      setStatusMsg('Thanks! Your message has been sent.')
      setFields(EMPTY_FIELDS)
      return
    }

    const nextErrors = validate(fields)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setState('error')
      setStatusMsg('Please fix the highlighted fields and try again.')
      return
    }

    if (!IS_FORM_CONFIGURED) {
      setState('error')
      setStatusMsg('The contact form is not connected yet — please email me directly.')
      return
    }

    setState('sending')
    setStatusMsg('Sending your message…')

    try {
      await submitContactForm(
        {
          name: fields.name.trim(),
          email: fields.email.trim(),
          message: fields.message.trim(),
        },
        honeypot.current?.value ?? ''
      )
      setState('success')
      setStatusMsg('Message sent! I usually reply within a day or two.')
      setFields(EMPTY_FIELDS)
    } catch (err) {
      setState('error')
      setStatusMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const submitLabel =
    state === 'sending'
      ? '⏳ Sending…'
      : state === 'success'
        ? '✅ Message Sent!'
        : state === 'error'
          ? '⚠️ Failed – Retry'
          : '📨 Send Message'

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="absolute inset-0 bg-[#1a1a2e]/75 backdrop-blur-[0.5px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="▸ LET'S BUILD SOMETHING"
          title="✉️ Mailbox"
          subtitle="Open to conversations about senior data engineering, lakehouse architecture, and AI-ready platforms."
        />

        {/* Direct contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <ContactCard
            icon="📧"
            label="Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
            color="#4AEDD9"
            copied={copied === 'email'}
            onCopy={() => copy(profile.email, 'email')}
          />
          <ContactCard
            icon="📱"
            label="Phone"
            value={profile.phone}
            href={`tel:${profile.phoneHref}`}
            color="#17DD62"
            copied={copied === 'phone'}
            onCopy={() => copy(profile.phone, 'phone')}
          />
          <ContactCard
            icon="🔗"
            label="LinkedIn"
            value={profile.linkedinLabel}
            href={profile.linkedin}
            color="#FCDB05"
            external
            copied={false}
          />
        </div>

        <div className="mc-panel scroll-animate-up">
          {/* Setup notice — visible only until a provider endpoint is configured */}
          {!IS_FORM_CONFIGURED && (
            <div className="mb-6 border-2 border-[#FCDB05] bg-[#FCDB05]/10 p-4">
              <p className="pixel-font text-[8px] text-[#FCDB05] mb-2">
                ⚠️ SETUP REQUIRED
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                The contact form is not connected to a mail provider yet. Please reach out
                directly at{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[#4AEDD9] underline decoration-dotted underline-offset-2 hover:text-[#FCDB05] transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          )}

          <form
            action={FORM_ACTION}
            method="POST"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            {/* Honeypot — hidden from humans, tempting for bots */}
            <div className="mc-hp" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name={HONEYPOT_FIELD}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                ref={honeypot}
              />
            </div>

            {/* Used by the no-JavaScript fallback so the native POST still
                produces a titled, well-formatted notification email. */}
            {Object.entries(FORM_HIDDEN_FIELDS).map(([name, value]) => (
              <input key={name} type="hidden" name={name} value={value} readOnly />
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                id="contact-name"
                name="name"
                label="Your Name"
                placeholder="Steve"
                value={fields.name}
                error={errors.name}
                onChange={(v) => update('name', v)}
              />
              <Field
                id="contact-email"
                name="email"
                label="Your Email"
                type="email"
                placeholder="steve@example.com"
                value={fields.email}
                error={errors.email}
                onChange={(v) => update('email', v)}
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="pixel-font text-[9px] sm:text-[10px] text-[#4AEDD9] block mb-2"
              >
                ▸ MESSAGE
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me about the role, the team, or the project…"
                value={fields.message}
                onChange={(e) => update('message', e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className="mc-input"
              />
              {errors.message && (
                <p id="contact-message-error" className="text-xs text-[#FF7B72] mt-2">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Status / error banner */}
            <div aria-live="polite" aria-atomic="true">
              {statusMsg && (
                <p
                  className={`text-sm border-2 px-3 py-2 ${
                    state === 'success'
                      ? 'border-[#17DD62] text-[#17DD62] bg-[#17DD62]/10'
                      : 'border-[#B02E26] text-[#FF6B6B] bg-[#B02E26]/10'
                  }`}
                >
                  {statusMsg}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={state === 'sending' || !IS_FORM_CONFIGURED}
                className="mc-btn bg-[#4A7A2E] hover:bg-[#5D8C3E] disabled:opacity-70 disabled:cursor-wait text-xs sm:text-sm w-full sm:w-auto"
              >
                {submitLabel}
              </button>

              <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                Or email me directly at{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[#4AEDD9] underline decoration-dotted underline-offset-2 hover:text-[#FCDB05] transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}

interface ContactCardProps {
  icon: string
  label: string
  value: string
  href: string
  color: string
  external?: boolean
  copied: boolean
  onCopy?: () => void
}

function ContactCard({ icon, label, value, href, color, external, copied, onCopy }: ContactCardProps) {
  return (
    <div
      className="mc-panel flex flex-col gap-2 transition-transform duration-300 hover:-translate-y-1"
      style={{ borderColor: `${color}66` }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl" aria-hidden="true">{icon}</span>
        <span className="pixel-font text-[8px]" style={{ color }}>
          {label.toUpperCase()}
        </span>
      </div>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="text-sm sm:text-base text-gray-200 hover:text-white underline decoration-dotted underline-offset-2 break-all"
      >
        {value}
      </a>
      {onCopy && (
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${label} to clipboard`}
          className="text-[10px] self-start px-2 py-1 border border-[#5A5A5A] bg-[#2C2C2C] text-gray-400 hover:text-white hover:border-[#7F7F7F] transition-colors"
          aria-live="polite"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      )}
    </div>
  )
}

interface FieldProps {
  id: string
  name: string
  label: string
  type?: string
  placeholder?: string
  value: string
  error?: string
  onChange: (value: string) => void
}

function Field({ id, name, label, type = 'text', placeholder, value, error, onChange }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="pixel-font text-[9px] sm:text-[10px] text-[#4AEDD9] block mb-2"
      >
        ▸ {label.toUpperCase()}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mc-input"
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-[#FF7B72] mt-2">
          {error}
        </p>
      )}
    </div>
  )
}
