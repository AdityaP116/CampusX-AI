"use client";

// =========================================================
// Product Details Page
// Pixel-perfect conversion of design/1/product_details
// =========================================================

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTES } from "@/constants/routes";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-lg text-on-surface-variant">
        <Link href={ROUTES.MARKETPLACE} className="font-medium text-small hover:text-primary transition-colors">
          Marketplace
        </Link>
        <span className="material-symbols-outlined text-body">chevron_right</span>
        <Link href="/categories" className="font-medium text-small hover:text-primary transition-colors">
          Electronics
        </Link>
        <span className="material-symbols-outlined text-body">chevron_right</span>
        <span className="font-medium text-small text-on-surface font-semibold">
          Sony WH-1000XM5
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl md:gap-12">
        {/* Left Column: Image Gallery & Details */}
        <div className="lg:col-span-7 space-y-lg">
          {/* Main Image */}
          <div className="relative group aspect-[4/3] w-full overflow-hidden rounded-xl bg-white shadow-sm border border-outline-variant/10">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImageIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={PRODUCT.images[activeImageIdx]}
                alt={`Product image ${activeImageIdx + 1}`}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="font-bold text-caption text-on-surface">Verified Product</span>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-md overflow-x-auto no-scrollbar pb-2">
            {PRODUCT.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl border-2 overflow-hidden transition-all ${activeImageIdx === idx ? 'border-primary' : 'border-transparent hover:border-outline-variant'}`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Description & Specs */}
          <div className="pt-lg border-t border-outline-variant/30 space-y-lg">
            <section>
              <h2 className="font-bold text-h2 mb-md text-on-surface">About this item</h2>
              <p className="text-on-surface-variant leading-relaxed mb-lg">
                {PRODUCT.description}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium text-small dark:bg-green-900/20 dark:text-green-400">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Condition: {PRODUCT.condition}
              </div>
            </section>

            <section>
              <h3 className="font-bold text-h3 mb-md text-on-surface">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {Object.entries(PRODUCT.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-outline-variant/10">
                    <span className="text-on-surface-variant">{key}</span>
                    <span className="font-semibold text-on-surface">{value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Right Column: Actions & Seller Info */}
        <div className="lg:col-span-5 space-y-lg">
          {/* Main Action Card */}
          <div className="bg-surface-container-lowest p-lg md:p-8 rounded-2xl shadow-sm border border-outline-variant/20 sticky top-24">
            <div className="flex justify-between items-start mb-lg">
              <div>
                <h1 className="font-bold text-h1 mb-2 text-on-surface">{PRODUCT.title}</h1>
                <p className="font-bold text-display text-primary">{PRODUCT.price}</p>
              </div>
              <button className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>

            <div className="space-y-4 mb-lg">
              <button className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-title flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-[0.98]">
                <span className="material-symbols-outlined">send</span>
                Message Seller
              </button>
              <Link href={`/product/${id}/offer`} className="w-full bg-surface-container-low text-primary py-4 rounded-xl font-bold text-title flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all active:scale-[0.98] border border-primary/20">
                Make Offer
              </Link>
            </div>

            <div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl mb-lg">
              <span className="material-symbols-outlined text-tertiary">local_shipping</span>
              <div>
                <p className="font-medium text-small text-on-surface">Available for Campus Pickup</p>
                <p className="font-medium text-caption text-on-surface-variant">Meyer Library or Main Quad</p>
              </div>
            </div>

            {/* Seller Profile Card */}
            <div className="pt-6 border-t border-outline-variant/30">
              <p className="font-bold text-caption text-outline mb-4">SELLER INFORMATION</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden relative bg-surface-variant">
                  <img src={PRODUCT.seller.avatar} alt={PRODUCT.seller.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-title text-on-surface">{PRODUCT.seller.name}</h4>
                    <span className="flex items-center gap-0.5 px-2 py-0.5 bg-primary/10 text-primary rounded-full font-bold text-[10px] uppercase tracking-wider">
                      <span className="material-symbols-outlined text-caption" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      Verified Student
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-tertiary-container text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-bold text-small">{PRODUCT.seller.rating}</span>
                    <span className="text-on-surface-variant text-small ml-1">({PRODUCT.seller.sales} sales)</span>
                  </div>
                </div>
                <button className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
              <div className="mt-4 flex gap-4 text-on-surface-variant font-medium text-caption">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-body">schedule</span>
                  Typically responds in 1 hour
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-body">location_on</span>
                  Stanford University
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Listings */}
      <section className="mt-xxl">
        <div className="flex justify-between items-end mb-lg">
          <div>
            <h2 className="font-bold text-h2 mb-2 text-on-surface">Similar Listings</h2>
            <p className="text-on-surface-variant font-medium">Recommended for you based on this product</p>
          </div>
          <Link href={ROUTES.MARKETPLACE} className="text-primary font-bold flex items-center gap-1 hover:underline">
            View All
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SIMILAR_PRODUCTS.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-white shadow-sm border border-outline-variant/10">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-on-surface-variant hover:text-error transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-title">favorite</span>
                </button>
              </div>
              <h3 className="font-bold text-title text-on-surface mb-1 truncate">{item.title}</h3>
              <p className="text-primary font-bold mb-1">{item.price}</p>
              <div className="flex items-center gap-2">
                <span className="font-medium text-caption text-on-surface-variant">{item.condition}</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant" />
                <span className="font-medium text-caption text-on-surface-variant">{item.distance}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Data
const PRODUCT = {
  title: "Sony WH-1000XM5",
  price: "$240",
  condition: "Like New",
  description: "Selling my Sony WH-1000XM5 headphones. Used for one semester primarily in the library. Incredible noise cancellation and sound quality. Only selling because I'm switching to earbuds for the gym. Comes with original case and charging cable.",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBasGfxm90nZTUtzLPSZU1aMRY0MTNfDFqJLGxGatIllVFlKqytC_mfyVDW4EreWrv7nSm3f--7yPUB-hPHwQA-7IQKZMh4gYnPcoCjY_8-Ysb18UgA3FW0koI8gS2ZJMzIPFnfPbCx-B18kUlCp0wKcUIGbksFQlfNys7UCcGnv_nxXN3TKRTxrQpljF_kCr3uZchUcf8RXHhO303jfqzu_xmgwALiSU_O2pxM1ru5EFE2e7Z9tzI4araRn3sohWvjYWIMuK0C9mwC",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAaScdkUTSZ4XrgjUMi9_7NnwoWKMkKVVX41muzv8dOqKXyZ_GozN66A-VXeVwaVSuygUv0fEutyfXVEAQfQzhstvbnnJfQsMokveCdJRbHQWNucTLa4qFB6XDrSMoEim-6O7BOD2biEWJGaEz31MvWrJq380eLVjzVjGANUAPZAmeMj_s1jjIqw-BrlTzG4L4BfEvyUzsLQSbTWkOKPgqsEoYjMpB2xtKPNcQG7YjfUPtGm5vwoEXk9_rJqlHvJLmw4EctoWYWQqFC",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCrZjJ70p6k34oXdLbEI0hap1tj1LS40vThy0SakaMjxjm3Xqj8qJO_6ogEcnEOw1jyYS6tyk4k8OFsriiitkz2ihEbBJxHMy3JowyKMxyAtxOKvJXkJT8wu5JaByr-rbY1lbkqek7NLKmUsoiaHyBy8eqKeKhBOaAo3BsDGCZLAxFqsl8YFO-WGJBoHUHt78X9-Jnk4VFJvn_-zgRo31EtYeJSbLvM8MJPjzaw9Vv7LIvTOcwQ4KFLleBI1JEi2tyn5suoL-2fLsro",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAcu83TCLYhjx02f3lCHqrvsFkxh76QUUH0Ai3BnJMMQ1VZhWDQXlX3UN2LDXccPwX8dE-m7z7k05_Fe6ThSunprJHKpO2X9c2kKAMG9op9pgNyCgLfcBuB9ZrSwWsWo1FMfIRUAi6YkHGdN3AE0-5zPsVbgmzCV-78LBjz0BgjOq4S8vVgaHCC6L9AeiSmxCBSfP7yp9KBR5Rj5IgadHqr3JmL-rdVfPSHKox8Ir9Xm6m6awFnFe5g7jlZf0lw_PRnx-l66BeXdO7w",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAEsjnCELvMVwsd4tLCMZnAzKlwG9aIVNx09mjL5q3i3_rDHG46GbY-8mrh4lzKeaQ2vQE141w24tqvUkOlYft-bRgS4Ob3oXmzOqW9-3hKaiRBPvM_8dzoOIAus706tirZ6OQy_SDXSNZOReuczFTIMRyll8XDpqhbXe2v9APlV_wFnZ1pPXEHKbPjoKhz3NGjOQ1xcjsIz-t_k-dhodlqfdAKn1m8pqAJmqsM_LbY3iEBhlwLJov9GUSSGEGse6wC0RKkDRfxn6ME"
  ],
  specs: {
    "Battery Life": "30 Hours",
    "Connectivity": "Bluetooth 5.2",
    "Charging": "USB-C Fast Charge",
    "Weight": "250g",
    "Color": "Midnight Black",
    "Warranty": "6 Months Left"
  },
  seller: {
    name: "Alex Chen",
    rating: "4.9",
    sales: "42",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9W2MEDDOKvKIqjK98tL59R--MIHJbMgNH64QhYKXeObUN_4KML6CC3ww5i8CRofac8Pvj8Doh1lUypdlqbzb5Cwas-i1MOO9iXhxewG-9KCgEl-2vsn0EVCMWJJUms202Wlmli8fgTZwYP5guJWvZwXBhK8ZYXk7221FNWz7soPCakQ9v35rhLtl3RL4zqLHe7FcdVGOHQ3v3Djha-j6tmUJrBYi9voHRNGJ9JEqz0qkvk0uCSZDwq6ZLKvdFbQhMbsB_X4r95P-j"
  }
};

const SIMILAR_PRODUCTS = [
  {
    title: "Bose QuietComfort 45",
    price: "$180",
    condition: "Like New",
    distance: "2.4 miles",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqJowlbWexm0SZgFS4m5GV1R614O03DgHfvi-wolkQjEPdPR6B_RBM9jN07dR1igU0wpek9sqO8s5Emnox8S7SZkyYgE4tbSu7fVv2OdqYpfUHeojLrao93ego3X_H_wVEkAF0gTkx_1WAjXHE9wQbQkeOb-szdlIMwlnd95VxPeQ6LPFPSb6lgJKHigBAaamQyr-Z3FAEEydewo8cg6IatZ3DGARN4zqRCCMzvE4aCpU-iV_jxYIWx_brtPiau4oKV2DnA5d1bZ-I"
  },
  {
    title: "Apple AirPods Max",
    price: "$390",
    condition: "Mint Condition",
    distance: "On Campus",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJnhvsJncbWAWJTxnYbc2tkk6kC6kHQfv4_o7sccuEgLAWT5Vr_biA7q2wGjsUMkgV2T4sMxzWY3Lu7PG-8WehweWKWjoEjPrKvB2zHM3b9W7l-bCy2N1tmJho1ov8DEW44tG7JSTqZLzFOLz-fTteOMfge7lTf5dzxTxuRxKJRgtGwPa98RkSor6z7v6xszEY_rOW--tohckdGCo-KLvD5LrOObZBNonEEDJ9bsM06enLPZqwJmFQzYXTeC92M-_SOvPo7p4ZnFeC"
  },
  {
    title: "Sony WH-1000XM4",
    price: "$150",
    condition: "Used - Good",
    distance: "0.5 miles",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXBeYg9llTo3o11U6ezcTXVYF0Qc5yVPYNsex34vkL83M7CeKhM3fUnXk66gHKvQFcWMhy4aKM1iPbhjZwfOWBa5tcclc2jfB5vRBJwYfkDNLWm8rvHzqCdFWtRKF2lK9mf1xSmnKmn0mpUpuKhfGuOgV-Poq4Tsd_wwOOg1Jd8DI8Aegb8YiwkFkXxvOs7GY_8mtgL3cMxjnO649JVBqN1yS55AACTw-TwtkrNBzso1AEYfSrGv22Ki4NKiDTmyyB_oy8QThYEy-W"
  },
  {
    title: "Beats Solo Pro",
    price: "$120",
    condition: "Like New",
    distance: "1.2 miles",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtK1qAPsn0ciSHuS5f-G_ozyeqow8EpvmNmUuXUYiBxb73rZeAM_YIpjbjkSACoSstrXpf-KG9JfljPdyyf6h8OjilmIa2c1RoZi8_w7KMvn8wbNvM4efj8dgI39G97nlfNxUA3VAImTT1GIe1iEwjd1Rx7Bj2TkN-PlrG14VVGDkJPgFPN0O5nixvJL6ZIUa00h_OkydRndtfaUb1a34183Zilczg4PD6X2OvlKRAM9U3lKw4ukfOppXOrN9KrmGMM36TsVxrMT_7"
  }
];
