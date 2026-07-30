"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

interface Listing {
  id: string;
  title: string;
  timeAgo: string;
  sellerInitials: string;
  sellerName: string;
  sellerColor: string;
  price: string;
  category: string;
  status: "LIVE" | "PENDING" | "REMOVED";
  views: number;
  imageUrl: string;
}

const MOCK_LISTINGS: Listing[] = [
  {
    id: "LX-9842",
    title: "Ergonomic Desk Chair",
    timeAgo: "2 hours ago",
    sellerInitials: "AS",
    sellerName: "Alex Smith",
    sellerColor: "bg-[#4f46e5] text-white",
    price: "$120.00",
    category: "FURNITURE",
    status: "LIVE",
    views: 1240,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0ZzSND-CTEC5khgwEqyZPPC-Z4oMfx_6bRXKsS9oxRsZ3II6mpgq2MmtZkJVLJuBQ8VqSIqzMg7_NkCjNDnPIxyhY_gVs-cIekBR2RgEKOm02GZbUdOtYzY3IE8_Qa4rMc58SBWQKGK4Py8HgSpEsxr4Vvv1gRr46CIQP89jd6o4OC6G4l8EIu9XmhUaqToMgepDW0fJUBC4cmvuGqHrL9vc50UD8Nc4zgt8WoABfWVNjoNMyxyk05n0uJ6JAYIa-0CtPUajBiDoe"
  },
  {
    id: "LX-9841",
    title: "Calculus III Bundle",
    timeAgo: "5 hours ago",
    sellerInitials: "LM",
    sellerName: "Lana Morris",
    sellerColor: "bg-[#dae2fd] text-[#131b2e]",
    price: "$45.00",
    category: "BOOKS",
    status: "PENDING",
    views: 312,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZywoiDWpzJc3hnX1uWJNFGV7kcwT3OKLwJE3GyFuA4QaHuYtwOOmYu7yHcCLwl2nlJLYHON2w8noIhr59F6alWkd28za2F8nKZZ9xyQBXVHSBLcpyse1CPhTPCJwa3sT99qAFLMnDr7D0NsZloNjlv-1YBetshUoJH2T8wwAMFOrzAScd-J82kkt-DcQYGvHZA82NwyTbbrqY3JkZOQ6aCZrIc5fRyGLWn-uYGS-7khRg6WZSo5W3F8czBXPI1wVwP7f7b10Yrbtr"
  },
  {
    id: "LX-9840",
    title: "Vintage Canon AE-1",
    timeAgo: "Yesterday",
    sellerInitials: "JW",
    sellerName: "Jordan White",
    sellerColor: "bg-[#4b4dd8] text-white",
    price: "$210.00",
    category: "ELECTRONICS",
    status: "REMOVED",
    views: 89,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDU-SEnPp9doRsEiR7KxlrxGkvf7iVIYOY4Wuw9yR8v9eLYgYEnjdI8bvaigFUMTEZu0KqJINI5G7__4zLGbDbcli6AYYLHdN8rCks0652lvJEl6QNmVQXD0kmCRBobF5NVtWNCS4mE6Lt-R47AyatvOID8w5xdSW5sUhQ8ySF2aktTRT2jl9N8oLY_Yllqis8knvucE4WkMcdLryw7MTKyNovGOGlgNgra2iAPkHEq0mYiRVbdVrM84VdGWgjKTr4xKLZTAiutm7nq"
  },
  {
    id: "LX-9839",
    title: "Small Microwave",
    timeAgo: "1 day ago",
    sellerInitials: "KC",
    sellerName: "Kelly Chen",
    sellerColor: "bg-[#3525cd] text-white",
    price: "$30.00",
    category: "APPLIANCES",
    status: "LIVE",
    views: 562,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTBMd1sxrbD3_qUsKU58ZLB-3t5Dxnc3_VtZboecTZn8P_XpQjJ11ui2eJxl112MwT5FclZX6pQqtr3DEOvcvqFj90PTJ-H9mprKnGbrQqBwpCzAKksTeguHTQiWbGR3nP-JCTtAXhMsZ_TKITb9Nn5hTSIC0XjrCO9K-E96Uc76GYEnrTlJjz-kI7XTghFl-mzVpBRVUNnRPFhe-eku8c8HOFiT3WwolPgh-l852QUL3QlrcKXgdn69Yi3QZZwIxnbVTHQ5tMT9ik"
  },
  {
    id: "LX-9838",
    title: "Logitech G Pro Mouse",
    timeAgo: "2 days ago",
    sellerInitials: "DR",
    sellerName: "Dave Richards",
    sellerColor: "bg-[#3f465c] text-white",
    price: "$85.00",
    category: "ELECTRONICS",
    status: "LIVE",
    views: 921,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqRT5UwH9DszXry53ghpKgdhrcBtT5VJWTUI3PKOBbuYZDOEoXX4byenlRKvBqi49VpOpRPTtepCgjOYfVeLV43TVIkzrpQ0XDriJgmloqIv1xN8K8U1WBsDurGvAqtEfCk6cAoz214uzSP6P-NHSkyskYw1R-vzGycRzT2tgcaHTYrCpDYbkfEnWQzfRcB3LtTeHq6Gxc-tcWO38tSLdh0B-211krreEE4pVkxq-TcpmDLo-tQZ_JfBlT4J6mmKA3O4jFO6r9m_hk"
  }
];

export default function AdminListingsPage() {
  const [selectedListings, setSelectedListings] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedListings(MOCK_LISTINGS.map(l => l.id));
    } else {
      setSelectedListings([]);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedListings(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bold text-h3 text-[#0b1c30]">Master Listings Management</h1>
          <p className="text-small text-[#565e74] mt-1">Audit and moderate all campus-wide peer-to-peer inventory.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#c7c4d8] bg-[#f8f9ff] hover:bg-[#eff4ff] text-[#0b1c30] font-semibold text-small rounded-lg transition-all">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#3525cd] text-white font-semibold text-small rounded-lg hover:bg-[#4f46e5] transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Create Listing
          </button>
        </div>
      </div>

      {/* Filters & Bulk Actions Container */}
      <div className="bg-[#f8f9ff] rounded-xl border border-[#c7c4d8] shadow-sm mb-6">
        {/* Detailed Filters Accordion */}
        <div className="p-6 border-b border-[#c7c4d8] bg-[#ffffff]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="font-bold text-[11px] tracking-widest text-[#777587] uppercase">Search Inventory</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#777587] text-[18px]">search</span>
                <input className="w-full pl-10 pr-4 py-2 bg-[#f8f9ff] border border-[#c7c4d8] rounded-lg focus:ring-2 focus:ring-[#3525cd] focus:border-transparent text-[13px] outline-none transition-all" placeholder="Title, ID, or Seller" type="text" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-bold text-[11px] tracking-widest text-[#777587] uppercase">Price Range</label>
              <div className="flex items-center gap-2">
                <input className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c7c4d8] rounded-lg text-[13px] outline-none" placeholder="Min" type="number" />
                <span className="text-[#777587]">—</span>
                <input className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c7c4d8] rounded-lg text-[13px] outline-none" placeholder="Max" type="number" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-bold text-[11px] tracking-widest text-[#777587] uppercase">Condition</label>
              <select className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c7c4d8] rounded-lg text-[13px] outline-none appearance-none cursor-pointer">
                <option>All Conditions</option>
                <option>Brand New</option>
                <option>Like New</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-bold text-[11px] tracking-widest text-[#777587] uppercase">Campus Location</label>
              <select className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#c7c4d8] rounded-lg text-[13px] outline-none appearance-none cursor-pointer">
                <option>All Campuses</option>
                <option>North Campus</option>
                <option>South Campus</option>
                <option>Engineering Hub</option>
                <option>Medical Center</option>
              </select>
            </div>
          </div>
        </div>
        {/* Bulk Actions Bar */}
        <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-[#f8f9ff]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 py-1.5 px-3 bg-[#dce9ff] rounded-lg">
              <input 
                className="w-4 h-4 rounded border-[#777587] text-[#3525cd] focus:ring-[#3525cd]" 
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedListings.length === MOCK_LISTINGS.length && MOCK_LISTINGS.length > 0}
              />
              <span className="font-semibold text-small text-[#464555] ml-1">{selectedListings.length} selected</span>
            </div>
            <div className="h-6 w-[1px] bg-[#c7c4d8]"></div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 text-[#565e74] hover:bg-[#eff4ff] rounded-lg transition-all font-semibold text-small">
                <span className="material-symbols-outlined text-[18px]">visibility_off</span>
                Hide Selected
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 text-[#565e74] hover:bg-[#eff4ff] rounded-lg transition-all font-semibold text-small">
                <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                Change Category
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 text-[#565e74] hover:bg-[#eff4ff] rounded-lg transition-all font-semibold text-small">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Mark as Sold
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#777587]">Viewing 1-50 of 1,284 listings</span>
            <div className="flex items-center border border-[#c7c4d8] rounded-lg overflow-hidden">
              <button className="p-2 bg-[#f8f9ff] hover:bg-[#eff4ff] disabled:opacity-30">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="p-2 bg-[#f8f9ff] hover:bg-[#eff4ff]">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eff4ff] border-y border-[#c7c4d8]">
                <th className="px-6 py-3 w-10">
                  <input 
                    className="w-4 h-4 rounded border-[#777587] text-[#3525cd] focus:ring-[#3525cd]" 
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedListings.length === MOCK_LISTINGS.length && MOCK_LISTINGS.length > 0}
                  />
                </th>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest text-[#565e74] uppercase">ID</th>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest text-[#565e74] uppercase">Title</th>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest text-[#565e74] uppercase">Seller</th>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest text-[#565e74] uppercase text-right">Price</th>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest text-[#565e74] uppercase">Category</th>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest text-[#565e74] uppercase">Status</th>
                <th className="px-4 py-3 font-bold text-[11px] tracking-widest text-[#565e74] uppercase text-right">Views</th>
                <th className="px-6 py-3 font-bold text-[11px] tracking-widest text-[#565e74] uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c7c4d8]">
              {MOCK_LISTINGS.map((listing) => (
                <tr key={listing.id} className="hover:bg-[#eff4ff] transition-colors group">
                  <td className="px-6 py-4">
                    <input 
                      className="w-4 h-4 rounded border-[#777587] text-[#3525cd] focus:ring-[#3525cd]" 
                      type="checkbox"
                      checked={selectedListings.includes(listing.id)}
                      onChange={() => handleSelect(listing.id)}
                    />
                  </td>
                  <td className="px-4 py-4 font-mono text-caption text-[#777587]">{listing.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#dce9ff] shrink-0">
                        <Image src={listing.imageUrl} alt={listing.title} width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-small text-[#0b1c30]">{listing.title}</div>
                        <div className="text-[11px] text-[#777587] flex items-center gap-1">
                          <span className="material-symbols-outlined text-caption">schedule</span>
                          {listing.timeAgo}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${listing.sellerColor} text-[10px] flex items-center justify-center font-bold`}>{listing.sellerInitials}</div>
                      <span className="text-[13px] text-[#0b1c30]">{listing.sellerName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-semibold text-small text-[#0b1c30]">{listing.price}</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 rounded bg-[#dae2fd] text-[#5c647a] text-[11px] font-bold">{listing.category}</span>
                  </td>
                  <td className="px-4 py-4">
                    {listing.status === "LIVE" && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold w-fit">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>LIVE
                      </div>
                    )}
                    {listing.status === "PENDING" && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold w-fit">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>PENDING
                      </div>
                    )}
                    {listing.status === "REMOVED" && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold w-fit">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>REMOVED
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right text-[13px] text-[#565e74]">{listing.views.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {listing.status === "REMOVED" ? (
                        <>
                          <button className="p-1.5 text-[#565e74] hover:text-[#3525cd] transition-colors">
                            <span className="material-symbols-outlined text-[18px]">restore_from_trash</span>
                          </button>
                          <button className="p-1.5 text-[#565e74] hover:text-[#ba1a1a] transition-colors">
                            <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="p-1.5 text-[#565e74] hover:text-[#3525cd] transition-colors">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button className="p-1.5 text-[#565e74] hover:text-[#ba1a1a] transition-colors">
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </>
                      )}
                      
                      <button className="p-1.5 text-[#565e74] hover:bg-[#d3e4fe] rounded transition-colors">
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer Pagination density control */}
        <div className="px-6 py-4 bg-[#ffffff] border-t border-[#c7c4d8] flex items-center justify-between rounded-b-xl">
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#777587]">Show rows:</span>
            <select className="px-2 py-1 bg-[#f8f9ff] border border-[#c7c4d8] rounded text-[13px] outline-none">
              <option>50</option>
              <option>100</option>
              <option>250</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-[13px] font-bold bg-[#3525cd] text-white rounded-lg shadow-sm">1</button>
            <button className="px-3 py-1.5 text-[13px] font-bold text-[#464555] hover:bg-[#e5eeff] rounded-lg">2</button>
            <button className="px-3 py-1.5 text-[13px] font-bold text-[#464555] hover:bg-[#e5eeff] rounded-lg">3</button>
            <span className="px-2 text-[#777587]">...</span>
            <button className="px-3 py-1.5 text-[13px] font-bold text-[#464555] hover:bg-[#e5eeff] rounded-lg">26</button>
          </div>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <motion.div variants={fadeInUp} className="p-5 bg-[#f8f9ff] border border-[#c7c4d8] rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#777587] text-[13px]">Total Active Listings</span>
            <span className="material-symbols-outlined text-[#3525cd] text-title">inventory_2</span>
          </div>
          <div className="text-2xl font-bold text-h3 text-[#0b1c30]">8,421</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">↑ 12% from last month</div>
        </motion.div>
        <motion.div variants={fadeInUp} className="p-5 bg-[#f8f9ff] border border-[#c7c4d8] rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#777587] text-[13px]">Pending Verification</span>
            <span className="material-symbols-outlined text-amber-500 text-title">verified_user</span>
          </div>
          <div className="text-2xl font-bold text-h3 text-[#0b1c30]">143</div>
          <div className="text-[11px] text-amber-600 font-bold mt-1">Review required within 24h</div>
        </motion.div>
        <motion.div variants={fadeInUp} className="p-5 bg-[#f8f9ff] border border-[#c7c4d8] rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#777587] text-[13px]">Average Views/Day</span>
            <span className="material-symbols-outlined text-[#3130c0] text-title">visibility</span>
          </div>
          <div className="text-2xl font-bold text-h3 text-[#0b1c30]">24,502</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">↑ 4.2% active engagement</div>
        </motion.div>
        <motion.div variants={fadeInUp} className="p-5 bg-[#f8f9ff] border border-[#c7c4d8] rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#777587] text-[13px]">Flagged Listings</span>
            <span className="material-symbols-outlined text-[#ba1a1a] text-title">report</span>
          </div>
          <div className="text-2xl font-bold text-h3 text-[#0b1c30]">28</div>
          <div className="text-[11px] text-[#ba1a1a] font-bold mt-1">Immediate action needed</div>
        </motion.div>
      </motion.div>

      {/* Global Overlay for micro-interactions */}
      <AnimatePresence>
        {selectedListings.length > 0 && (
          <motion.div 
            initial={{ y: 128 }}
            animate={{ y: 0 }}
            exit={{ y: 128 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#213145] text-[#eaf1ff] px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 z-[100]"
          >
            <span className="font-semibold text-small"><span>{selectedListings.length}</span> items selected</span>
            <div className="w-[1px] h-4 bg-[#777587]"></div>
            <div className="flex items-center gap-4">
              <button className="hover:text-[#c3c0ff] transition-colors flex items-center gap-1.5 text-[13px] font-bold">
                <span className="material-symbols-outlined text-[18px]">archive</span> Archive
              </button>
              <button className="hover:text-[#ffdad6] transition-colors flex items-center gap-1.5 text-[13px] font-bold">
                <span className="material-symbols-outlined text-[18px]">delete</span> Delete
              </button>
              <button className="ml-2 text-[#777587] hover:text-white transition-colors" onClick={() => setSelectedListings([])}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
