import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'section' | 'li'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({ children, className = '', as: Tag = 'div', padding = 'md' }: CardProps) {
  return (
    <Tag className={`bg-white rounded-xl border border-gray-100 shadow-sm ${paddingClasses[padding]} ${className}`}>
      {children}
    </Tag>
  )
}
