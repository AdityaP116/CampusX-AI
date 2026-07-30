"use client";

// =========================================================
// Chat Layout
// Implements the 3-pane layout for Desktop: 
// Profile Sidebar -> Chat List -> Conversation (Children)
// =========================================================

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useCurrentUser } from "@/store/auth.store";

const PROFILE_NAV = [
  { href: ROUTES.DASHBOARD, label: "Dashboard", icon: "grid_view" },
  { href: ROUTES.CHAT, label: "Messages", icon: "chat_bubble" },
  { href: "/offers", label: "Offers", icon: "local_offer" },
  { href: ROUTES.WISHLIST, label: "Saved", icon: "bookmark" },
  { href: "/listings", label: "Listings", icon: "sell" },
  { href: ROUTES.SETTINGS, label: "Settings", icon: "settings" },
];

const MOCK_CHATS = [
  {
    id: "sarah-miller",
    name: "Sarah Miller",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkFkOo9KFCz2M5M4qteRDfS7--7S25dBWqM7c7NpGgt1MVsirrZHMOG3h2UTnPWja4Dt8y-Oj09baAp8qhCPOWafPPhFfu-e2WfoMHjYZ3g6h0NYVaWl4M0Sq_TVKSaQEjLCq_4p8AdqhvBWJY3vBgvawgXyJ0jBaEVTVM_YfxJOmG2SgXEthm-Vrqdb8OlsuV7JjeYx9sFYu-mdutwifZttIL5wxBUNEMUoViv6CH_dDTBivBEKzSyfav2xsYzD5T4nYNJkjXyiuh",
    lastMessage: "Is the Calculus textbook still available for pickup? I can come by tomorrow afternoon.",
    time: "2m ago",
    unread: true,
    online: true,
  },
  {
    id: "jordan-park",
    name: "Jordan Park",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDX4eBxMDxZzOT28_KTpQwAjuGPSjleNtN6Mlwb_hE24jc9VJKPdIhdunSEpCh0t9hIrYhejnxuV2JfDl2tHjhFM-J84lITWfti86qjHY8ThS7gwbt_TCNNbUXw9dhMl-UBkKZuSAwaQj40eahNvJGBAzLgRdGpHrJ7t-aV1ZhM6vpfSceJalT-QcLEVDfybuGMaKUGlIB7KNslYNexlPyiA_jEKorCwNOCX_OnraQO8ejp6pgPumJV9S6u57CP1xX4_1797Hy1AHR-",
    lastMessage: "That price works for me. Where should we meet?",
    time: "1h ago",
    unread: false,
    online: false,
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwzV5yrJ6HFDddlu7Vq5f2zvrNwSDr-0VdO-U_Uo1WDObodTxCErABWWsp2L7gLjYcv3baVb9mdCva7S5xtC-nM42piakZNO2rssQCjrYSavvCgPwlLtei_M-K0yUdCUCDlkWWXYLNob7GdnuiSimtSn0LVp_wBh4hVX8SshOaZukP5WRfcx-PFDb3WDNhHu_5RO2bFUSijmqiRQFweFDHy5Fwj-HcbkouI7R2dbMqry03W4tl5ZyvgJ-Ix_U7ASvQbhMm821TEKd9",
    lastMessage: "Thanks! I'll let you know when I'm near the Student Center.",
    time: "3h ago",
    unread: false,
    online: false,
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUnzhO0s2AJihi0jLUUXw9dg2yjAvtrrjV-KVQs_lpZ9YmGIdCitGhF0Bl20d-8NOFxxi-rk84RVsqnWeQPist8bV1o6vph4lkn5HsFTiqNCjxJi2F8hgNlcPpX1P8ZBIUphmYsPHFZceeyoLNPPBHqn8xWFeM4z7ZPNszRbkWc-ei9Zlx31-PUwtpOaQxJH-g_zO4RlGpi5aCWSb47PJ5OC_MsmwKljxuoCSH8dllypLJHErHa1e0rKN1AXtvNvC6sMpXSq0woOwP",
    lastMessage: "I sold that item already, sorry about that!",
    time: "Yesterday",
    unread: false,
    online: false,
    archived: true,
  }
];

export default function ChatLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentUser = useCurrentUser();
  const isChatDetail = pathname !== ROUTES.CHAT;

  return (
    <div className="flex flex-1 w-full h-full relative">
      {/* 1. Sidebar Navigation (Desktop) - matches chat_list design */}
      <aside className="hidden md:flex flex-col h-full w-64 bg-surface-container-low border-r border-outline-variant p-md gap-sm shrink-0 z-10">
        <div className="flex flex-col items-center gap-sm mb-lg py-md border-b border-outline-variant/30">
          <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center mb-sm overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3-d-IscdQb82DmEufiB__o6PC9te02hpf8g5X3D68bJUWtZQcRTxVJLA5LNwNghTipTnpx6OLC1o0YhMFMwHh-SxFdrML1S9w2B-8Gf28bLlapz-6Mb1YDEaJaPKMJ313c72-qySbR0TL6HNu8RVutNqI-glH8s_iHBht4waRXhezNegY7bfjqmsERsZrlJCQllqO1OeheOg806OQ_krsVzQkmOyaBhY9udvJcAfyX-Bj6i8pzmb9dzm0gNezytt0Wdu1pq44U1zi" 
              alt="Profile"
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-h3 text-primary leading-tight">{currentUser?.displayName || "Alex Rivers"}</h3>
            <p className="font-medium text-small text-on-surface-variant">Verified Student</p>
          </div>
        </div>
        
        <nav className="flex flex-col gap-sm flex-1">
          {PROFILE_NAV.map((item) => {
            const isActive = pathname.startsWith(item.href) && item.href !== "/";
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex items-center gap-md rounded-xl px-md py-sm transition-transform duration-200 hover:translate-x-1 ${isActive ? 'bg-secondary-fixed text-on-secondary-fixed-variant font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-medium text-small">{item.label}</span>
              </Link>
            )
          })}
        </nav>
        
        <button className="mt-xl bg-primary text-on-primary font-semibold py-md px-lg rounded-xl shadow-md hover:bg-primary-container transition-all active:scale-95">
          List an Item
        </button>
        <div className="mt-auto border-t border-outline-variant/30 pt-md">
          <Link href="#support" className="flex items-center gap-md text-on-surface-variant hover:bg-surface-container-high rounded-xl px-md py-sm">
            <span className="material-symbols-outlined">help</span>
            <span className="font-medium text-small">Support</span>
          </Link>
        </div>
      </aside>

      {/* 2. Chat List Pane (Hidden on mobile if viewing a chat) */}
      <section className={`w-full md:w-full max-w-md shrink-0 flex flex-col bg-surface border-r border-outline-variant/50 relative overflow-hidden ${isChatDetail ? 'hidden md:flex' : 'flex'}`}>
        {/* Search Bar */}
        <div className="px-md py-lg sticky top-0 bg-surface/90 backdrop-blur-xl z-10">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-12 pr-md py-3 bg-surface-container-low border-none rounded-full text-body focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline outline-none" 
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto space-y-1 px-sm pb-xl no-scrollbar">
          {MOCK_CHATS.map((chat) => {
            const isActive = pathname === `/chat/${chat.id}`;
            return (
              <Link 
                key={chat.id}
                href={`/chat/${chat.id}`}
                className={`flex gap-md p-md rounded-2xl cursor-pointer transition-all border border-transparent ${
                  isActive 
                    ? 'bg-secondary-fixed text-on-secondary-fixed-variant' 
                    : 'hover:bg-surface-container group'
                } ${chat.archived ? 'opacity-60 grayscale' : ''}`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full bg-surface-container-highest overflow-hidden ${isActive ? 'border-2 border-on-secondary-fixed-variant/20' : ''}`}>
                    <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className={`font-bold text-small truncate ${!isActive && 'text-on-surface group-hover:text-primary transition-colors'}`}>
                      {chat.name}
                    </h4>
                    <span className={`font-medium text-caption ${isActive ? 'opacity-70' : 'text-on-surface-variant'}`}>
                      {chat.time}
                    </span>
                  </div>
                  <p className={`font-medium text-small truncate ${isActive ? 'opacity-90' : 'text-on-surface-variant'}`}>
                    {chat.lastMessage}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 3. Conversation Canvas / Empty State (Hidden on mobile if not viewing a chat) */}
      <section className={`flex-1 relative overflow-hidden bg-surface-container-lowest ${!isChatDetail ? 'hidden md:flex' : 'flex'}`}>
        {children}
      </section>
    </div>
  );
}
