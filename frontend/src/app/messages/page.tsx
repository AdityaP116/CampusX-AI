"use client"

import * as React from "react"
import { Send, Image as ImageIcon, PlusCircle, Phone, Video, Info, CheckCheck } from "lucide-react"
import { VerifiedBadge } from "@/shared/components/ui/verified-badge"
import { useAuthStore } from "@/features/auth/store/authStore"
import { useChatStore } from "@/features/chat/store/chatStore"
import { subscribeToMessages, sendMessage, markAsRead, getUserInfo } from "@/features/chat/services/chatService"

export default function MessagesPage() {
  const { user } = useAuthStore()
  const { activeConversationId, conversations, messages, setMessages } = useChatStore()
  const [inputText, setInputText] = React.useState("")
  const [otherUserInfo, setOtherUserInfo] = React.useState<any>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const activeConversation = conversations.find(c => c.id === activeConversationId)

  React.useEffect(() => {
    if (!activeConversationId) return
    const unsubscribe = subscribeToMessages(activeConversationId, (msgs) => {
      setMessages(msgs)
      markAsRead(activeConversationId).catch(console.error)
    })
    return () => unsubscribe()
  }, [activeConversationId, setMessages])

  React.useEffect(() => {
    if (activeConversation && user) {
      const otherId = activeConversation.participants.find(p => p !== user.uid)
      if (otherId) {
        getUserInfo(otherId).then(setOtherUserInfo)
      }
    }
  }, [activeConversation, user])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!inputText.trim() || !activeConversationId) return
    try {
      const content = inputText
      setInputText("")
      await sendMessage(activeConversationId, content)
    } catch (error) {
      console.error("Failed to send message", error)
      // Might want to restore inputText here or show error toast
    }
  }

  if (!activeConversationId || !activeConversation) {
    return (
      <div className="flex flex-1 items-center justify-center text-on-surface-variant font-body">
        Select a conversation to start messaging
      </div>
    )
  }

  return (
    <>
      {/* Chat Header */}
      <div className="h-16 flex items-center justify-between px-6 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 z-10 w-full shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30 bg-surface-container-highest flex items-center justify-center font-bold">
              {otherUserInfo?.avatar ? (
                <img src={otherUserInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                otherUserInfo?.displayName?.substring(0, 2).toUpperCase() || "??"
              )}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-on-surface font-body">{otherUserInfo?.displayName || "Loading..."}</h2>
              <VerifiedBadge className="w-4 h-4" />
            </div>
            {activeConversation.product && (
              <p className="text-[11px] text-primary font-medium truncate max-w-[200px]">
                Re: {activeConversation.product.title}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-secondary hover:text-primary hover:bg-surface-container-low rounded-full transition-all">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-secondary hover:text-primary hover:bg-surface-container-low rounded-full transition-all">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-secondary hover:text-primary hover:bg-surface-container-low rounded-full transition-all">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
        {messages.map((msg, i) => {
          const isMe = msg.senderId === user?.uid
          const timeString = new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          
          return isMe ? (
            <div key={msg.id} className="flex flex-col items-end gap-1 self-end max-w-[80%]">
              <div className="bg-primary text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-md">
                <p className="text-sm font-body whitespace-pre-wrap">{msg.content}</p>
              </div>
              <div className="flex items-center gap-1.5 px-1">
                <span className="text-[10px] text-outline">{timeString}</span>
                <CheckCheck className="w-3.5 h-3.5 text-primary" />
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex items-end gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mb-1 border border-outline-variant/20 bg-surface-container-highest">
                {otherUserInfo?.avatar ? (
                  <img src={otherUserInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div className="space-y-1">
                <div className="bg-surface-container-high text-on-surface px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <p className="text-sm font-body whitespace-pre-wrap">{msg.content}</p>
                </div>
                <span className="text-[10px] text-outline px-1">{timeString}</span>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-surface/80 backdrop-blur-md border-t border-outline-variant/30 shrink-0">
        <div className="flex items-end gap-3 bg-white border border-outline-variant/50 px-3 py-2.5 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
          <div className="flex items-center gap-1 mb-1">
            <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-all">
              <PlusCircle className="w-5 h-5" />
            </button>
            <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-all">
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 font-body text-base py-1 resize-none max-h-32 overflow-y-auto text-on-surface placeholder:text-outline"
            placeholder="Type a message..."
            rows={1}
            onKeyDown={(e) => { 
              if (e.key === "Enter" && !e.shiftKey) { 
                e.preventDefault(); 
                handleSend(); 
              } 
            }}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="p-3 bg-primary text-white rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center shrink-0 mb-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  )
}
