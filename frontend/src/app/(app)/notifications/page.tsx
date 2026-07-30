"use client";

// =========================================================
// Notifications Center
// Pixel-perfect conversion of design/1/notifications_center
// =========================================================

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

type NotificationType = "offer" | "price_drop" | "verification" | "message" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  actionRequired?: boolean;
  avatarUrl?: string;
  icon?: string;
  iconBgClass?: string;
  iconColorClass?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "offer",
    title: "New Offer Received",
    message: "Someone offered $45.00 for your \"Intro to Economics\" textbook. Tap to review.",
    time: "2m ago",
    unread: true,
    actionRequired: true,
    icon: "local_offer",
    iconBgClass: "bg-secondary-fixed",
    iconColorClass: "text-on-secondary-fixed-variant",
  },
  {
    id: "n2",
    type: "price_drop",
    title: "Price Drop Alert",
    message: "The \"Mechanical Keyboard\" you saved is now 15% cheaper! Grab it before it's gone.",
    time: "1h ago",
    unread: true,
    icon: "trending_down",
    iconBgClass: "bg-tertiary-fixed",
    iconColorClass: "text-on-tertiary-fixed-variant",
  },
  {
    id: "n3",
    type: "verification",
    title: "Verification Successful",
    message: "Your student ID has been verified. You can now post unlimited listings and access campus-only deals.",
    time: "5h ago",
    unread: false,
    icon: "verified",
    iconBgClass: "bg-primary-fixed",
    iconColorClass: "text-on-primary-fixed-variant",
  },
  {
    id: "n4",
    type: "message",
    title: "Sarah Miller sent a message",
    message: "\"Hey, is the desk lamp still available? I can pick it up tomorrow afternoon if that works...\"",
    time: "8h ago",
    unread: false,
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBn0Eg3lnwg4GfF3AQ9eDCOFLEVb251mjkWv0zPsVWnHW-9a1iKJvl0H58hRPnH1EBDeAautiNulNpD-mYxLVIEflwDdS5BJ5J8kUOn-fqgTT_2NENK4Kk9Y2iJSTmXSe-2RdEhF3tg9uGrqnciDEaxsuV1vX9Denn_MyhYkq-o9vBrmjd3_I1vIrB37hHcWxw213CrfQI6bkQLq7qoh2lwIPHPvCa6rMtithzSJT1iuMHDLThB6o2qiYzsHg2XEosAuVQikSouVJ36",
  },
  {
    id: "n5",
    type: "system",
    title: "System Maintenance",
    message: "CampusX will be undergoing scheduled maintenance tonight at 2 AM PST. Marketplace searches may be briefly unavailable.",
    time: "Yesterday",
    unread: false,
    icon: "update",
    iconBgClass: "bg-surface-container-high",
    iconColorClass: "text-on-surface-variant",
  }
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"All" | "Marketplace" | "System">("All");
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "All") return true;
    if (activeTab === "Marketplace") return ["offer", "price_drop", "message"].includes(n.type);
    if (activeTab === "System") return ["verification", "system"].includes(n.type);
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto md:px-md">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-xxl">
        <div>
          <h1 className="font-bold text-h1-mobile md:text-h1 text-on-surface mb-xs">Notifications</h1>
          <p className="text-body text-on-surface-variant">Stay updated with your campus activity and marketplace deals.</p>
        </div>
        <button 
          onClick={markAllRead}
          className="text-primary font-medium text-small hover:underline self-start md:self-end"
        >
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-md border-b border-outline-variant/30 mb-xl">
        {(["All", "Marketplace", "System"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-md py-sm font-medium text-small transition-colors ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-md"
      >
        <AnimatePresence mode="popLayout">
          {filteredNotifications.map((notif) => (
            <motion.div
              key={notif.id}
              variants={fadeInUp}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md flex gap-md cursor-pointer hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-200"
              onClick={() => handleMarkRead(notif.id)}
            >
              <div className={`w-12 h-12 flex-shrink-0 rounded-full ${notif.avatarUrl ? 'overflow-hidden' : notif.iconBgClass} flex items-center justify-center`}>
                {notif.avatarUrl ? (
                  <Image src={notif.avatarUrl} alt="" width={48} height={48} className="w-full h-full object-cover" />
                ) : (
                  <span className={`material-symbols-outlined ${notif.iconColorClass}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {notif.icon}
                  </span>
                )}
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start mb-xs gap-2">
                  <h4 className="font-semibold text-body text-on-surface truncate">{notif.title}</h4>
                  <span className="font-medium text-caption text-on-surface-variant whitespace-nowrap">{notif.time}</span>
                </div>
                <p className="text-small text-on-surface-variant">{notif.message}</p>
                
                {notif.actionRequired && (
                  <div className="mt-md flex gap-sm">
                    <button className="px-md py-xs bg-primary text-on-primary rounded-full font-medium text-small hover:bg-primary-container active:scale-95 transition-all">
                      Accept
                    </button>
                    <button className="px-md py-xs bg-surface-container text-on-surface-variant rounded-full font-medium text-small hover:bg-surface-container-high active:scale-95 transition-all">
                      Decline
                    </button>
                  </div>
                )}
              </div>
              
              {/* Unread indicator */}
              <div className="w-2 flex-shrink-0 pt-2">
                <AnimatePresence>
                  {notif.unread && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="w-2 h-2 rounded-full bg-primary" 
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredNotifications.length === 0 && (
          <div className="py-xl text-center">
            <p className="text-on-surface-variant">No notifications here.</p>
          </div>
        )}
      </motion.div>

      <div className="py-xl text-center">
        <button className="font-medium text-small text-primary hover:bg-primary-fixed px-lg py-sm rounded-full transition-colors">
          Load older notifications
        </button>
      </div>
    </div>
  );
}
