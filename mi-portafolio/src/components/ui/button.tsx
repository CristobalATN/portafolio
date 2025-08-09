import * as React from 'react'
import { cn } from './utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'icon'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background'
    const variants = {
      default: 'bg-black text-white hover:opacity-90 dark:bg-white dark:text-black',
      outline: 'border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5',
      ghost: 'hover:bg-black/5 dark:hover:bg-white/5'
    }
    const sizes = {
      default: 'h-10 px-4 py-2',
      icon: 'h-10 w-10'
    }
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], 'rounded-xl', className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'