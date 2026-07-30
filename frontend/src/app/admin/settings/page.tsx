"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function AdminSettingsPage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "new-registrations": true,
    "auto-verify": false,
    "maintenance-mode": false,
    "email-alerts": true,
    "webhook-sync": true,
  });

  const handleToggle = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pb-12 max-w-[1000px] mx-auto">
      <style dangerouslySetInnerHTML={{__html: `
        .toggle-checkbox:checked {
            right: 0;
            border-color: #3525cd;
        }
        .toggle-checkbox:checked + .toggle-label {
            background-color: #3525cd;
        }
      `}} />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-bold text-h3 text-[#0b1c30] mb-2">Platform Settings</h1>
        <p className="text-small text-[#565e74]">Manage global configuration, security protocols, and system integrations.</p>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Settings Area */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          {/* General Platform Settings */}
          <motion.div variants={fadeInUp} className="bg-[#ffffff] p-6 rounded-xl border border-[#c7c4d8] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#3525cd] flex items-center justify-center">
                <span className="material-symbols-outlined">settings_suggest</span>
              </div>
              <h2 className="font-bold text-[18px] text-[#0b1c30]">General Configuration</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="font-semibold text-[13px] text-[#464555] ml-1">Platform Name</label>
                <input className="bg-[#eff4ff] border border-[#c7c4d8] rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-[#3525cd] transition-all text-[#0b1c30] text-small outline-none" type="text" defaultValue="CampusX Marketplace" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[13px] text-[#464555] ml-1">Support Email</label>
                <input className="bg-[#eff4ff] border border-[#c7c4d8] rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-[#3525cd] transition-all text-[#0b1c30] text-small outline-none" type="email" defaultValue="support@campusx.edu" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[13px] text-[#464555] ml-1">Base Currency</label>
                <select className="bg-[#eff4ff] border border-[#c7c4d8] rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-[#3525cd] transition-all text-[#0b1c30] text-small outline-none">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="font-semibold text-[13px] text-[#464555] ml-1">Default Campus Rules</label>
                <textarea className="bg-[#eff4ff] border border-[#c7c4d8] rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-[#3525cd] transition-all text-[#0b1c30] text-small outline-none resize-none" rows={3} defaultValue="All items must be physically present on campus for exchange. No illegal substances or academic dishonesty materials allowed."></textarea>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="bg-[#3525cd] text-white px-6 py-2.5 rounded-lg font-semibold text-small hover:bg-[#4f46e5] transition-all active:scale-95 shadow-sm">Save Configuration</button>
            </div>
          </motion.div>

          {/* Access & Moderation Policies */}
          <motion.div variants={fadeInUp} className="bg-[#ffffff] p-6 rounded-xl border border-[#c7c4d8] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#3525cd] flex items-center justify-center">
                <span className="material-symbols-outlined">policy</span>
              </div>
              <h2 className="font-bold text-[18px] text-[#0b1c30]">Access &amp; Moderation</h2>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-small text-[#0b1c30]">Allow New Registrations</p>
                  <p className="text-caption text-[#777587]">Users can sign up using a valid .edu email address.</p>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-[#c7c4d8] appearance-none cursor-pointer transition-all duration-300 right-4 outline-none" id="new-registrations" checked={toggles["new-registrations"]} onChange={() => handleToggle("new-registrations")} />
                  <label className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${toggles["new-registrations"] ? "bg-[#3525cd]" : "bg-[#dce9ff]"}`} htmlFor="new-registrations"></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-small text-[#0b1c30]">Auto-Verify Standard Users</p>
                  <p className="text-caption text-[#777587]">Bypass manual verification queue for verified .edu domains.</p>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-[#c7c4d8] appearance-none cursor-pointer transition-all duration-300 right-4 outline-none" id="auto-verify" checked={toggles["auto-verify"]} onChange={() => handleToggle("auto-verify")} />
                  <label className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${toggles["auto-verify"] ? "bg-[#3525cd]" : "bg-[#dce9ff]"}`} htmlFor="auto-verify"></label>
                </div>
              </div>

              <div className="border-t border-[#c7c4d8] pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-small text-[#ba1a1a]">Maintenance Mode</p>
                    <p className="text-caption text-[#777587]">Disables user access and shows maintenance screen.</p>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-[#c7c4d8] appearance-none cursor-pointer transition-all duration-300 right-4 outline-none" id="maintenance-mode" checked={toggles["maintenance-mode"]} onChange={() => handleToggle("maintenance-mode")} />
                    <label className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${toggles["maintenance-mode"] ? "bg-[#ba1a1a]" : "bg-[#dce9ff]"}`} htmlFor="maintenance-mode"></label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Sidebar Settings Area */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Security & API */}
          <motion.div variants={fadeInUp} className="bg-[#ffffff] p-6 rounded-xl border border-[#c7c4d8] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#3525cd] flex items-center justify-center">
                <span className="material-symbols-outlined">api</span>
              </div>
              <h2 className="font-bold text-[18px] text-[#0b1c30]">API &amp; Webhooks</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-small text-[#0b1c30]">Enable Webhook Sync</p>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-[#c7c4d8] appearance-none cursor-pointer transition-all duration-300 right-4 outline-none" id="webhook-sync" checked={toggles["webhook-sync"]} onChange={() => handleToggle("webhook-sync")} />
                  <label className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${toggles["webhook-sync"] ? "bg-[#3525cd]" : "bg-[#dce9ff]"}`} htmlFor="webhook-sync"></label>
                </div>
              </div>

              <div>
                <label className="font-semibold text-caption text-[#777587] uppercase tracking-widest block mb-1">Webhook URL Endpoint</label>
                <div className="flex items-center gap-2">
                  <input className="w-full bg-[#eff4ff] border border-[#c7c4d8] rounded-lg py-2 px-3 text-[13px] text-[#565e74] outline-none" type="text" readOnly value="https://api.campusx.edu/hooks/events" />
                  <button className="p-2 bg-[#dce9ff] text-[#3525cd] rounded-lg hover:bg-[#c3c0ff] transition-colors"><span className="material-symbols-outlined text-body">content_copy</span></button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-caption text-[#777587] uppercase tracking-widest block mb-1">Stripe Secret Key</label>
                <div className="flex items-center gap-2">
                  <input className="w-full bg-[#eff4ff] border border-[#c7c4d8] rounded-lg py-2 px-3 text-[13px] text-[#565e74] outline-none" type="password" readOnly value="sk_test_51NxXXXXXXXXXXXXXXXXXXXXX" />
                  <button className="p-2 bg-[#dce9ff] text-[#3525cd] rounded-lg hover:bg-[#c3c0ff] transition-colors"><span className="material-symbols-outlined text-body">visibility</span></button>
                </div>
              </div>

              <button className="mt-2 w-full py-2 border border-[#c7c4d8] text-[#0b1c30] rounded-lg font-semibold text-[13px] hover:bg-[#eff4ff] transition-colors">Rotate API Keys</button>
            </div>
          </motion.div>

          {/* Admin Notifications */}
          <motion.div variants={fadeInUp} className="bg-[#ffffff] p-6 rounded-xl border border-[#c7c4d8] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#3525cd] flex items-center justify-center">
                <span className="material-symbols-outlined">notifications_active</span>
              </div>
              <h2 className="font-bold text-[18px] text-[#0b1c30]">Alerts</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-small text-[#0b1c30]">System Error Emails</p>
                  <p className="text-caption text-[#777587]">Critical failures</p>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-[#c7c4d8] appearance-none cursor-pointer transition-all duration-300 right-4 outline-none" id="email-alerts" checked={toggles["email-alerts"]} onChange={() => handleToggle("email-alerts")} />
                  <label className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${toggles["email-alerts"] ? "bg-[#3525cd]" : "bg-[#dce9ff]"}`} htmlFor="email-alerts"></label>
                </div>
              </div>
              <div className="border-t border-[#c7c4d8] pt-4 mt-2">
                <button className="w-full py-2 bg-[#dae2fd] text-[#3525cd] font-semibold text-[13px] rounded-lg hover:bg-[#dce9ff] transition-colors">Configure Slack Integration</button>
              </div>
            </div>
          </motion.div>
        </aside>
      </motion.div>
    </div>
  );
}
