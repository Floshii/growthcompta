interface LogoMarkProps {
  size?: number
  ink?: string
  accent?: string
}

export default function LogoMark({ size = 24, ink = 'currentColor', accent = 'var(--color-accent)' }: LogoMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <rect x="3" y="34" width="38" height="3" rx="1.5" fill={ink} />
      <rect x="6" y="24" width="6" height="10" rx="1" fill={ink} />
      <rect x="15" y="18" width="6" height="16" rx="1" fill={ink} />
      <rect x="24" y="18" width="6" height="16" rx="1" fill={ink} />
      <rect x="24" y="4" width="6" height="14" rx="1" fill={accent} />
      <path
        d="M 33 14 L 41 6 M 41 6 L 35 6 M 41 6 L 41 12"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
