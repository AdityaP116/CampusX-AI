"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Footer } from "./footer"

export function FooterWrapper() {
  const pathname = usePathname()
  
  if (pathname?.startsWith("/messages")) {
    return null
  }
  
  return <Footer />
}
