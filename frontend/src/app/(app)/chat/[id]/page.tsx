"use client";

// =========================================================
// Chat Conversation Detail
// Pixel-perfect conversion of design/1/conversation
// =========================================================

import { useState, useRef, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSocket } from "@/providers/SocketProvider";
import { useCurrentUser } from "@/store/auth.store";
import { ROUTES } from "@/constants/routes";

const MOCK_MESSAGES = [
  { id: "1", senderId: "other", text: "Hi Alex! I saw your post for the MacBook Pro. Is it still available for pick up today?", time: "10:42 AM", isMine: false, status: "read" },
  { id: "2", senderId: "me", text: "Hey Sarah! Yes, it's still available. I have it with me right now.", time: "10:45 AM", isMine: true, status: "read" },
];

export default function ChatConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const conversationId = unwrappedParams.id;
  const [messages, setMessages] = useState<unknown[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { socket } = useSocket();
  const currentUser = useCurrentUser();

  // Real-time socket event listeners
  useEffect(() => {
    if (!socket) return;
    
    socket.emit("join_conversation", { conversationId });
    
    socket.on("receive_message", (message: unknown) => {
      setMessages((prev) => [...prev, message]);
    });
    
    socket.on("typing_indicator", ({ userId, isTyping }: { userId: string, isTyping: boolean }) => {
      if (userId !== currentUser?.id) {
        setIsTyping(isTyping);
      }
    });
    
    return () => {
      socket.emit("leave_conversation", { conversationId });
      socket.off("receive_message");
      socket.off("typing_indicator");
    };
  }, [socket, conversationId, currentUser?.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    socket?.emit("typing_indicator", { conversationId, isTyping: e.target.value.length > 0 });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !socket) return;
    const msg = {
      id: Date.now().toString(),
      senderId: currentUser?.id,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
      status: "sent"
    };
    socket.emit("send_message", { conversationId, message: msg });
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
    socket.emit("typing_indicator", { conversationId, isTyping: false });
  };

  return (
    <div className="flex flex-col h-full w-full bg-surface-container-lowest overflow-hidden">
      {/* TopAppBar */}
      <header className="z-30 backdrop-blur-xl bg-surface/70 border-b border-outline-variant/30 flex flex-col">
        <div className="flex items-center justify-between px-lg py-sm">
          <div className="flex items-center gap-md">
            <Link href={ROUTES.CHAT} className="md:hidden p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-transform active:scale-90">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div className="relative">
              <div className="w-10 h-10 rounded-full object-cover border border-outline-variant overflow-hidden">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAowrGEf4GSJpf7ZUiFF8RuZ3IHyvp39cboDESvKS2wRUHbQIh5ggvjsbEL4bH7UBrHs_cNUhkS_nDis_YCBDl2tiSrDn2_g460dLhHKlRJjgSO87htK97aWZwUaqQfamTgWcL8xsaQ7jAeOPWfjwtwBFizkLHEwv425SZoiXP7TTxUNebSiHEVS1ca9eI2_u5776DINjODOSRe1HAQgWFn3yeDozBIJ5a4VIOvxW2xO0nfnkrVak4ma6sQfjzawd_JdPZWceVk9EHi" alt="Sarah Miller" width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-surface rounded-full"></div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h2 className="font-bold text-title text-on-surface">Sarah Miller</h2>
                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <p className="font-medium text-caption text-on-surface-variant">Online now • Junior at State Tech</p>
            </div>
          </div>
        </div>

        <div className="px-lg pb-sm pt-xs">
          <div className="bg-surface-container-low rounded-2xl p-sm flex items-center justify-between border border-outline-variant/30 hover:bg-surface-container transition-colors cursor-pointer group">
            <div className="flex items-center gap-md">
              <div className="h-14 w-14 rounded-xl overflow-hidden bg-white border border-outline-variant/20 flex-shrink-0">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZR3QRD0_1RVb_ARwgpB_MM7crfSE2jwV8WfDrsyjy_WCgiGgKkO1ZZqkv3O5ycXeOtvUWm56QRsP_IxibyLLQDnU4EPS790CTwQcx5JVTwlryhLG080VGRE_iynnJJ7wsyLaydz86eMErUCfJF7pwXakEyNGdyPdAD1DbUHdigeN4dKwWxef9sRs5XllTF74OA_PcyHX0co-vmGMjQsIonGhaEcaq8qivTQjLNGHX-vseF4aUR3mDJssVyHf4-3xVHb8Yglpk9FpL" alt="MacBook Pro" width={56} height={56} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-small text-on-surface group-hover:text-primary transition-colors">MacBook Pro 14&quot; M3</p>
                <p className="font-medium text-caption text-on-surface-variant">$1,450.00 • Used (Like New)</p>
              </div>
            </div>
            <div className="flex items-center gap-sm">
              <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed font-bold rounded-full text-caption">Selling</span>
              <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Conversation Area */}
      <section 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar bg-[radial-gradient(var(--color-primary-fixed)_1px,transparent_1px)] [background-size:24px_24px] p-lg flex flex-col gap-lg relative"
      >
        {/* To soften the radial background like in the design */}
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 pointer-events-none" />

        <div className="flex justify-center my-md relative z-10">
          <span className="bg-surface-variant px-4 py-1 rounded-full text-caption font-medium text-on-surface-variant">Today</span>
        </div>

        {/* Received Message */}
        <div className="flex flex-col items-start max-w-[85%] md:max-w-[60%] relative z-10">
          <div className="bg-surface-container-highest text-on-surface p-md rounded-2xl rounded-tl-sm shadow-sm border border-outline-variant/20">
            <p className="text-body">Hi Alex! I saw your post for the MacBook Pro. Is it still available for pick up today? I&apos;m on campus near the library.</p>
          </div>
          <span className="mt-xs ml-1 font-medium text-caption text-on-surface-variant">10:42 AM</span>
        </div>

        {/* Sent Message */}
        <div className="flex flex-col items-end self-end max-w-[85%] md:max-w-[60%] relative z-10">
          <div className="bg-primary text-on-primary p-md rounded-2xl rounded-tr-sm shadow-md">
            <p className="text-body">Hey Sarah! Yes, it&apos;s still available. I have it with me right now. I could meet you at the library cafe in about 20 minutes if that works?</p>
          </div>
          <div className="flex items-center gap-xs mt-xs mr-1">
            <span className="font-medium text-caption text-on-surface-variant">10:45 AM</span>
            <span className="material-symbols-outlined text-small text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
          </div>
        </div>

        {/* Received Message with Image */}
        <div className="flex flex-col items-start max-w-[85%] md:max-w-[60%] relative z-10">
          <div className="bg-surface-container-highest text-on-surface p-md rounded-2xl rounded-tl-sm shadow-sm border border-outline-variant/20">
            <p className="text-body mb-sm">That works perfectly! Just to confirm, can you send a quick photo of the battery cycle count from the settings?</p>
            <div className="w-full h-40 rounded-xl overflow-hidden mb-xs">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-goNsUtI3FTFY5lZFmdJgSdzpXnFIs_VYKjbBxZRpmW3Qx87rCKZLjWDV_t1TM0UpK7qSKb7HPT8L7e7eDaHXRo47sM8xIytcpdgv-nDXmYIdOQ3pge_tzq5Ky4biDfkfCYArQjyt1Hfxz4sMf7vJrwyL1xvHqfJNtZ1wOkER7KT0N-03mWpHjcUMjXdIe0_TYKiXYFqPYGphD_0alS9QBBbo0dV116qQQE-kbzCWUIgapazDSDGjDVcXKNVFdCHR6FiKX7RPdHF1"
                alt="Library Cafe"
                width={300}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="mt-xs ml-1 font-medium text-caption text-on-surface-variant">10:46 AM</span>
        </div>

        {/* Sent Message */}
        <div className="flex flex-col items-end self-end max-w-[85%] md:max-w-[60%] relative z-10">
          <div className="bg-primary text-on-primary p-md rounded-2xl rounded-tr-sm shadow-md">
            <p className="text-body">Sure thing, one second while I grab that for you!</p>
          </div>
          <div className="flex items-center gap-xs mt-xs mr-1">
            <span className="font-medium text-caption text-on-surface-variant">10:48 AM</span>
            <span className="material-symbols-outlined text-small text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
          </div>
        </div>

        {/* Typing Indicator */}
        <div className="flex items-center gap-sm mt-md relative z-10">
          <div className="flex gap-1 bg-surface-container px-3 py-3 rounded-full">
            <div className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce"></div>
          </div>
          <span className="font-medium text-caption text-on-surface-variant">Sarah is typing...</span>
        </div>
      </section>

      {/* Message Input Bar (Bottom Dock) */}
      <footer className="backdrop-blur-xl bg-surface/80 border-t border-outline-variant/30 p-md pb-8 md:pb-md z-20">
        <div className="max-w-4xl mx-auto flex items-end gap-md">
          <div className="flex items-center gap-sm pb-1">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-all active:scale-90">
              <span className="material-symbols-outlined">add_circle</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-all active:scale-90">
              <span className="material-symbols-outlined">image</span>
            </button>
          </div>
          
          <div className="flex-1 relative">
            <textarea 
              className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 rounded-2xl py-3 px-12 text-body resize-none overflow-hidden max-h-32 placeholder-outline outline-none" 
              placeholder="Message Sarah Miller..." 
              rows={1}
            />
            <button className="absolute left-3 bottom-2.5 p-1.5 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">mood</span>
            </button>
          </div>
          
          <button className="bg-primary text-on-primary h-11 w-11 shrink-0 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-container transition-all active:scale-90">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
          </button>
        </div>

        {/* Quick Actions (Mobile Only) */}
        <div className="flex md:hidden items-center justify-around mt-md pt-md border-t border-outline-variant/10">
          <button className="flex flex-col items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined">handshake</span>
            <span className="text-[10px] font-bold">Safe Meet</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined">payments</span>
            <span className="text-[10px] font-bold">Pay Now</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined">report</span>
            <span className="text-[10px] font-bold">Report</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
