"use client";

import Image from "next/image";
import { useCurrentUser } from "@/store/auth.store";

export default function AdminHeader() {
  const currentUser = useCurrentUser();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-gutter w-full h-16 bg-[#ffffff] dark:bg-inverse-surface border-b border-outline-variant dark:border-outline">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#777587]">search</span>
          <input 
            type="text" 
            placeholder="Search parameters, users, or transactions..." 
            className="w-full pl-10 pr-4 py-1.5 bg-[#eff4ff] border border-[#c7c4d8] rounded-md text-[13px] focus:ring-2 focus:ring-[#3525cd] focus:border-[#3525cd] outline-none transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button className="p-2 text-[#565e74] hover:bg-[#eff4ff] rounded-full transition-colors cursor-pointer relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-[#ffffff]"></span>
          </button>
          <button className="p-2 text-[#565e74] hover:bg-[#eff4ff] rounded-full transition-colors cursor-pointer">
            <span className="material-symbols-outlined">settings_suggest</span>
          </button>
          <button className="p-2 text-[#565e74] hover:bg-[#eff4ff] rounded-full transition-colors cursor-pointer hidden sm:block">
            <span className="material-symbols-outlined">dns</span>
          </button>
        </div>
        
        <div className="h-8 w-[1px] bg-[#c7c4d8] mx-2 hidden sm:block"></div>
        
        <div className="flex items-center gap-3 cursor-pointer active:opacity-80">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvAI-32tTntC7pFFQmbmmIZj8ZRhgm6E-l9kioEwoL_tZ0Rb6xF0UeUR9lk3HaUDMKqYsKnR8LDCCzDcTcuxzWvNDCsT2L9filCqZVhNZJlUPvXS89rJlf9iqfbd4ANg-y3ZQ_XlSfSmG5mXmBMVwfAwa878btMxTCKXnqaANOO7l9rZ4Li1zzMjE09QarrcI4uVwNOVgJjGUC9RIY3zAjOtNgNx6dJxqTpUlycC5PKuOBfwRtY0BdXnX-XCY_pMfRYOXLR9IF3aZu" 
            alt="Admin Avatar" 
            width={32} 
            height={32} 
            className="w-8 h-8 rounded-full border border-[#c7c4d8] object-cover" 
          />
          <div className="hidden lg:block text-right">
            <p className="font-semibold text-small leading-tight text-[#0b1c30]">{currentUser?.displayName || "Alex Rivera"}</p>
            <p className="font-normal text-[11px] text-[#565e74]">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
