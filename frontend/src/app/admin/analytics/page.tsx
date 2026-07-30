"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function AdminAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h2 className="font-bold text-h3 leading-8 tracking-tight text-[#0b1c30]">Analytics Overview</h2>
          <p className="text-small text-[#565e74]">Real-time platform performance and transaction metrics.</p>
        </div>
        <div className="flex gap-2 bg-[#eff4ff] p-1 rounded-lg border border-[#c7c4d8]">
          <button className="px-4 py-1.5 font-bold text-[11px] tracking-widest bg-white shadow-sm rounded-md text-[#3525cd]">DAILY</button>
          <button className="px-4 py-1.5 font-bold text-[11px] tracking-widest text-[#464555] hover:text-[#0b1c30]">WEEKLY</button>
          <button className="px-4 py-1.5 font-bold text-[11px] tracking-widest text-[#464555] hover:text-[#0b1c30]">MONTHLY</button>
        </div>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-12 gap-6">
        {/* Revenue vs Volume Chart */}
        <motion.div variants={fadeInUp} className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-[#c7c4d8] p-6 flex flex-col h-[420px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-[18px] text-[#0b1c30]">Revenue vs. Volume</h3>
              <div className="flex gap-4 mt-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#3525cd]"></span>
                  <span className="font-mono text-caption text-[#464555]">Gross Revenue ($)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#4b4dd8]"></span>
                  <span className="font-mono text-caption text-[#464555]">Transaction Volume</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-h3 text-[#3525cd]">$1.24M</span>
              <p className="font-bold text-[11px] tracking-widest text-green-600">+14.2% VS LY</p>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="absolute inset-0 flex flex-col justify-between py-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full border-t border-[#c7c4d8]/30 border-dashed"></div>
              ))}
            </div>
            
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path className="chart-path" d="M0,80 Q10,70 20,75 T40,60 T60,65 T80,40 T100,20" fill="none" stroke="#3525cd" strokeWidth="2"></path>
              <path className="chart-path" d="M0,90 Q10,85 20,88 T40,70 T60,78 T80,55 T100,45" fill="none" stroke="#4b4dd8" strokeDasharray="4" strokeWidth="1.5"></path>
              <path d="M0,80 Q10,70 20,75 T40,60 T60,65 T80,40 T100,20 V100 H0 Z" fill="url(#grad1)" opacity="0.1"></path>
              <defs>
                <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#3525cd" stopOpacity="1"></stop>
                  <stop offset="100%" stopColor="#3525cd" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex justify-between mt-4 font-mono text-caption text-[#464555]">
            <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span>
          </div>
        </motion.div>

        {/* User Growth by Campus (Bento Piece) */}
        <motion.div variants={fadeInUp} className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#4f46e5] text-white p-6 rounded-xl flex-1 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <span className="material-symbols-outlined text-display opacity-20 group-hover:scale-110 transition-transform">group_add</span>
            </div>
            <div>
              <h3 className="font-bold text-[18px] mb-1">User Growth</h3>
              <p className="text-[13px] opacity-80">New registrations this month</p>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-display">24,812</span>
                <span className="bg-white/20 px-2 py-0.5 rounded font-bold text-[10px]">+8.4%</span>
              </div>
              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center text-[13px]">
                  <span>UC Berkeley</span>
                  <span className="font-bold">4.2k</span>
                </div>
                <div className="w-full bg-white/20 h-1.5 rounded-full">
                  <div className="bg-white w-[85%] h-full rounded-full"></div>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span>Stanford</span>
                  <span className="font-bold">3.8k</span>
                </div>
                <div className="w-full bg-white/20 h-1.5 rounded-full">
                  <div className="bg-white w-[72%] h-full rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Category Performance */}
          <div className="bg-white border border-[#c7c4d8] p-6 rounded-xl flex-1">
            <h3 className="font-bold text-[18px] text-[#0b1c30] mb-4">Category Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#e5eeff] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px] text-[#3525cd]">book</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between font-semibold text-small mb-1">
                    <span>Textbooks</span>
                    <span>42%</span>
                  </div>
                  <div className="w-full bg-[#e5eeff] h-1.5 rounded-full">
                    <div className="bg-[#3525cd] w-[42%] h-full rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#e5eeff] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px] text-[#3130c0]">devices</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between font-semibold text-small mb-1">
                    <span>Electronics</span>
                    <span>28%</span>
                  </div>
                  <div className="w-full bg-[#e5eeff] h-1.5 rounded-full">
                    <div className="bg-[#3130c0] w-[28%] h-full rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#e5eeff] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px] text-[#0b1c30]">apparel</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between font-semibold text-small mb-1">
                    <span>Clothing</span>
                    <span>15%</span>
                  </div>
                  <div className="w-full bg-[#e5eeff] h-1.5 rounded-full">
                    <div className="bg-[#0b1c30] w-[15%] h-full rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-12 gap-6">
        {/* Top Selling Campuses Table */}
        <motion.div variants={fadeInUp} className="col-span-12 lg:col-span-7 bg-white rounded-xl border border-[#c7c4d8] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#c7c4d8] flex justify-between items-center">
            <h3 className="font-bold text-[18px] text-[#0b1c30]">Top Selling Campuses</h3>
            <button className="text-[#3525cd] font-semibold text-small hover:underline">Download CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#eff4ff] font-bold text-[11px] tracking-widest text-[#464555] uppercase">
                <tr>
                  <th className="px-6 py-3">Campus</th>
                  <th className="px-6 py-3">Active Listings</th>
                  <th className="px-6 py-3">Vol (MoM)</th>
                  <th className="px-6 py-3 text-right">Avg Transaction</th>
                  <th className="px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c7c4d8] text-[13px]">
                <tr className="hover:bg-[#eff4ff] transition-colors cursor-pointer">
                  <td className="px-6 py-3 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                    <span className="font-semibold text-[#0b1c30]">UC Berkeley</span>
                  </td>
                  <td className="px-6 py-3">12,402</td>
                  <td className="px-6 py-3 text-green-600 font-bold">+18.5%</td>
                  <td className="px-6 py-3 text-right">$42.50</td>
                  <td className="px-6 py-3 text-right">
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded font-bold text-[10px]">OPTIMAL</span>
                  </td>
                </tr>
                <tr className="hover:bg-[#eff4ff] transition-colors cursor-pointer">
                  <td className="px-6 py-3 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                    <span className="font-semibold text-[#0b1c30]">Stanford University</span>
                  </td>
                  <td className="px-6 py-3">9,812</td>
                  <td className="px-6 py-3 text-green-600 font-bold">+12.1%</td>
                  <td className="px-6 py-3 text-right">$68.20</td>
                  <td className="px-6 py-3 text-right">
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded font-bold text-[10px]">OPTIMAL</span>
                  </td>
                </tr>
                <tr className="hover:bg-[#eff4ff] transition-colors cursor-pointer">
                  <td className="px-6 py-3 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                    <span className="font-semibold text-[#0b1c30]">MIT</span>
                  </td>
                  <td className="px-6 py-3">7,241</td>
                  <td className="px-6 py-3 text-red-600 font-bold">-2.4%</td>
                  <td className="px-6 py-3 text-right">$91.10</td>
                  <td className="px-6 py-3 text-right">
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded font-bold text-[10px]">MONITOR</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Conversion Rate by Device */}
        <motion.div variants={fadeInUp} className="col-span-12 lg:col-span-5 bg-white rounded-xl border border-[#c7c4d8] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#c7c4d8]">
            <h3 className="font-bold text-[18px] text-[#0b1c30]">Conversion Rate by Device</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eff4ff" strokeDasharray="100, 100" strokeWidth="3"></path>
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3525cd" strokeDasharray="64, 100" strokeWidth="3"></path>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-bold text-[18px]">64%</span>
                  <span className="font-bold text-[8px] opacity-60">AVG</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 font-semibold text-small">
                    <span className="material-symbols-outlined text-[18px]">smartphone</span>
                    <span>Mobile App</span>
                  </div>
                  <span className="font-mono font-bold text-caption">72.4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 font-semibold text-small">
                    <span className="material-symbols-outlined text-[18px]">laptop</span>
                    <span>Desktop Web</span>
                  </div>
                  <span className="font-mono font-bold text-caption">48.1%</span>
                </div>
              </div>
            </div>
            
            {/* Mini Heatmap Visualization */}
            <div className="pt-4 border-t border-[#c7c4d8]">
              <p className="font-bold text-[11px] tracking-widest text-[#464555] mb-3">CONVERSION DENSITY (BY HOUR)</p>
              <div className="grid grid-cols-12 gap-1">
                {[10, 20, 5, 40, 60, 80, 95, 80, 40, 20, 10, 5, 5, 10, 30, 50, 70, 90, 100, 90, 60, 30, 10, 5].map((opacity, idx) => (
                  <div key={idx} className="h-4 bg-[#3525cd] rounded-sm" style={{ opacity: opacity / 100 }}></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
