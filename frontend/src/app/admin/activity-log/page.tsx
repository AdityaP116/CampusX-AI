"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function AdminActivityLogPage() {
  return (
    <div className="pb-12 max-w-[1200px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-bold text-h3 text-[#0b1c30] mb-1">Moderation Activity Log</h1>
          <p className="text-[13px] text-[#565e74]">A persistent, immutable audit trail of all system administration events.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#c7c4d8] bg-[#ffffff] rounded-lg font-semibold text-small hover:bg-[#eff4ff] transition-colors text-[#0b1c30]">
            <span className="material-symbols-outlined text-sm">download</span>
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#3525cd] text-white rounded-lg font-semibold text-small hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-sm">refresh</span>
            Refresh Log
          </button>
        </div>
      </div>

      {/* Dashboard Filters */}
      <div className="bg-[#ffffff] border border-[#c7c4d8] rounded-xl p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-[11px] tracking-widest text-[#777587] uppercase">Admin User</label>
            <select className="form-select w-full bg-[#eff4ff] border-none rounded-lg text-[13px] py-2 focus:ring-2 focus:ring-[#3525cd] outline-none">
              <option>All Admins</option>
              <option>Admin Sarah Miller</option>
              <option>Admin David Chen</option>
              <option>System Automator</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-[11px] tracking-widest text-[#777587] uppercase">Action Type</label>
            <select className="form-select w-full bg-[#eff4ff] border-none rounded-lg text-[13px] py-2 focus:ring-2 focus:ring-[#3525cd] outline-none">
              <option>All Types</option>
              <option>Verification</option>
              <option>Deletion</option>
              <option>Update</option>
              <option>Restriction</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-[11px] tracking-widest text-[#777587] uppercase">Date Range</label>
            <input className="form-input w-full bg-[#eff4ff] border-none rounded-lg text-[13px] py-2 focus:ring-2 focus:ring-[#3525cd] outline-none" type="date" />
          </div>
          <div className="flex items-end">
            <button className="w-full py-2 bg-[#dae2fd] text-[#5c647a] font-semibold text-small rounded-lg hover:bg-[#dce9ff] transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Activity Log Feed */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="bg-[#ffffff] border border-[#c7c4d8] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#eff4ff] text-left border-b border-[#c7c4d8]">
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest text-[#777587] uppercase">Timestamp</th>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest text-[#777587] uppercase">Admin</th>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest text-[#777587] uppercase">Action</th>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest text-[#777587] uppercase">Target Entity</th>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest text-[#777587] uppercase text-right">Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c7c4d8]">
              {/* Row 1 */}
              <motion.tr variants={fadeInUp} className="hover:bg-[#eff4ff] transition-colors group">
                <td className="px-4 py-4 font-mono text-caption text-[#565e74] whitespace-nowrap">2023-11-24 14:22:05</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#4f46e5] flex items-center justify-center text-[10px] text-white font-bold">SM</div>
                    <span className="font-semibold text-small text-[#0b1c30]">Sarah Miller</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">VERIFIED</span>
                </td>
                <td className="px-4 py-4 text-[13px] text-[#464555]">
                  <span className="font-bold text-[#0b1c30]">User: Alex Johnson</span>
                  <span className="text-[#565e74] ml-1 block text-[11px]">UID: 8829-XJ</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <button className="text-[#3525cd] font-semibold text-small hover:underline">View Proof</button>
                </td>
              </motion.tr>

              {/* Row 2 */}
              <motion.tr variants={fadeInUp} className="hover:bg-[#eff4ff] transition-colors group">
                <td className="px-4 py-4 font-mono text-caption text-[#565e74] whitespace-nowrap">2023-11-24 13:58:41</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#ffdad6] flex items-center justify-center text-[10px] text-[#93000a] font-bold">SY</div>
                    <span className="font-semibold text-small text-[#0b1c30]">System Guard</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold border border-[#ba1a1a]">DELETED</span>
                </td>
                <td className="px-4 py-4 text-[13px] text-[#464555]">
                  <span className="font-bold text-[#0b1c30]">Listing: iPhone 15 Pro Max</span>
                  <span className="text-[#565e74] ml-1 block text-[11px]">ID: L-77219</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="text-[#ba1a1a] text-[13px]">Reason: Scam Detected</span>
                </td>
              </motion.tr>

              {/* Row 3 */}
              <motion.tr variants={fadeInUp} className="hover:bg-[#eff4ff] transition-colors group border-l-4 border-[#3525cd]">
                <td className="px-4 py-4 font-mono text-caption text-[#565e74] whitespace-nowrap">2023-11-24 13:45:12</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#565e74] flex items-center justify-center text-[10px] text-white font-bold">DC</div>
                    <span className="font-semibold text-small text-[#0b1c30]">David Chen</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#5c647a] text-xs font-bold border border-[#c7c4d8]">UPDATED</span>
                </td>
                <td className="px-4 py-4 text-[13px] text-[#464555]">
                  <span className="font-bold text-[#0b1c30]">Category: Textbooks</span>
                  <span className="text-[#565e74] ml-1 block text-[11px]">CAT_ID: EDU_01</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="text-[#565e74] italic text-[13px]">Modified commission rate to 2%</span>
                </td>
              </motion.tr>

              {/* Row 4 */}
              <motion.tr variants={fadeInUp} className="hover:bg-[#eff4ff] transition-colors group">
                <td className="px-4 py-4 font-mono text-caption text-[#565e74] whitespace-nowrap">2023-11-24 12:30:00</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#4f46e5] flex items-center justify-center text-[10px] text-white font-bold">SM</div>
                    <span className="font-semibold text-small text-[#0b1c30]">Sarah Miller</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200">RESTRICTED</span>
                </td>
                <td className="px-4 py-4 text-[13px] text-[#464555]">
                  <span className="font-bold text-[#0b1c30]">User: Mark Spencer</span>
                  <span className="text-[#565e74] ml-1 block text-[11px]">UID: 1104-MS</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="text-[#565e74] text-[13px]">Flag: Spamming messages</span>
                </td>
              </motion.tr>

              {/* Row 5 */}
              <motion.tr variants={fadeInUp} className="hover:bg-[#eff4ff] transition-colors group">
                <td className="px-4 py-4 font-mono text-caption text-[#565e74] whitespace-nowrap">2023-11-24 11:15:22</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#ffdad6] flex items-center justify-center text-[10px] text-[#93000a] font-bold">SY</div>
                    <span className="font-semibold text-small text-[#0b1c30]">System Guard</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold border border-[#ba1a1a]">DELETED</span>
                </td>
                <td className="px-4 py-4 text-[13px] text-[#464555]">
                  <span className="font-bold text-[#0b1c30]">Listing: Mystery Box</span>
                  <span className="text-[#565e74] ml-1 block text-[11px]">ID: L-88122</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="text-[#ba1a1a] text-[13px]">Reason: Prohibited Item</span>
                </td>
              </motion.tr>

              {/* Row 6 */}
              <motion.tr variants={fadeInUp} className="hover:bg-[#eff4ff] transition-colors group">
                <td className="px-4 py-4 font-mono text-caption text-[#565e74] whitespace-nowrap">2023-11-24 10:05:45</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#565e74] flex items-center justify-center text-[10px] text-white font-bold">DC</div>
                    <span className="font-semibold text-small text-[#0b1c30]">David Chen</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">VERIFIED</span>
                </td>
                <td className="px-4 py-4 text-[13px] text-[#464555]">
                  <span className="font-bold text-[#0b1c30]">User: Emily Watson</span>
                  <span className="text-[#565e74] ml-1 block text-[11px]">UID: 9283-EW</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <button className="text-[#3525cd] font-semibold text-small hover:underline">View Proof</button>
                </td>
              </motion.tr>
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-4 py-3 bg-[#eff4ff] flex items-center justify-between border-t border-[#c7c4d8]">
          <span className="text-[13px] text-[#565e74]">Showing 1 to 6 of 1,284 actions</span>
          <div className="flex gap-1">
            <button className="p-1 rounded hover:bg-[#ffffff] transition-colors disabled:opacity-50 text-[#777587]" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="px-3 py-1 rounded bg-[#3525cd] text-white text-caption font-bold">1</button>
            <button className="px-3 py-1 rounded hover:bg-[#ffffff] text-[#565e74] text-caption">2</button>
            <button className="px-3 py-1 rounded hover:bg-[#ffffff] text-[#565e74] text-caption">3</button>
            <span className="px-2 py-1 text-caption text-[#777587]">...</span>
            <button className="px-3 py-1 rounded hover:bg-[#ffffff] text-[#565e74] text-caption">42</button>
            <button className="p-1 rounded hover:bg-[#ffffff] transition-colors text-[#565e74]">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Moderation Summary Bento Section */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <motion.div variants={fadeInUp} className="bg-[#ffffff] border border-[#c7c4d8] rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-small text-[#565e74] mb-4">Action Volume (24h)</h3>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-[36px] text-[#0b1c30]">142</span>
              <span className="text-emerald-600 font-bold text-xs flex items-center">
                <span className="material-symbols-outlined text-sm">arrow_upward</span>
                12%
              </span>
            </div>
          </div>
          <div className="h-2 w-full bg-[#eff4ff] mt-6 rounded-full overflow-hidden">
            <div className="h-full bg-[#3525cd] w-3/4 rounded-full"></div>
          </div>
          <p className="text-[11px] text-[#777587] mt-2">Target: 200 actions per cycle</p>
        </motion.div>
        
        <motion.div variants={fadeInUp} className="lg:col-span-2 bg-[#ffffff] border border-[#c7c4d8] rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-semibold text-small text-[#565e74]">Top Moderated Categories</h3>
            <span className="material-symbols-outlined text-[#777587]">more_horiz</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-[#eff4ff] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#3525cd] text-sm">smartphone</span>
                </span>
                <span className="text-small text-[#0b1c30]">Electronics</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-caption text-[#565e74]">42 actions</span>
                <div className="w-32 h-1.5 bg-[#eff4ff] rounded-full overflow-hidden">
                  <div className="h-full bg-[#ba1a1a] w-2/3"></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-[#eff4ff] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#3525cd] text-sm">school</span>
                </span>
                <span className="text-small text-[#0b1c30]">Academic Services</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-caption text-[#565e74]">28 actions</span>
                <div className="w-32 h-1.5 bg-[#eff4ff] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-1/3"></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-[#eff4ff] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#3525cd] text-sm">checkroom</span>
                </span>
                <span className="text-small text-[#0b1c30]">Fashion</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-caption text-[#565e74]">15 actions</span>
                <div className="w-32 h-1.5 bg-[#eff4ff] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-1/5"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#3525cd] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
}
