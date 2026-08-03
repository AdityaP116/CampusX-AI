import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-50 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      primary: "bg-primary text-on-primary hover:brightness-95 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]",
      secondary: "bg-surface-container-highest text-on-surface hover:brightness-95",
      outline: "border border-outline bg-transparent hover:bg-surface-container-low text-on-surface",
      ghost: "bg-transparent hover:bg-surface-container-low text-on-surface"
    }
    
    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-8 text-lg rounded-lg"
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
