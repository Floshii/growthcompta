import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'accent' | 'ghost' | 'ghost-dark'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  href?: string
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
  className?: string
  'aria-label'?: string
  type?: 'button' | 'submit' | 'reset'
  external?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-ink text-white border-transparent hover:-translate-y-px',
  accent: 'bg-accent text-white border-transparent hover:bg-accent-deep hover:-translate-y-px',
  ghost: 'bg-transparent text-ink border-line hover:border-ink hover:bg-paper',
  'ghost-dark': 'bg-transparent text-white border-white/20 hover:bg-white/8 hover:border-white/40',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2.5 text-sm',
  md: 'px-[22px] py-[14px] text-[15px]',
  lg: 'px-7 py-4 text-[15px]',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  external = false,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2.5 font-sans font-medium rounded-full border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 group'
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  const arrowEl = (
    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
      ↗
    </span>
  )

  if (href) {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} {...linkProps}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={classes} aria-label={ariaLabel}>
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}
