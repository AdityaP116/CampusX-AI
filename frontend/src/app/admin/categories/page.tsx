"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

interface CategoryNode {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  status: "Active" | "Draft";
  colorClass: string;
  children?: CategoryNode[];
}

const TAXONOMY: CategoryNode[] = [
  {
    id: "academic",
    name: "Academic",
    description: "Primary education pillar",
    icon: "school",
    count: 4281,
    status: "Active",
    colorClass: "bg-indigo-50 border-indigo-100 text-[#3525cd]",
    children: [
      {
        id: "academic-textbooks",
        name: "Textbooks",
        description: "",
        icon: "menu_book",
        count: 3120,
        status: "Active",
        colorClass: "bg-[#f8f9ff] border-[#c7c4d8] text-[#565e74]",
      },
      {
        id: "academic-lab-kits",
        name: "Lab Kits",
        description: "",
        icon: "science",
        count: 1161,
        status: "Active",
        colorClass: "bg-[#f8f9ff] border-[#c7c4d8] text-[#565e74]",
      }
    ]
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Devices and accessories",
    icon: "devices",
    count: 1842,
    status: "Active",
    colorClass: "bg-blue-50 border-blue-100 text-blue-600",
    children: [
      {
        id: "electronics-laptops",
        name: "Laptops",
        description: "",
        icon: "laptop_mac",
        count: 842,
        status: "Active",
        colorClass: "bg-[#f8f9ff] border-[#c7c4d8] text-[#565e74]",
      },
      {
        id: "electronics-audio",
        name: "Audio Gear (Draft)",
        description: "",
        icon: "headphones",
        count: 0,
        status: "Draft",
        colorClass: "bg-[#f8f9ff] border-[#c7c4d8] text-[#565e74] opacity-50",
      }
    ]
  },
  {
    id: "services",
    name: "Campus Services",
    description: "Tutoring, cleaning, repairs",
    icon: "handyman",
    count: 522,
    status: "Active",
    colorClass: "bg-amber-50 border-amber-100 text-amber-600"
  }
];

export default function AdminCategoriesPage() {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    "academic": true,
    "electronics": true,
    "services": false
  });

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "academic": true,
    "electronics": true,
    "services": true
  });

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSwitch = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pb-12 max-w-[1200px] mx-auto">
      <style dangerouslySetInnerHTML={{__html: `
        .tree-line::before {
            content: '';
            position: absolute;
            left: -18px;
            top: -12px;
            bottom: 50%;
            width: 1px;
            background: #e2e8f0;
        }
        .tree-line::after {
            content: '';
            position: absolute;
            left: -18px;
            top: 50%;
            width: 12px;
            height: 1px;
            background: #e2e8f0;
        }
        .tree-line-last::before {
            height: 50%;
        }
      `}} />

      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-bold text-h3 text-[#0b1c30]">Categories &amp; Taxonomy</h1>
          <p className="text-small text-[#565e74] mt-1">Manage the hierarchy, metadata, and lifecycle of platform classifications.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#d3e4fe] text-[#3525cd] border border-[#3525cd]/20 px-4 py-2 rounded-lg font-semibold text-small flex items-center gap-2 hover:bg-[#c3c0ff] transition-colors">
            <span className="material-symbols-outlined text-[18px]">merge</span>
            Merge Categories
          </button>
          <button className="bg-[#3525cd] text-white px-4 py-2 rounded-lg font-semibold text-small flex items-center gap-2 shadow-sm hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Create Root Category
          </button>
        </div>
      </div>

      {/* Dashboard Stats Bar */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-4 gap-4 mb-8">
        <motion.div variants={fadeInUp} className="bg-[#ffffff] border border-[#c7c4d8] p-4 rounded-xl">
          <span className="font-bold text-[11px] tracking-widest text-[#777587] uppercase block mb-1">Total Categories</span>
          <div className="flex items-center justify-between">
            <span className="text-h3 font-bold text-[#0b1c30]">142</span>
            <span className="text-[#3525cd] bg-[#4f46e5]/10 px-2 py-0.5 rounded text-caption font-bold">+12%</span>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="bg-[#ffffff] border border-[#c7c4d8] p-4 rounded-xl">
          <span className="font-bold text-[11px] tracking-widest text-[#777587] uppercase block mb-1">Active Taxonomy</span>
          <div className="flex items-center justify-between">
            <span className="text-h3 font-bold text-[#0b1c30]">128</span>
            <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded text-caption font-bold">Stable</span>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="bg-[#ffffff] border border-[#c7c4d8] p-4 rounded-xl">
          <span className="font-bold text-[11px] tracking-widest text-[#777587] uppercase block mb-1">Empty Leaves</span>
          <div className="flex items-center justify-between">
            <span className="text-h3 font-bold text-[#0b1c30]">14</span>
            <span className="text-[#ba1a1a] bg-[#ffdad6]/50 px-2 py-0.5 rounded text-caption font-bold">Action Needed</span>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="bg-[#ffffff] border border-[#c7c4d8] p-4 rounded-xl">
          <span className="font-bold text-[11px] tracking-widest text-[#777587] uppercase block mb-1">Global Depth</span>
          <div className="flex items-center justify-between">
            <span className="text-h3 font-bold text-[#0b1c30]">4 Levels</span>
            <span className="text-[#565e74] bg-[#dce9ff] px-2 py-0.5 rounded text-caption font-bold">Optimal</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Taxonomy Tree */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-[#ffffff] border border-[#c7c4d8] rounded-xl overflow-hidden shadow-sm">
        {/* Tree Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#eff4ff] border-b border-[#c7c4d8] font-bold text-[11px] tracking-widest text-[#777587] uppercase">
          <div className="col-span-6">Category Name &amp; Hierarchy</div>
          <div className="col-span-2 text-center">Listing Count</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {TAXONOMY.map((root, i) => (
          <div key={root.id} className="border-b border-[#c7c4d8] last:border-0">
            <div className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#eff4ff]/50 transition-colors group ${!toggles[root.id] ? 'opacity-60' : ''}`}>
              <div className="col-span-6 flex items-center gap-3">
                {root.children ? (
                  <button className="w-6 h-6 flex items-center justify-center text-[#777587] hover:text-[#3525cd] transition-colors" onClick={() => toggleNode(root.id)}>
                    <span className="material-symbols-outlined text-title">{expandedNodes[root.id] ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}</span>
                  </button>
                ) : (
                  <div className="w-6 h-6"></div>
                )}
                
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${root.colorClass}`}>
                  <span className="material-symbols-outlined">{root.icon}</span>
                </div>
                <div>
                  <div className="font-semibold text-small text-[#0b1c30]">{root.name}</div>
                  <div className="text-[13px] text-[#777587]">{root.description}</div>
                </div>
              </div>
              <div className="col-span-2 text-center font-mono text-caption text-[#464555]">{root.count.toLocaleString()}</div>
              <div className="col-span-2 flex justify-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={toggles[root.id]} onChange={() => toggleSwitch(root.id)} />
                  <div className="w-11 h-6 bg-[#c7c4d8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#ffffff] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3525cd]"></div>
                </label>
              </div>
              <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-[#e5eeff] rounded-lg text-[#565e74]" title="Add Sub-category">
                  <span className="material-symbols-outlined">add_box</span>
                </button>
                <button className="p-2 hover:bg-[#e5eeff] rounded-lg text-[#565e74]" title="Edit Category">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
            </div>

            {/* Sub-items */}
            {root.children && expandedNodes[root.id] && (
              <div className="pl-16 bg-[#ffffff]/50">
                {root.children.map((child, idx) => (
                  <div key={child.id} className={`grid grid-cols-12 gap-4 px-6 py-3 items-center border-t border-[#c7c4d8]/30 hover:bg-[#eff4ff]/50 transition-colors relative tree-line ${idx === root.children!.length - 1 ? 'tree-line-last' : ''} group`}>
                    <div className="col-span-6 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${child.colorClass}`}>
                        <span className="material-symbols-outlined text-[18px]">{child.icon}</span>
                      </div>
                      <div className={`font-semibold text-small ${child.status === 'Draft' ? 'text-[#464555] italic' : 'text-[#0b1c30]'}`}>{child.name}</div>
                    </div>
                    <div className="col-span-2 text-center font-mono text-caption text-[#777587]">{child.count.toLocaleString()}</div>
                    <div className="col-span-2 flex justify-center">
                      {child.status === 'Active' ? (
                        <div className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">Active</div>
                      ) : (
                        <div className="bg-[#dce9ff] text-[#565e74] px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">Draft</div>
                      )}
                    </div>
                    <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {child.status === 'Draft' && (
                        <button className="p-2 hover:bg-[#e5eeff] rounded-lg text-[#565e74] text-[18px]"><span className="material-symbols-outlined">publish</span></button>
                      )}
                      <button className="p-2 hover:bg-[#e5eeff] rounded-lg text-[#565e74] text-[18px]"><span className="material-symbols-outlined">edit</span></button>
                      {child.status === 'Active' && (
                        <button className="p-2 hover:bg-[#e5eeff] rounded-lg text-[#565e74] text-[18px]"><span className="material-symbols-outlined">delete</span></button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Contextual Actions & Meta */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Advanced Editor Panel */}
        <motion.div variants={fadeInUp} className="md:col-span-2 bg-[#ffffff] border border-[#c7c4d8] rounded-xl p-6">
          <h3 className="font-bold text-[18px] text-[#0b1c30] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3525cd]">edit_attributes</span>
            Selected Category Editor
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-[#464555] mb-1">Display Name</label>
                <input className="w-full bg-[#eff4ff] border border-[#c7c4d8] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3525cd] focus:border-transparent transition-all outline-none" type="text" defaultValue="Academic" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#464555] mb-1">Slug</label>
                <input className="w-full bg-[#eff4ff] border border-[#c7c4d8] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3525cd] focus:border-transparent transition-all outline-none" type="text" defaultValue="academic-pillar" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-[#464555] mb-1">Icon Representation</label>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded border border-[#c7c4d8] flex items-center justify-center bg-[#eff4ff] text-[#464555]">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <button className="bg-[#d3e4fe] text-[#3525cd] font-semibold text-small px-4 rounded hover:bg-[#c3c0ff] transition-colors">Change Icon</button>
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#464555] mb-1">Taxonomy Type</label>
                <select className="w-full bg-[#eff4ff] border border-[#c7c4d8] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3525cd] outline-none">
                  <option>Standard Category</option>
                  <option>Virtual Collection</option>
                  <option>System Reserved</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3 pt-6 border-t border-[#c7c4d8]">
            <button className="text-[#565e74] font-semibold text-small px-4 py-2 hover:bg-[#e5eeff] rounded-lg transition-colors">Revert Changes</button>
            <button className="bg-[#3525cd] text-white font-semibold text-small px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">Apply Updates</button>
          </div>
        </motion.div>

        {/* Activity Log Preview */}
        <motion.div variants={fadeInUp} className="bg-[#ffffff] border border-[#c7c4d8] rounded-xl p-6 flex flex-col h-full">
          <h3 className="font-bold text-[18px] text-[#0b1c30] mb-4">Audit Log</h3>
          <div className="space-y-4 flex-1">
            <div className="flex gap-3 border-l-2 border-[#3525cd] pl-4 py-1">
              <div>
                <p className="text-[13px] font-bold text-[#0b1c30]">Category Merged</p>
                <p className="text-[11px] text-[#777587]">&apos;Physics&apos; merged into &apos;Academic&apos;</p>
                <p className="text-[10px] font-mono mt-1 text-[#565e74]">2 mins ago • J. Admin</p>
              </div>
            </div>
            <div className="flex gap-3 border-l-2 border-[#c7c4d8] pl-4 py-1">
              <div>
                <p className="text-[13px] font-bold text-[#0b1c30]">Icon Updated</p>
                <p className="text-[11px] text-[#777587]">&apos;Electronics&apos; glyph changed</p>
                <p className="text-[10px] font-mono mt-1 text-[#565e74]">1 hour ago • K. Moder</p>
              </div>
            </div>
            <div className="flex gap-3 border-l-2 border-[#ba1a1a] pl-4 py-1">
              <div>
                <p className="text-[13px] font-bold text-[#0b1c30]">Category Deleted</p>
                <p className="text-[11px] text-[#777587]">&apos;Miscellaneous&apos; removed</p>
                <p className="text-[10px] font-mono mt-1 text-[#565e74]">4 hours ago • System</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 text-[#3525cd] font-semibold text-small text-center py-2 border border-[#3525cd]/20 rounded-lg hover:bg-[#3525cd]/5 transition-colors">
            View Full History
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
