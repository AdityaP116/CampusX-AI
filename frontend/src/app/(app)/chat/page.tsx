"use client";

// =========================================================
// Chat Empty State
// Pixel-perfect conversion of design/1/chat_list/code.html
// =========================================================

import { motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { fadeInUp } from "@/lib/motion";

export default function ChatEmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center relative h-full w-full">
      <div className="absolute inset-0 opacity-40 bg-surface-container-lowest" />
      
      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="relative text-center max-w-md px-lg"
      >
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-lg">
          <span 
            className="material-symbols-outlined text-primary/50 text-display" 
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            chat
          </span>
        </div>
        
        <h2 className="font-bold text-h2 text-on-surface mb-sm">
          Select a Conversation
        </h2>
        
        <p className="font-medium text-body text-on-surface-variant mb-xl">
          Connect with other verified students on CampusX. Send a message to start negotiating your next great find.
        </p>
        
        <div className="flex justify-center gap-md">
          <Link 
            href={ROUTES.WISHLIST}
            className="px-lg py-sm bg-surface border border-outline text-primary rounded-full hover:bg-primary/5 transition-all font-semibold"
          >
            View Saved Listings
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
