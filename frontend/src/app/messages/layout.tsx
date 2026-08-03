import * as React from "react"
import { Search, Edit } from "lucide-react"

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
      {/* SideNavBar / Conversation Sidebar */}
      <aside className="w-full md:w-80 lg:w-96 flex flex-col bg-surface-container-low border-r border-outline-variant/30 h-full flex-shrink-0">
        {/* Sidebar Header */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="font-headline text-xl font-bold text-primary">Messages</h1>
            <button className="p-2 bg-primary-container text-on-primary-container rounded-full hover:shadow-md transition-all active:scale-95">
              <Edit className="h-5 w-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-9 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-body"
            />
          </div>
        </div>

        {/* Conversation List Mock */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1 no-scrollbar">
          {/* Active Chat Item */}
          <div className="flex items-center gap-4 p-4 bg-primary-container text-on-primary-container rounded-xl cursor-pointer shadow-sm">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center font-bold text-primary">
                SJ
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold truncate text-base font-body">Sarah Jenkins</span>
                <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider font-label">2m ago</span>
              </div>
              <p className="text-sm truncate opacity-90 font-body">Is the Calculus textbook still available?</p>
            </div>
          </div>

          {/* Inactive Chat Item */}
          <div className="flex items-center gap-4 p-4 bg-transparent hover:bg-surface-variant/50 rounded-xl cursor-pointer transition-all text-on-surface">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-highest flex items-center justify-center font-bold text-on-surface-variant">
                MC
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold truncate text-base font-body">Marcus Chen</span>
                <span className="text-[10px] text-outline font-medium uppercase tracking-wider font-label">1h ago</span>
              </div>
              <p className="text-sm truncate text-on-surface-variant font-body">I can meet at the campus library at 3PM today.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <section className="hidden md:flex flex-1 flex-col bg-surface overflow-hidden relative">
        {children}
      </section>
    </div>
  )
}
