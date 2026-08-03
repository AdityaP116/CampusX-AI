"use client"

import * as React from "react"
import { Send, Image as ImageIcon, PlusCircle, Phone, Video, Info, CheckCheck } from "lucide-react"
import { VerifiedBadge } from "@/shared/components/ui/verified-badge"

const CONVERSATIONS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    lastMsg: "Is the Calculus textbook still available?",
    time: "2m ago",
    online: true,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwCbFu3PpH7c8nfy_hML_vM2OR1sdI7Fkn05jbHkDtG2_m7IF7_V9IJGSIPiarKx_w552-1zz-OVHM38SU5SPZ72VMilvGkCrnNguH90iSUzGKlpf-Lu9yvJnAlUVdQ3Dn4RXqOa9koS4hbcYtfb2XZdbx-aW3CE71wtO3HvYKf1gKPxTvAATwss64XuAMsf6_6uPRFXnNkj_XXPsXrgaWrO85W6LBq2RIrpepHE0OF9pHFRcNW7k9",
    active: true,
  },
  {
    id: 2,
    name: "Marcus Chen",
    lastMsg: "I can meet at the campus library at 3PM today.",
    time: "1h ago",
    online: false,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDzltz9w3ECeq7C7wtITCfRDzdFS-vLGv4iV5D4bLIsoxYgnDYxrtupSneYcdQRvscHbbewHRdBwbwDE8zmodTw4iVl2v4hpZzVoJDFq-fHzpKu23spvmIcgOW7-e3dsZLJHDeo1g8DO_VFOWADQu9YjNrUC4LeamHniLN-kd5r_bpXCMxueiczP0uiBaCq9vuoPHVLaXCmCm0GwcpSM7W12YGe1Afszt77VTzEArh68l4fRy8uQ21",
    active: false,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    lastMsg: "Sent a photo",
    time: "Yesterday",
    online: false,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTtODmC0PigAoyKKsrTrCyxW-nN0wGYg1sF_XFHm7g2oHTRyLajzUPyn7gSVQrktSvHzQ_wm1YwpaYoUtFofZn2NmDtc9EzbTDdU2azkKDKt89j1azKrZdAKVUCYCg35VfcwhNhH5PWDp5iC4McV7YYpldfAUeydvhS0EG49ehv5BatNqsBY1LAE0gTzciEvdveBDahCDy5VOUzgSIQ6nxlwOZwx5oYb-HrGpvBbcZdbvYSeFhwmO4",
    active: false,
    isImage: true,
  },
  {
    id: 4,
    name: "Jordan Dale",
    lastMsg: "Thanks for the smooth transaction!",
    time: "Oct 24",
    online: false,
    initials: "JD",
    active: false,
  },
]

export default function MessagesPage() {
  const [message, setMessage] = React.useState("")

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      {/* ─── Main Chat Area (injected into layout's section) ─── */}
      <>
        {/* Chat Header */}
        <div className="h-16 flex items-center justify-between px-6 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 z-10 w-full">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30">
                <img
                  src={CONVERSATIONS[0].avatar}
                  alt="Sarah Jenkins"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-on-surface font-body">Sarah Jenkins</h2>
                <VerifiedBadge className="w-4 h-4" />
              </div>
              <p className="text-[11px] text-on-surface-variant font-medium">Online now</p>
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
          {/* Date separator */}
          <div className="flex justify-center items-center py-2">
            <span className="px-4 py-1 bg-surface-container text-on-surface-variant text-[11px] font-bold rounded-full uppercase tracking-widest">
              Today
            </span>
          </div>

          {/* Received message */}
          <div className="flex items-end gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mb-1 border border-outline-variant/20">
              <img src={CONVERSATIONS[0].avatar} alt="Sarah" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1">
              <div className="bg-surface-container-high text-on-surface px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                <p className="text-sm font-body">
                  Hey! I saw your listing for the 'Advanced Calculus 2nd Edition'. Is it still available?
                </p>
              </div>
              <span className="text-[10px] text-outline px-1">10:42 AM</span>
            </div>
          </div>

          {/* Sent message */}
          <div className="flex flex-col items-end gap-1 self-end max-w-[80%]">
            <div className="bg-primary text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-md">
              <p className="text-sm font-body">
                Hi Sarah! Yes, it is. I've only used it for one semester so it's in great condition. No highlighting or marks inside.
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-1">
              <span className="text-[10px] text-outline">10:45 AM</span>
              <CheckCheck className="w-3.5 h-3.5 text-primary" />
            </div>
          </div>

          {/* Received message 2 */}
          <div className="flex items-end gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mb-1 border border-outline-variant/20">
              <img src={CONVERSATIONS[0].avatar} alt="Sarah" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1">
              <div className="bg-surface-container-high text-on-surface px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                <p className="text-sm font-body">
                  That's perfect. Could you send a quick photo of the cover and the spine just to be sure it's the right ISBN?
                </p>
              </div>
              <span className="text-[10px] text-outline px-1">10:46 AM</span>
            </div>
          </div>

          {/* Sent image */}
          <div className="flex flex-col items-end gap-1 self-end max-w-[60%]">
            <div className="p-1.5 bg-primary rounded-2xl rounded-tr-sm shadow-md overflow-hidden">
              <div className="rounded-xl overflow-hidden aspect-[4/3] relative group w-56">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDihIg3UdWeKOl4nBbGzPlFYFDunOvv2nhN9_WUuNfZHJziR664A2DH2OZ5_n7dOdyES1-cMyqY4c6hDIxZdCLON8COHLdpd4X4SV-a7uSZb4VWjhOOanYtA1oL54-HrFluVNBzydX8lXtBqaIAAMbrfX2Mc_NwzIbVzzCADocvCzQcsqp_WCNGJwR5d592Gfn1wt9pMdyx_pX8nClsyhUOUFShXogLeCsUPCnR7lX653ZIQb5vxHTk"
                  alt="Book photo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-zoom-in">
                  <span className="text-white text-xs font-label font-bold">View</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-1">
              <span className="text-[10px] text-outline">10:48 AM</span>
              <CheckCheck className="w-3.5 h-3.5 text-primary" />
            </div>
          </div>

          {/* Typing indicator */}
          <div className="flex items-end gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mb-1 border border-outline-variant/20">
              <img src={CONVERSATIONS[0].avatar} alt="Sarah" className="w-full h-full object-cover" />
            </div>
            <div className="bg-surface-container-high px-4 py-4 rounded-2xl rounded-tl-sm flex gap-1.5 items-center shadow-sm">
              {[0, 200, 400].map((delay) => (
                <div
                  key={delay}
                  className="w-2 h-2 bg-on-surface-variant/40 rounded-full animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-surface/80 backdrop-blur-md border-t border-outline-variant/30">
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 font-body text-base py-1 resize-none max-h-32 overflow-y-auto text-on-surface placeholder:text-outline"
              placeholder="Type a message..."
              rows={1}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); setMessage("") } }}
            />
            <button
              onClick={() => setMessage("")}
              className="p-3 bg-primary text-white rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center shrink-0 mb-0.5"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 flex justify-center">
            <p className="text-[11px] text-outline font-medium font-label">
              Messages are encrypted. Peer-to-peer security active.
            </p>
          </div>
        </div>
      </>
    </div>
  )
}
