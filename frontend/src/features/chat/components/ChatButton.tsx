"use client"

import * as React from "react"
import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/components/ui/button"
import { createConversation } from "@/features/chat/services/chatService"
import { useAuthStore } from "@/features/auth/store/authStore"
import { useChatStore } from "@/features/chat/store/chatStore"

interface ChatButtonProps {
  sellerId: string;
  product: {
    id: string;
    title: string;
    thumbnailUrl: string;
    price: number;
  };
  className?: string;
}

export function ChatButton({ sellerId, product, className }: ChatButtonProps) {
  const router = useRouter()
  const { user } = useAuthStore()
  const { setActiveConversationId } = useChatStore()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleChat = async () => {
    if (!user) {
      router.push("/login")
      return
    }
    
    // Don't chat with yourself
    if (user.uid === sellerId) {
      alert("You cannot chat with yourself.")
      return
    }

    try {
      setIsLoading(true)
      const res = await createConversation(sellerId, product)
      if (res?.data?.id) {
        setActiveConversationId(res.data.id)
      }
      router.push("/messages")
    } catch (error) {
      console.error("Failed to start chat", error)
      alert("Could not start conversation. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      size="lg" 
      className={`gap-2 shadow-md ${className || ""}`}
      onClick={handleChat}
      disabled={isLoading}
    >
      <MessageCircle className="w-5 h-5" />
      {isLoading ? "Starting Chat..." : "Chat with Seller"}
    </Button>
  )
}
