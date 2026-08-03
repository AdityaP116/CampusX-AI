import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-4 w-4 items-center justify-center rounded-full bg-primary flex-shrink-0",
        className
      )}
      title="Verified Student"
    >
      <Check className="h-2.5 w-2.5 text-on-primary stroke-[4px]" />
    </div>
  )
}
