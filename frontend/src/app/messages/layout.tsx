"use client"

import * as React from "react"
import { Search, Edit } from "lucide-react"
import { useAuthStore } from "@/features/auth/store/authStore"
import { useChatStore } from "@/features/chat/store/chatStore"
import { subscribeToConversations, getUserInfo } from "@/features/chat/services/chatService"

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuthStore()
  const { conversations, setConversations, activeConversationId, setActiveConversationId } = useChatStore()
  const [participantInfo, setParticipantInfo] = React.useState<Record<string, any>>({})
  const [searchFilter, setSearchFilter] = React.useState("")

  React.useEffect(() => {
    if (!user) return
    const unsubscribe = subscribeToConversations(user.uid, (convs) => {
      setConversations(convs)
      
      // Fetch user info for participants
      convs.forEach(conv => {
        const otherId = conv.participants.find(p => p !== user.uid)
        if (otherId && !participantInfo[otherId]) {
          getUserInfo(otherId).then(info => {
            setParticipantInfo(prev => ({ ...prev, [otherId]: info }))
          })
        }
      })
    })
    return () => unsubscribe()
  }, [user, setConversations])

  const getOtherParticipant = (participants: string[]) => {
    return participants.find(p => p !== user?.uid) || participants[0]
  }

  const filteredConversations = conversations.filter((conv) => {
    if (!searchFilter.trim()) return true
    const otherId = getOtherParticipant(conv.participants)
    const name = participantInfo[otherId]?.displayName || ""
    return name.toLowerCase().includes(searchFilter.toLowerCase())
  })

  return (
    <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
      {/* SideNavBar / Conversation Sidebar (hidden on mobile if in active chat) */}
      <aside className={`w-full md:w-80 lg:w-96 flex flex-col bg-surface-container-low border-r border-outline-variant/30 h-full flex-shrink-0 ${
        activeConversationId ? "hidden md:flex" : "flex"
      }`}>
        {/* Sidebar Header */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="font-headline text-xl font-bold text-primary">Messages</h1>
            <div className="p-2 bg-primary-container text-on-primary-container rounded-full shadow-sm">
              <Edit className="h-4 w-4" />
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline h-4 w-4" />
            <input 
              type="text" 
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search chats..." 
              className="w-full pl-9 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-body"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1 no-scrollbar">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant text-sm">
              No conversations yet.
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const otherId = getOtherParticipant(conv.participants)
              const otherInfo = participantInfo[otherId] || { displayName: "Student", avatar: null }
              const initials = otherInfo.displayName ? otherInfo.displayName.substring(0, 2).toUpperCase() : "ST"
              const isActive = activeConversationId === conv.id
              const lastMsgTime = conv.updatedAt ? new Date(conv.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ""

              return (
                <div 
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                    isActive 
                      ? "bg-primary-container text-on-primary-container shadow-sm" 
                      : "bg-transparent hover:bg-surface-variant/50 text-on-surface"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center font-bold ${
                      isActive ? "bg-primary/20 text-primary" : "bg-surface-container-highest text-on-surface-variant"
                    }`}>
                      {otherInfo.avatar ? (
                        <img src={otherInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        initials
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-bold truncate text-base font-body">{otherInfo.displayName}</span>
                      <span className={`text-[10px] font-medium uppercase tracking-wider font-label ${
                        isActive ? "opacity-80" : "text-outline"
                      }`}>
                        {lastMsgTime}
                      </span>
                    </div>
                    <p className={`text-sm truncate font-body ${isActive ? "opacity-90" : "text-on-surface-variant"}`}>
                      {conv.lastMessage?.content || "Started a conversation"}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </aside>

      {/* Main Chat Area (shown on mobile when activeConversationId is selected) */}
      <section className={`flex-1 flex-col bg-surface overflow-hidden relative ${
        activeConversationId ? "flex" : "hidden md:flex"
      }`}>
        {children}
      </section>
    </div>
  )
}
