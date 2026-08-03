"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function FadeIn({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.5,
  direction = "up"
}: FadeInProps) {
  
  const getInitialOffset = () => {
    switch (direction) {
      case "up": return { y: 20 }
      case "down": return { y: -20 }
      case "left": return { x: 20 }
      case "right": return { x: -20 }
      case "none": return {}
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...getInitialOffset() }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
