import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react'

const fieldBase =
  'w-full bg-surface text-ink placeholder:text-ink-muted rounded-clay-md px-5 py-3.5 ' +
  'shadow-neu-inset border-none outline-none transition-shadow duration-200 ' +
  'focus-visible:shadow-focus-ring font-medium'

interface LabelWrapProps {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  htmlFor?: string
  children: ReactNode
}

export function Field({ label, hint, error, required, htmlFor, children }: LabelWrapProps) {
  return (
    <label className="flex flex-col gap-2 w-full" htmlFor={htmlFor}>
      {label && (
        <span className="text-xs font-semibold tracking-[0.16em] uppercase text-ink-soft pl-1">
          {label}
          {required && <span className="text-clay-pink-deep ml-1">*</span>}
        </span>
      )}
      {children}
      {hint && !error && <span className="text-xs text-ink-muted pl-1">{hint}</span>}
      {error && <span className="text-xs font-medium text-clay-pink-deep pl-1">{error}</span>}
    </label>
  )
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className = '', ...rest }, ref) {
    return <input ref={ref} className={`${fieldBase} ${className}`} {...rest} />
  },
)

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className = '', rows = 4, ...rest }, ref) {
    return <textarea ref={ref} rows={rows} className={`${fieldBase} resize-none ${className}`} {...rest} />
  },
)

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className = '', children, ...rest }, ref) {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={`${fieldBase} appearance-none pr-12 cursor-pointer ${className}`}
          {...rest}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-ink-soft">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    )
  },
)

export default Input
