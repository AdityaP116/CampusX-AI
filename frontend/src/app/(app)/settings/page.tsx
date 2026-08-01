"use client";

// =========================================================
// Account Settings Page
// Pixel-perfect conversion of design/3/settings_1
// =========================================================

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function SettingsPage() {
  const [tfaEnabled, setTfaEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [receiptsEnabled, setReceiptsEnabled] = useState(true);

  return (
    <div className="max-w-5xl mx-auto pb-xxl">
      <header className="mb-xl">
        <h1 className="font-bold text-h1 text-on-surface mb-2">Account Settings</h1>
        <p className="text-on-surface-variant text-body">Manage your profile, security preferences, and payment information.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Information Section */}
        <section className="lg:col-span-8 flex flex-col gap-lg">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant/30 shadow-sm">
            <div className="flex items-center gap-md mb-xl">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">person</span>
              </div>
              <h2 className="font-bold text-h3">Profile Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div className="flex flex-col gap-xs">
                <label className="font-medium text-small text-on-surface-variant ml-1">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Alex Rivera"
                  className="bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all text-on-surface" 
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-medium text-small text-on-surface-variant ml-1">Student ID</label>
                <input 
                  type="text" 
                  defaultValue="U24-998102"
                  disabled
                  className="bg-surface-dim/30 border-none rounded-xl py-3 px-4 text-on-surface-variant cursor-not-allowed" 
                />
              </div>
              <div className="flex flex-col gap-xs md:col-span-2">
                <label className="font-medium text-small text-on-surface-variant ml-1">University Email</label>
                <input 
                  type="email" 
                  defaultValue="alex.rivera@campusx.edu"
                  className="bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all text-on-surface" 
                />
              </div>
              <div className="flex flex-col gap-xs md:col-span-2">
                <label className="font-medium text-small text-on-surface-variant ml-1">Bio</label>
                <textarea 
                  rows={3}
                  defaultValue="Senior Computer Science student. Mostly selling tech gear and textbooks."
                  className="bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all text-on-surface resize-none" 
                />
              </div>
            </div>
            
            <div className="mt-xl flex justify-end">
              <button className="bg-primary text-on-primary px-xl py-3 rounded-full font-medium text-small hover:bg-primary-container transition-all active:scale-95">
                Save Changes
              </button>
            </div>
          </motion.div>

          {/* Payment Methods Section */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant/30 shadow-sm">
            <div className="flex items-center gap-md mb-xl">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <h2 className="font-bold text-h3">Payment Methods</h2>
            </div>
            
            <div className="flex flex-col gap-md">
              <div className="flex items-center justify-between p-md border border-outline-variant/50 rounded-xl hover:bg-surface-container-low/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-8 bg-surface-container-high rounded flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">credit_card</span>
                  </div>
                  <div>
                    <p className="font-semibold text-body">Visa ending in 4242</p>
                    <p className="text-caption text-on-surface-variant">Expires 12/26 • Default</p>
                  </div>
                </div>
                <button className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">more_vert</button>
              </div>

              <div className="flex items-center justify-between p-md border border-outline-variant/50 rounded-xl hover:bg-surface-container-low/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-8 bg-surface-container-high rounded flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">account_balance</span>
                  </div>
                  <div>
                    <p className="font-semibold text-body">University Credit Union</p>
                    <p className="text-caption text-on-surface-variant">Bank Account • **** 8812</p>
                  </div>
                </div>
                <button className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">more_vert</button>
              </div>
              
              <button className="mt-sm flex items-center justify-center gap-sm py-4 border-2 border-dashed border-outline-variant/40 rounded-xl text-primary font-medium text-small hover:border-primary/40 hover:bg-primary/5 transition-all">
                <span className="material-symbols-outlined">add_circle</span>
                Add New Payment Method
              </button>
            </div>
          </motion.div>
        </section>

        {/* Secondary Column (Security & Notifications) */}
        <aside className="lg:col-span-4 flex flex-col gap-lg">
          {/* Account Security Section */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant/30 shadow-sm">
            <div className="flex items-center gap-md mb-xl">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">shield</span>
              </div>
              <h2 className="font-bold text-h3">Security</h2>
            </div>
            
            <div className="flex flex-col gap-xl">
              <div className="flex flex-col gap-md">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-body">Two-Factor Auth</p>
                  <button
                    role="switch"
                    aria-checked={tfaEnabled}
                    onClick={() => setTfaEnabled(!tfaEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                      tfaEnabled ? 'bg-primary' : 'bg-surface-container-highest'
                    }`}
                    aria-label="Two-factor authentication"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${
                        tfaEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-caption text-on-surface-variant">Recommended for additional account protection.</p>
              </div>
              
              <div className="border-t border-outline-variant/10 pt-xl">
                <button className="w-full py-3 px-xl border border-primary text-primary rounded-full font-medium text-small hover:bg-primary/5 transition-all">
                  Change Password
                </button>
              </div>
              
              <div className="pt-sm">
                <button className="w-full text-left font-medium text-small text-on-surface-variant hover:text-error transition-colors flex items-center gap-sm">
                  <span className="material-symbols-outlined text-title">logout</span>
                  Log Out of All Devices
                </button>
              </div>
            </div>
          </motion.div>

          {/* Notifications Section */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant/30 shadow-sm">
            <div className="flex items-center gap-md mb-xl">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">notifications_active</span>
              </div>
              <h2 className="font-bold text-h3">Notifications</h2>
            </div>
            
            <div className="flex flex-col gap-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-body">Push Notifications</p>
                  <p className="text-caption text-on-surface-variant">Mobile & Browser alerts</p>
                </div>
                <button
                  role="switch"
                  aria-checked={pushEnabled}
                  onClick={() => setPushEnabled(!pushEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    pushEnabled ? 'bg-primary' : 'bg-surface-container-highest'
                  }`}
                  aria-label="Push notifications"
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${pushEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-body">Email Marketing</p>
                  <p className="text-caption text-on-surface-variant">Weekly deals & highlights</p>
                </div>
                <button
                  role="switch"
                  aria-checked={emailEnabled}
                  onClick={() => setEmailEnabled(!emailEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    emailEnabled ? 'bg-primary' : 'bg-surface-container-highest'
                  }`}
                  aria-label="Email marketing"
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${emailEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-body">Purchase Receipts</p>
                  <p className="text-caption text-on-surface-variant">Order confirmation emails</p>
                </div>
                <button
                  role="switch"
                  aria-checked={receiptsEnabled}
                  onClick={() => setReceiptsEnabled(!receiptsEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    receiptsEnabled ? 'bg-primary' : 'bg-surface-container-highest'
                  }`}
                  aria-label="Purchase receipts"
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${receiptsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="bg-error-container/20 p-xl rounded-xl border border-error/10">
            <p className="font-semibold text-body text-error mb-2">Danger Zone</p>
            <p className="text-caption text-on-surface-variant mb-xl">Deleting your account is permanent and cannot be undone.</p>
            <button className="w-full py-3 text-error border border-error/30 rounded-full font-medium text-small hover:bg-error hover:text-on-error transition-all">
              Deactivate Account
            </button>
          </motion.div>
        </aside>
      </div>
    </div>
  );
}
