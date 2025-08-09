import * as React from 'react'
import { cn } from './utils'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn('w-full rounded-xl border border-white/10 bg-white/80 dark:bg-neutral-900/80 px-3 py-2 text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white', className)}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'