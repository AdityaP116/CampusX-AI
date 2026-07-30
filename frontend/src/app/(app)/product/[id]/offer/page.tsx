"use client";

// =========================================================
// Make an Offer Page (Modal View)
// Pixel-perfect conversion of design/1/product_offer
// =========================================================

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ProductOfferPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [delivery, setDelivery] = useState<"meetup" | "shipping">("meetup");
  const [offerAmount, setOfferAmount] = useState("1100");

  const handleClose = () => {
    router.back();
  };

  const handleSubmit = () => {
    // Navigate to a success state or back to product with a toast
    router.push(`/product/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-inverse-surface/10 backdrop-blur-[2px]">
      {/* Floating Atmosphere Effect */}
      <div className="fixed top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Offer Card Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-[520px] bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col"
      >
        {/* Header Section */}
        <div className="px-xl pt-xl pb-md">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-bold text-h3 text-on-background mb-xs">Make an Offer</h2>
              <p className="font-medium text-small text-on-surface-variant">Send a formal offer to the seller to negotiate the price.</p>
            </div>
            <button onClick={handleClose} className="p-sm hover:bg-surface-container rounded-full transition-colors active:scale-95 text-outline">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Product Context Mini-Card */}
        <div className="px-xl mb-lg">
          <div className="flex items-center gap-md p-md bg-surface-container-low rounded-xl border border-outline-variant/20">
            <div 
              className="w-16 h-16 rounded-lg bg-cover bg-center shrink-0" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBasGfxm90nZTUtzLPSZU1aMRY0MTNfDFqJLGxGatIllVFlKqytC_mfyVDW4EreWrv7nSm3f--7yPUB-hPHwQA-7IQKZMh4gYnPcoCjY_8-Ysb18UgA3FW0koI8gS2ZJMzIPFnfPbCx-B18kUlCp0wKcUIGbksFQlfNys7UCcGnv_nxXN3TKRTxrQpljF_kCr3uZchUcf8RXHhO303jfqzu_xmgwALiSU_O2pxM1ru5EFE2e7Z9tzI4araRn3sohWvjYWIMuK0C9mwC')" }}
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-body truncate text-on-surface">Sony WH-1000XM5</h4>
              <div className="flex items-center gap-xs">
                <span className="font-bold text-title text-primary">$240.00</span>
              </div>
            </div>
            <div className="flex items-center gap-xs bg-surface-bright px-sm py-xs rounded-full shadow-sm border border-outline-variant/10">
              <span className="material-symbols-outlined text-body text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>format_image_left</span>
              <span className="font-bold text-caption text-primary">Verified</span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-xl flex-1 space-y-lg overflow-y-auto max-h-[614px] pb-xl">
          {/* Offer Amount Field */}
          <div>
            <label className="block font-medium text-small text-on-surface mb-sm">Offer Amount</label>
            <div className="relative group transition-all rounded-xl border border-outline-variant focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary">
              <span className="absolute left-md top-1/2 -translate-y-1/2 font-bold text-title text-on-surface-variant">$</span>
              <input 
                type="number" 
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                className="w-full pl-xl pr-md py-md bg-transparent border-none focus:ring-0 font-bold text-title text-on-surface placeholder:text-outline-variant outline-none" 
                placeholder="200"
              />
            </div>
            <p className="mt-xs font-medium text-caption text-on-surface-variant">Recommended: $200 - $220</p>
          </div>

          {/* Delivery Preferences */}
          <div>
            <label className="block font-medium text-small text-on-surface mb-sm">Delivery Preference</label>
            <div className="grid grid-cols-2 gap-md">
              <label 
                className={`relative flex items-center justify-center gap-sm p-md rounded-xl cursor-pointer transition-all ${delivery === 'meetup' ? 'border-2 border-primary bg-primary/5' : 'border border-outline-variant bg-surface-container-low hover:bg-surface-container-high'}`}
                onClick={() => setDelivery('meetup')}
              >
                <input type="radio" className="hidden" name="delivery" checked={delivery === 'meetup'} readOnly />
                <span className={`material-symbols-outlined ${delivery === 'meetup' ? 'text-primary' : 'text-on-surface-variant'}`}>groups</span>
                <span className={`font-medium text-small ${delivery === 'meetup' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>Meetup</span>
                {delivery === 'meetup' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-xs">
                    <span className="material-symbols-outlined text-small">check</span>
                  </motion.div>
                )}
              </label>

              <label 
                className={`relative flex items-center justify-center gap-sm p-md rounded-xl cursor-pointer transition-all ${delivery === 'shipping' ? 'border-2 border-primary bg-primary/5' : 'border border-outline-variant bg-surface-container-low hover:bg-surface-container-high'}`}
                onClick={() => setDelivery('shipping')}
              >
                <input type="radio" className="hidden" name="delivery" checked={delivery === 'shipping'} readOnly />
                <span className={`material-symbols-outlined ${delivery === 'shipping' ? 'text-primary' : 'text-on-surface-variant'}`}>local_shipping</span>
                <span className={`font-medium text-small ${delivery === 'shipping' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>Shipping</span>
                {delivery === 'shipping' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-xs">
                    <span className="material-symbols-outlined text-small">check</span>
                  </motion.div>
                )}
              </label>
            </div>
          </div>

          {/* Message to Seller */}
          <div>
            <label className="block font-medium text-small text-on-surface mb-sm">Message (Optional)</label>
            <textarea 
              className="w-full p-md rounded-xl border border-outline-variant bg-transparent focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none text-body text-on-surface placeholder-outline-variant" 
              placeholder="e.g. Hi! I'm on campus today, can we meet near the library?" 
              rows={3}
            />
          </div>

          {/* Buyer Protection Highlight */}
          <div className="p-md bg-secondary-fixed rounded-xl flex gap-md items-start">
            <div className="w-10 h-10 bg-on-secondary-fixed-variant rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <div>
              <h5 className="font-bold text-small text-on-secondary-fixed-variant">Buyer Protection Included</h5>
              <p className="font-medium text-caption text-on-secondary-fixed-variant leading-tight mt-1 opacity-80">
                Your payment is held securely by CampusX until you confirm the item is as described. Campus meetups are tracked for extra safety.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-xl bg-surface-container-low flex items-center gap-md border-t border-outline-variant/30">
          <button onClick={handleClose} className="flex-1 px-lg py-md rounded-xl border border-outline text-on-surface font-medium hover:bg-surface-container-high transition-all active:scale-95">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-[1.5] px-lg py-md rounded-xl bg-primary text-on-primary font-bold shadow-lg shadow-primary/20 hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95 flex items-center justify-center gap-sm">
            <span>Send Offer</span>
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
