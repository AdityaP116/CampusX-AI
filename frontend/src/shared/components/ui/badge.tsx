import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-primary-container text-on-primary-container",
    secondary: "bg-surface-container-high text-on-surface",
    outline: "border border-outline-variant text-on-surface-variant",
    success: "bg-[#e8f5e9] text-[#1b5e20] dark:bg-green-900/30 dark:text-green-400"
  }
  
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-bold font-label transition-colors uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
