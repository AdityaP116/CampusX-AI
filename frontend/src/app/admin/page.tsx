"use client";

// =========================================================
// Admin Dashboard Page
// Pixel-perfect conversion of design/3/admin_dashboard
// =========================================================

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-bold text-h3 leading-8 tracking-tight text-[#0b1c30] mb-1">Operational Overview</h2>
          <p className="text-small text-[#565e74]">Real-time platform metrics and system health monitoring.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#c7c4d8] bg-[#ffffff] text-[#0b1c30] font-semibold text-small rounded-lg hover:bg-[#eff4ff] transition-colors">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            Last 24 Hours
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#3525cd] text-white font-semibold text-small rounded-lg hover:opacity-90 active:opacity-80 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export PDF
          </button>
        </div>
      </div>

      {/* Bento Metric Grid */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Metric 1: Total Active Users */}
        <motion.div variants={fadeInUp} className="bg-[#ffffff] border border-[#e2e8f0] p-5 rounded-xl hover:shadow-sm transition-shadow relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 -mr-8 -mt-8 bg-[#3525cd]/5 rounded-full group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-[#3525cd]/10 text-[#3525cd] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            </div>
            <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded text-caption font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-small">trending_up</span> 12%
            </span>
          </div>
          <p className="text-[#464555] mb-1 uppercase tracking-wider text-[11px] font-bold">Total Active Users</p>
          <h3 className="font-bold text-h3 text-[#0b1c30]">42,891</h3>
          <p className="text-[11px] text-[#565e74] mt-2">+342 since yesterday</p>
        </motion.div>

        {/* Metric 2: Daily GMV */}
        <motion.div variants={fadeInUp} className="bg-[#ffffff] border border-[#e2e8f0] p-5 rounded-xl hover:shadow-sm transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-[#dae2fd] text-[#3525cd] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            </div>
            <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded text-caption font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-small">trending_up</span> 4.5%
            </span>
          </div>
          <p className="text-[#464555] mb-1 uppercase tracking-wider text-[11px] font-bold">Daily GMV</p>
          <h3 className="font-bold text-h3 text-[#0b1c30]">$128.4k</h3>
          <p className="text-[11px] text-[#565e74] mt-2">Target: $150k daily average</p>
        </motion.div>

        {/* Metric 3: Pending Verifications (Urgent) */}
        <motion.div variants={fadeInUp} className="bg-[#ffffff] border border-[#e2e8f0] border-l-4 border-l-[#ba1a1a] p-5 rounded-xl hover:shadow-sm transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-[#ffdad6] text-[#ba1a1a] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_reg</span>
            </div>
            <span className="text-white bg-[#ba1a1a] px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter animate-pulse">Urgent</span>
          </div>
          <p className="text-[#464555] mb-1 uppercase tracking-wider text-[11px] font-bold">Pending Verifications</p>
          <h3 className="font-bold text-h3 text-[#0b1c30]">156</h3>
          <p className="text-[11px] text-[#ba1a1a] mt-2 font-bold">48 SLA violations detected</p>
        </motion.div>

        {/* Metric 4: Active Reports */}
        <motion.div variants={fadeInUp} className="bg-[#ffffff] border border-[#e2e8f0] p-5 rounded-xl hover:shadow-sm transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-[#dce9ff] text-[#0b1c30] rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
            </div>
            <span className="text-[#565e74] bg-[#e5eeff] px-2 py-0.5 rounded text-caption font-bold">Stable</span>
          </div>
          <p className="text-[#464555] mb-1 uppercase tracking-wider text-[11px] font-bold">Active Reports</p>
          <h3 className="font-bold text-h3 text-[#0b1c30]">24</h3>
          <p className="text-[11px] text-[#565e74] mt-2">Median response time: 1.2 hrs</p>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Platform Health Chart Section */}
        <div className="xl:col-span-2 bg-[#ffffff] border border-[#e2e8f0] rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="font-bold text-[18px] text-[#0b1c30]">Platform Health</h4>
              <p className="text-[13px] text-[#565e74]">Listing volume trends over the last 30 days</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#3525cd] rounded-full"></span>
                <span className="text-[13px] text-[#0b1c30]">Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#cbdbf5] rounded-full"></span>
                <span className="text-[13px] text-[#0b1c30]">Unverified</span>
              </div>
            </div>
          </div>
          
          {/* SVG Chart Visualization */}
          <div className="flex-1 w-full min-h-[350px] relative">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 300">
              <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="800" y1="50" y2="50"></line>
              <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="800" y1="100" y2="100"></line>
              <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="800" y1="150" y2="150"></line>
              <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="800" y1="200" y2="200"></line>
              <line stroke="#f1f5f9" strokeWidth="1" x1="0" x2="800" y1="250" y2="250"></line>
              
              <path d="M0,250 Q100,220 200,230 T400,150 T600,100 T800,80 V300 H0 Z" fill="url(#chartGradient)" fillOpacity="0.1"></path>
              <path d="M0,250 Q100,220 200,230 T400,150 T600,100 T800,80" fill="none" stroke="#3525cd" strokeLinecap="round" strokeWidth="3"></path>
              <path d="M0,280 Q150,260 300,270 T500,220 T800,200" fill="none" stroke="#cbd5e1" strokeDasharray="4" strokeWidth="2"></path>
              
              <defs>
                <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#3525cd" stopOpacity="1"></stop>
                  <stop offset="100%" stopColor="#3525cd" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
            </svg>
            
            {/* Chart Tooltip Interaction Example */}
            <div className="absolute top-[80px] left-[70%] transform -translate-x-1/2 -translate-y-full mb-4">
              <div className="bg-[#213145] text-white text-[11px] px-3 py-2 rounded shadow-lg">
                <p className="font-bold">Oct 12: 2,482 Listings</p>
                <p className="opacity-70">+12.4% vs prev week</p>
              </div>
              <div className="w-2 h-2 bg-[#213145] rotate-45 mx-auto -mt-1"></div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between text-[11px] text-[#565e74] font-mono px-2">
            <span>SEP 15</span>
            <span>SEP 22</span>
            <span>SEP 29</span>
            <span>OCT 06</span>
            <span>OCT 13</span>
            <span>TODAY</span>
          </div>
        </div>

        {/* Recent System Activity Feed */}
        <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-xl flex flex-col h-full">
          <div className="p-6 border-b border-[#c7c4d8] flex items-center justify-between">
            <h4 className="font-bold text-[18px] text-[#0b1c30]">System Activity</h4>
            <button className="text-[#3525cd] font-semibold text-small hover:underline">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex gap-4 p-3 hover:bg-[#eff4ff] rounded-lg transition-colors group">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </div>
              <div>
                <p className="text-[13px] text-[#0b1c30]"><span className="font-bold">Moderator Mark</span> approved listing <span className="text-[#3525cd]">#L-8821</span></p>
                <p className="text-[11px] text-[#565e74] mt-1">2 minutes ago • Automated Check Passed</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-3 hover:bg-[#eff4ff] rounded-lg transition-colors group">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
                <span className="material-symbols-outlined text-[18px]">warning</span>
              </div>
              <div>
                <p className="text-[13px] text-[#0b1c30]"><span className="font-bold">System</span> flagged suspicious user <span className="font-mono text-[#ba1a1a]">@bot_99x</span></p>
                <p className="text-[11px] text-[#565e74] mt-1">15 minutes ago • High velocity IP address</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-3 hover:bg-[#eff4ff] rounded-lg transition-colors group">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#dce9ff] flex items-center justify-center text-[#565e74]">
                <span className="material-symbols-outlined text-[18px]">update</span>
              </div>
              <div>
                <p className="text-[13px] text-[#0b1c30]"><span className="font-bold">Global Config</span> updated by <span className="font-bold">Alex R.</span></p>
                <p className="text-[11px] text-[#565e74] mt-1">1 hour ago • Updated Category &quot;Laptops&quot;</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-3 hover:bg-[#eff4ff] rounded-lg transition-colors group">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4f46e5]/20 flex items-center justify-center text-[#3525cd]">
                <span className="material-symbols-outlined text-[18px]">broadcast_on_home</span>
              </div>
              <div>
                <p className="text-[13px] text-[#0b1c30]"><span className="font-bold">New Broadcast</span> sent to <span className="font-bold">4,200</span> users</p>
                <p className="text-[11px] text-[#565e74] mt-1">3 hours ago • Campaign: Maintenance Alert</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-3 hover:bg-[#eff4ff] rounded-lg transition-colors group">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
              <div>
                <p className="text-[13px] text-[#0b1c30]"><span className="font-bold">Payout</span> batch processed: <span className="font-bold">$42,800</span></p>
                <p className="text-[11px] text-[#565e74] mt-1">5 hours ago • 120 vendors paid</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 py-8 border-t border-[#c7c4d8] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[11px] font-mono text-[#565e74] uppercase tracking-widest">Server Status: Optimal</span>
          </div>
          <div className="text-[11px] font-mono text-[#565e74] uppercase tracking-widest">Instance: PROD-US-WEST-1A</div>
        </div>
        <div className="text-[13px] text-[#777587]">
          © 2024 CampusX Operating System. v4.2.1-stable.
        </div>
      </footer>
    </div>
  );
}
