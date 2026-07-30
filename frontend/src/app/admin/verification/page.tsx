"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function AdminVerificationPage() {
  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="font-bold text-h3 leading-8 tracking-tight text-[#0b1c30] mb-1">User Verification Queue</h1>
          <p className="text-small text-[#464555]">Review and manage pending student ID verifications across all campuses.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#e5eeff] px-3 py-1.5 rounded-lg border border-[#c7c4d8] text-[13px] text-[#0b1c30]">
            <span className="font-bold mr-2">Total Pending:</span> 124
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-[#ffffff] border border-[#c7c4d8] rounded-xl shadow-sm">
        <div className="flex flex-col gap-1">
          <label className="font-bold text-[11px] tracking-widest text-[#777587] uppercase">Campus</label>
          <select className="form-select border-[#c7c4d8] rounded-lg text-[13px] focus:border-[#3525cd] focus:ring-[#3525cd]/20 bg-[#f8f9ff]">
            <option>All Campuses</option>
            <option>Main Campus (North)</option>
            <option>East Side Campus</option>
            <option>City Tech Hub</option>
            <option>West View Annex</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-[11px] tracking-widest text-[#777587] uppercase">Submission Date</label>
          <select className="form-select border-[#c7c4d8] rounded-lg text-[13px] focus:border-[#3525cd] focus:ring-[#3525cd]/20 bg-[#f8f9ff]">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Custom Range</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-[11px] tracking-widest text-[#777587] uppercase">Urgency</label>
          <div className="flex items-center gap-2 h-10">
            <button className="px-3 py-1 bg-[#d3e4fe] rounded-full text-[13px] font-bold text-[#3525cd]">All</button>
            <button className="px-3 py-1 hover:bg-[#e5eeff] rounded-full text-[13px] text-[#565e74]">High</button>
            <button className="px-3 py-1 hover:bg-[#e5eeff] rounded-full text-[13px] text-[#565e74]">New</button>
          </div>
        </div>
        <div className="flex items-end">
          <button className="h-10 px-6 w-full bg-[#565e74] text-white rounded-lg font-semibold text-small hover:bg-[#565e74]/90 transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Apply Filters
          </button>
        </div>
      </section>

      {/* Verification Queue Table */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="bg-[#ffffff] border border-[#c7c4d8] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#e5eeff] text-[#464555] border-b border-[#c7c4d8]">
              <tr>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest uppercase">User Information</th>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest uppercase">Campus</th>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest uppercase">Submitted</th>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest uppercase">ID Document</th>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c7c4d8]/30">
              {/* Row 1 */}
              <motion.tr variants={fadeInUp} className="hover:bg-[#eff4ff] transition-colors group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#e1e0ff] flex items-center justify-center text-[#07006c] font-bold text-[13px]">AJ</div>
                    <div>
                      <div className="font-semibold text-small text-[#0b1c30]">Alex Johnson</div>
                      <div className="text-caption text-[#777587]">alex.j@student.campusx.edu</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[13px] text-[#565e74]">Main Campus (North)</td>
                <td className="px-4 py-3 text-[13px] text-[#565e74]">Today, 09:42 AM</td>
                <td className="px-4 py-3">
                  <div className="relative group/thumb cursor-pointer">
                    <div className="w-16 h-10 rounded border border-[#c7c4d8] overflow-hidden bg-slate-100 flex items-center justify-center">
                      <Image width={64} height={40} src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-ySAhXdE_7ME_nFV2-0wxHupQsqC7C36Ts4Dr2a6f8KQujDKGfRTeoAhvjgb6DPTDBwhi_OsZm89qlBSZItWBgu-sgQVjrUB2DjXAA4Gtq447iQ2vCyAPlhbnar7ffxaPJtxgDNk2ihPgcQD8xkZCqIVM3ucx42TduE9vZ7zrY6BK39Z1CjhG3whJ-38e5cgN0ELP3p1jDtLQH3vE59-OvxaRYPtnAUJfOhT6eEghdYer7k_BkDe_BeTpOZ2SfTysJfyGLxOjPb-C" alt="ID Document" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity rounded">
                      <span className="material-symbols-outlined text-white text-body">zoom_in</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100">
                    <button className="px-3 py-1.5 bg-[#3525cd] text-white rounded font-semibold text-caption hover:bg-[#3525cd]/90 transition-colors">Approve</button>
                    <button className="px-3 py-1.5 bg-[#f8f9ff] text-[#565e74] border border-[#c7c4d8] rounded font-semibold text-caption hover:bg-[#d3e4fe] transition-colors">Reject</button>
                    <button className="p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded transition-colors" title="Flag for Review">
                      <span className="material-symbols-outlined text-title">flag</span>
                    </button>
                  </div>
                </td>
              </motion.tr>

              {/* Row 2 */}
              <motion.tr variants={fadeInUp} className="hover:bg-[#eff4ff] transition-colors group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#131b2e] font-bold text-[13px]">SM</div>
                    <div>
                      <div className="font-semibold text-small text-[#0b1c30]">Sarah Miller</div>
                      <div className="text-caption text-[#777587]">sarah.m@student.campusx.edu</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[13px] text-[#565e74]">City Tech Hub</td>
                <td className="px-4 py-3 text-[13px] text-[#565e74]">Yesterday, 11:20 PM</td>
                <td className="px-4 py-3">
                  <div className="relative group/thumb cursor-pointer">
                    <div className="w-16 h-10 rounded border border-[#c7c4d8] overflow-hidden bg-slate-100 flex items-center justify-center">
                      <Image width={64} height={40} src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1hS4WzSD3AZA-RtupH3eWCrkWClqf2SWTdOyhkLTydzLzV4Lg_5_QgodDPWLPdtLYb0CI48BERzE4rKoxiAXtA7d9h4_t2wSbQfzax3mYqkoMfEQbuGc1bGZGNnFuND4Ec4aNwWf_WAMtzxpUrNMveEz_wOCYsgmIk2xQY5oNto0Bx84h31ZHei8qujjo-6uoAtBoPRZHc0otowVUE8vgw_PNkpre1xCb2yTgMTLEeRk8lpVJ5OmRO_0xnWHL-brzPV5gQ3ZTNIjj" alt="ID Document" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity rounded">
                      <span className="material-symbols-outlined text-white text-body">zoom_in</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100">
                    <button className="px-3 py-1.5 bg-[#3525cd] text-white rounded font-semibold text-caption hover:bg-[#3525cd]/90 transition-colors">Approve</button>
                    <button className="px-3 py-1.5 bg-[#f8f9ff] text-[#565e74] border border-[#c7c4d8] rounded font-semibold text-caption hover:bg-[#d3e4fe] transition-colors">Reject</button>
                    <button className="p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded transition-colors" title="Flag for Review">
                      <span className="material-symbols-outlined text-title">flag</span>
                    </button>
                  </div>
                </td>
              </motion.tr>

              {/* Row 3 (Flagged State Example) */}
              <motion.tr variants={fadeInUp} className="bg-[#ffdad6]/30 hover:bg-[#ffdad6]/50 transition-colors group relative">
                <td className="absolute left-0 top-0 bottom-0 w-1 bg-[#ba1a1a]"></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#93000a] font-bold text-[13px]">RK</div>
                    <div>
                      <div className="font-semibold text-small text-[#0b1c30]">Ryan Kim</div>
                      <div className="text-caption text-[#ba1a1a] flex items-center gap-1">
                        <span className="material-symbols-outlined text-caption">warning</span> Suspected mismatch
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[13px] text-[#565e74]">West View Annex</td>
                <td className="px-4 py-3 text-[13px] text-[#565e74]">Yesterday, 04:15 PM</td>
                <td className="px-4 py-3">
                  <div className="relative group/thumb cursor-pointer">
                    <div className="w-16 h-10 rounded border border-[#ba1a1a] overflow-hidden bg-slate-100 flex items-center justify-center">
                      <Image width={64} height={40} src="https://lh3.googleusercontent.com/aida-public/AB6AXuD25CjhRXUvPmrQnIbfPN3Z8nyiOpqK4FcXJCxp6EXHn5R8PO4fZGX0ro-nBO7DeV1GeDkpAMO4JXOhrB-ggO6j_xApZyIe6VabWhAx3V5S_0B7U0bWOr1d4R657QqN3E0mIid8JYpkMxxf5j4RvElRUHUSZSqej2fE2HZWycnX4Z2Kx102e9OpyXbCToZAULMpwMly-Mdmcw2rnPBRTL3JOL7H8WK4KVlZbNrZo5uHKHZ4NeZAUzpARcLDkkUF7soCZMgHTOpir0h_" alt="ID Document" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity rounded">
                      <span className="material-symbols-outlined text-white text-body">zoom_in</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button className="px-3 py-1.5 bg-[#ba1a1a] text-white rounded font-semibold text-caption hover:bg-[#ba1a1a]/90 transition-colors">Re-evaluate</button>
                    <button className="p-1.5 text-[#565e74] hover:bg-[#e5eeff] rounded transition-colors">
                      <span className="material-symbols-outlined text-title">more_vert</span>
                    </button>
                  </div>
                </td>
              </motion.tr>

              {/* Row 4 */}
              <motion.tr variants={fadeInUp} className="hover:bg-[#eff4ff] transition-colors group">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#e2dfff] flex items-center justify-center text-[#0f0069] font-bold text-[13px]">EL</div>
                    <div>
                      <div className="font-semibold text-small text-[#0b1c30]">Emily Lopez</div>
                      <div className="text-caption text-[#777587]">emily.l@student.campusx.edu</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[13px] text-[#565e74]">East Side Campus</td>
                <td className="px-4 py-3 text-[13px] text-[#565e74]">Yesterday, 02:30 PM</td>
                <td className="px-4 py-3">
                  <div className="relative group/thumb cursor-pointer">
                    <div className="w-16 h-10 rounded border border-[#c7c4d8] overflow-hidden bg-slate-100 flex items-center justify-center">
                      <Image width={64} height={40} src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlXlepR0lRRMK8a9EG7_IjB6UQm7jVDNvdHrJBxXBeZ9kunJFqvf5aGCBNChSFTcLkBAVc-7H5TJ7yvNuJ4R6GDwFFMfgN7yJEdF9S3LTWlj0Syg1VthWElt4UO4YOx8QNjcz6ywwIxYSAHgSiY9IKK2lDVP0zAUFRGaRKXT8xW6vmBHJvQjPFpNNL8ZjngZSz0tR9M29YsxUlj_IV6fO7pXmv6VlM5x-RLsm_kZN0maFILGlU8yS-f53gHjMP6FBQ6a1JZlfK8Rbd" alt="ID Document" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity rounded">
                      <span className="material-symbols-outlined text-white text-body">zoom_in</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100">
                    <button className="px-3 py-1.5 bg-[#3525cd] text-white rounded font-semibold text-caption hover:bg-[#3525cd]/90 transition-colors">Approve</button>
                    <button className="px-3 py-1.5 bg-[#f8f9ff] text-[#565e74] border border-[#c7c4d8] rounded font-semibold text-caption hover:bg-[#d3e4fe] transition-colors">Reject</button>
                    <button className="p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded transition-colors" title="Flag for Review">
                      <span className="material-symbols-outlined text-title">flag</span>
                    </button>
                  </div>
                </td>
              </motion.tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 bg-[#eff4ff] flex items-center justify-between border-t border-[#c7c4d8]">
          <span className="text-[13px] text-[#464555]">Showing <span className="font-bold">1-4</span> of 124 requests</span>
          <div className="flex gap-1">
            <button className="p-1.5 rounded border border-[#c7c4d8] bg-[#ffffff] text-[#c7c4d8] cursor-not-allowed">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded bg-[#3525cd] text-white font-semibold text-[13px] flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded hover:bg-[#e5eeff] text-[#565e74] font-semibold text-[13px] flex items-center justify-center">2</button>
            <button className="w-8 h-8 rounded hover:bg-[#e5eeff] text-[#565e74] font-semibold text-[13px] flex items-center justify-center">3</button>
            <button className="p-1.5 rounded border border-[#c7c4d8] bg-[#ffffff] text-[#565e74] hover:bg-[#e5eeff]">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Bento Stats Grid */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <motion.div variants={fadeInUp} className="bg-[#ffffff] p-6 rounded-2xl border border-[#c7c4d8] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-[#3525cd] text-h2">verified</span>
            <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded text-[11px] font-bold">+12%</span>
          </div>
          <div className="font-bold text-h3 mb-1 text-[#0b1c30]">1,240</div>
          <div className="font-bold text-[11px] tracking-widest text-[#777587] uppercase">Verified Students</div>
        </motion.div>
        <motion.div variants={fadeInUp} className="bg-[#ffffff] p-6 rounded-2xl border border-[#c7c4d8] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-[#3130c0] text-h2">pending_actions</span>
            <span className="text-amber-600 bg-amber-100 px-2 py-0.5 rounded text-[11px] font-bold">Queue Full</span>
          </div>
          <div className="font-bold text-h3 mb-1 text-[#0b1c30]">124</div>
          <div className="font-bold text-[11px] tracking-widest text-[#777587] uppercase">Pending Requests</div>
        </motion.div>
        <motion.div variants={fadeInUp} className="bg-[#ffffff] p-6 rounded-2xl border border-[#c7c4d8] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#3525cd]/5 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="material-symbols-outlined text-[#ba1a1a] text-h2">gavel</span>
            <span className="text-[#565e74] bg-[#e5eeff] px-2 py-0.5 rounded text-[11px] font-bold">2.4% rate</span>
          </div>
          <div className="font-bold text-h3 mb-1 text-[#0b1c30]">32</div>
          <div className="font-bold text-[11px] tracking-widest text-[#777587] uppercase">Rejected Today</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
