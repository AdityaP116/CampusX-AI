"use client";

// =========================================================
// Marketplace Home
// Pixel-perfect conversion of design/1/marketplace_home
// =========================================================

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function MarketplacePage() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative mb-xxl rounded-[32px] overflow-hidden bg-primary-container min-h-[400px] flex items-center px-6 md:px-12">
        {/* Background Mesh Effect */}
        <div className="absolute inset-0 opacity-40">
          {/* Note: Original design had empty div, we can add a subtle gradient if needed, or leave it */}
        </div>

        <div className="relative z-10 max-w-2xl text-on-primary-container w-full py-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-bold text-h1-mobile md:text-display mb-6 leading-tight"
          >
            Marketplace built for <span className="text-white underline decoration-primary-fixed decoration-4 underline-offset-8">campus life</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-medium text-body text-primary-fixed/80 mb-xl max-w-lg"
          >
            The most trusted way to buy, sell, and rent items within your verified university community.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-primary-container">search</span>
            </div>
            <input 
              type="text" 
              className={`w-full pl-16 pr-8 py-5 bg-white text-on-surface rounded-full shadow-2xl border-none transition-all text-body font-medium outline-none ${searchFocused ? 'ring-4 ring-primary-fixed/50' : ''}`}
              placeholder="Search textbooks, housing, gear..." 
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white px-6 md:px-8 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform shadow-md">
              Search
            </button>
          </motion.div>
        </div>

        {/* Verification Card overlay (Desktop only) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden xl:block absolute right-12 top-1/2 -translate-y-1/2 w-full max-w-md h-[300px] bg-white/10 backdrop-blur-md rounded-[32px] p-6 shadow-2xl border border-white/20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">verified</span>
            </div>
            <div>
              <p className="font-bold text-small text-white">Safe &amp; Verified</p>
              <p className="text-caption text-white/70">Only .edu emails allowed</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-white/20 rounded-full animate-pulse" />
            <div className="h-4 w-3/4 bg-white/20 rounded-full animate-pulse" />
            <div className="h-4 w-5/6 bg-white/20 rounded-full animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Shop by Category (Visual Cards) */}
      <section className="mb-xxl">
        <div className="flex justify-between items-end mb-lg">
          <h2 className="font-bold text-h2 text-on-surface">Shop by Category</h2>
          <Link href={ROUTES.MARKETPLACE} className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all text-small md:text-body">
            View all <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-md md:gap-lg"
        >
          {CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all z-10" />
              <img 
                src={cat.img} 
                alt={cat.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 z-20 text-white">
                <p className="font-bold text-body md:text-title">{cat.title}</p>
                <p className="text-[10px] md:text-caption font-medium opacity-80">{cat.count}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trending on Campus (Product Grid) */}
      <section className="mb-xxl">
        <div className="flex justify-between items-end mb-lg">
          <h2 className="font-bold text-h2 text-on-surface">Trending on Campus</h2>
          <div className="hidden sm:flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container-low transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container-low transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {TRENDING.map((product, idx) => (
            <div key={idx} className="group bg-white rounded-2xl border border-outline-variant/30 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={product.img} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.badge && (
                    <span className={`${product.badge === 'HOT' ? 'bg-tertiary-container' : 'bg-primary/90'} text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm`}>
                      {product.badge}
                    </span>
                  )}
                  <span className="bg-white/90 text-on-surface text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-caption" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                    VERIFIED
                  </span>
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-error transition-colors">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h3 className="font-bold text-title text-on-surface truncate">{product.title}</h3>
                  <p className="font-bold text-title text-primary shrink-0">{product.price}</p>
                </div>
                <p className="font-medium text-caption text-on-surface-variant mb-4">{product.meta}</p>
                <div className="flex items-center gap-2 mb-6 mt-auto">
                  <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                  <span className="text-caption text-on-surface-variant font-medium">{product.location}</span>
                </div>
                <Link href={`/product/${product.id}`} className="w-full bg-surface-container-low text-primary py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition-all text-center">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Added Feed */}
      <section className="mb-xxl">
        <h2 className="font-bold text-h2 text-on-surface mb-lg">Recently Added</h2>
        <div className="bg-surface-container-low rounded-[32px] p-4 md:p-8 border border-outline-variant/20">
          <div className="space-y-4 md:space-y-6">
            {RECENT.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 md:gap-6 p-3 md:p-4 rounded-2xl hover:bg-white transition-all group cursor-pointer border border-transparent hover:border-outline-variant/20 shadow-sm hover:shadow-md">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-surface-variant flex-shrink-0">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-4">
                    <h4 className="font-bold text-small md:text-body text-on-surface truncate">{item.title}</h4>
                    <p className="font-bold text-small md:text-body text-primary shrink-0">{item.price}</p>
                  </div>
                  <p className="text-caption text-on-surface-variant mt-1 truncate">{item.desc}</p>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2">
                    <span className="text-[10px] md:text-caption font-bold text-secondary flex items-center gap-1">
                      <span className="material-symbols-outlined text-caption md:text-small">{item.icon}</span>
                      {item.tag}
                    </span>
                    <span className="text-[10px] md:text-caption text-on-surface-variant">{item.time}</span>
                  </div>
                </div>
                <div className="hidden md:flex">
                  <button className="p-2 rounded-full bg-surface group-hover:bg-primary-container group-hover:text-white transition-all text-on-surface-variant">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action Button (Mobile/Desktop) */}
      <Link href={ROUTES.SELL} className="fixed bottom-24 md:bottom-8 right-6 md:right-8 bg-primary text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group hover:shadow-primary/50">
        <span className="material-symbols-outlined text-[28px] md:text-h2">add</span>
        <span className="absolute right-full mr-4 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl text-caption font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
          Post New Listing
        </span>
      </Link>
    </div>
  );
}

// Data definitions
const CATEGORIES = [
  {
    title: "Electronics",
    count: "1.2k+ listings",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGrtTyRrMryOPHaj5g6xCKOVSk-X0wnmrHQpVRBrIN5HDJqIk12lxSTfExDEGPbLioYxYj1j1ASyfPXSMYBauXUPsGG61lI3yDf0UFYcV-2cgWFXYg4sEW0IArPbnpKhmjr5hOzh0yleJiDk3PyDg5eY5IkuPKdA__d94WgUHpVq2iBaaJZZXbHBzg3b9fxyawymOpqCKAAwYu3lImv-8D-Fi-zgtZy-fhnxK-aDOudwhb9l9_awUqj4yfrBGXfP4wEmwbZmjQDV3L"
  },
  {
    title: "Textbooks",
    count: "3.4k+ listings",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDb1Op3OqS7df8QZL4GNHuxBrRPmVCIX63Vtj0b6T2C8ZmUZHAvBXlyb9yc3GGfMSL9U_HfAWIobZbeOOwAAEmTguGNmjaiCYS7ZnXwYRX-g02TfVlV4-o7zGGER-mgSwlwI8MTk6t8vdSUOM4kIRxdZKYAiXZamK6zVzYP5WEmbfXr19nd87JaFElJJDDwC_UaFdfhFRy9HhgSU5rf5HGh2klTSFnfpRxbThjG2qUu_cTvgC3qH-hYSnn6Rp6Nwn5UKDc-b4kQs1Tc"
  },
  {
    title: "Housing",
    count: "450+ listings",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBf6P43SDuSlFquIH4gXyhRW7lnV7QcUDofk9E4D_90ROHiQXLPelafCdRgCO-MDSSNGt4UYDX9wQ7lZfkQweIXiMFoZ6waXBpxDS1BxualtSPOKKHn9fqH8EbfclHfxK8K0TAOBKlcI251baowsx5mfg9i4nyWvo8UTNuKmtJVXKASD_AE5WaQ10KQubQRifAepJlUqIWJYc39SXr5gHkupmk-hCudOSOM0ivY6XfoFb96_b_NaA7Vw-H9_n-YTfF5l2AQ0k6jpTis"
  },
  {
    title: "Services",
    count: "800+ listings",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUGG2qIVHTa4DNVSDUCqcMnkRKynvUfR0QGaQfMw0aP2D6-vGtmKptxC495NgJtj2xrVciODX5R5TPsTPoyBhfTXRv6vnfxfvjWhY4WUXZyq8cxuRulPf8QbeCMeRsR_JGwnLb6I3aPD-rp8Aio2ZRiZaKDisLBl21ZA8xO7GQbHWzis-pU-hnMqYqVsFhxFIckOAc7HdNoCfzFtWA64vjyPF-HySHsYMVy2STT3IzbtaDdISDag-V_z3nIBfCOHOKGcdCSXpXV-te"
  }
];

const TRENDING = [
  {
    id: "1",
    title: "Segway Ninebot G30",
    price: "$450",
    meta: "Posted by Alex J. • 2h ago",
    location: "Main Quad / dorms",
    badge: "NEW",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBL6fOGkGUnfF1evNTvn8BvByLsZmpnhLCVJTUx9MBckQw__xY-bCtvbOrVLZ46kmTSPTqa9GI0hVkHnNPHk663CVlvZArY2qQVePhFvJUJCJI7WOtdp82fHa9vjBpgh4qZUJQ-cAqbAp6a8SNyMjyjyvTpBzB_Ey_3RAs5y-8ghNq7gPn4odeTQle96Nq4P-zgzNHfr3XUImK4fh8VgpxMDBr-qgqw3-BWstRM-uflb4g5YorozZ4un9JXk6F8mWj3_FyKOCrYl4Ta"
  },
  {
    id: "2",
    title: "Sony A7III + Kit Lens",
    price: "$1,200",
    meta: "Posted by Sarah M. • 4h ago",
    location: "Off-Campus Housing",
    badge: "HOT",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9qeKHZxyVSGQXQXX0NVZvfhAcib0ZNNjw08q3TyvVwNOhoVnUBVw8GtRIcvEOj3efxqVDo0RoSGI49zFzZjbq15qn-CtntbQPuJTFyMyWejyXV7NjbLM9Nt5zTcRKgL3pu7awwwnSMC6MTYwIq_C4ad_QUXwHnmRRwVKQefKm92iaBziVxZm8oJO8ZjDK639IJoolwtZwiMBaCZDCwb_LuKvGkce8R01MqnCNqRuTBDmpOl4XJ_C0-O8th2Xxly-Brvov2ZNBoiZD"
  },
  {
    id: "3",
    title: "Herman Miller Sayl Chair",
    price: "$380",
    meta: "Posted by David L. • 6h ago",
    location: "Graduate Dorms",
    badge: null,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAZFMhA4m4ldWN730EREOxqICgVFX8LlA3qqUCBwKV0QKhJr9svsPHKKj_CF9Zgtv8xJ1uhLK8lprkxPlo5aLYSnaxIAJBk3pMeBcFBm7uNa8MMXxjhmTU-R6bzkc31XohpZ6yY-gEb2YCllzJ7Wl04Zx1xLxC1vfBEBzy9uqirbSSPpWjG5nGTyL7w912GMv7VnbYVD5hdAOIxZ2K4mO9zz-AX54BPwM1pZ61eUiZqwVeLFBRfVYd8xrB_V13dEAXDKWHl-3I2Gh5"
  }
];

const RECENT = [
  {
    title: "TI-Nspire CX II Engineering Calculator",
    price: "$120",
    desc: "Excellent condition, includes case and charging cable.",
    tag: "Science Dept",
    icon: "school",
    time: "Just added",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIepb7PJHCPt8ElVKQVPHOiAL_7KBvkXFXKNFR4_B0hzrt94pwGZeJ2L_km0xgkCC_xva3u9aD8RUN75_0wTnY59xeq_lksB9IKXfOLwi0O0DLncw2lAniBv0r3-aThtRn7V9cufaBCflvpnKtEjNJ-zr9PZX0dpvRwyf5rnHDwd7pzZ_SnhUHiEKitlvxC7cEgmIKf94gvn4GI5o2CNBm20gjk1-kly0h57FYQY1HKkUmNTl4qhgZL_RhHBCSb20A2DH_0K_SZIa7"
  },
  {
    title: "Calculus II Tutoring (A+ Student)",
    price: "$35/hr",
    desc: "Available evenings and weekends at the Library.",
    tag: "verified Tutor",
    icon: "person",
    time: "15 mins ago",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcClXJQ4-r-np-940mbsmkneKw5ZeWTdYK0U0nsVZra2WhbU5MHwggsven9-uH6PNQYWlIHgyleBAFytRlHtHyaYY8FroAUo_z24jZR_Bw8-pqBOrvmfoLe8KAk5U2mHsDNB618xXjAH_v00BYo1ISEdnYCyCektl8z6lxYCllV3jhjfjBvkN7qwQRp9qFOfmyZkhyv6CDDkrHaMyzWxWtT8YL5KV0v5xOCRw-Q_ScbDq2rKSyGO9DCGJPRWlGXzz6FpQroVR4ixfW"
  },
  {
    title: "Mechanical Gaming Keyboard (Red Switches)",
    price: "$60",
    desc: "Lightly used, fully cleaned. Perfect for dorm setups.",
    tag: "Free Pickup",
    icon: "local_shipping",
    time: "42 mins ago",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDus-lIaqzcnq4UAKZq0XKNapTAIcB2ARwUaNzpgFs9afGLQpCFUayHv60bVMuEDo0rM9v6bWXMaIfG_aUQV5e9c4UUQRDThx6Tq95zdmr8LUcmHtNMiZpY0X9jxpiKCKt_lMN3grC3WJUN6wsUe61nBLoUSuIO681_p9TlsEVmEVJy0kjBsaVwZ1pJx8hEpk7nLWIK-c2maUhymUQDSxT86nU2YTHhoa1BGr508yMKeWrLrqKLS88Ngx2aXCp7F7X2r7q22uXrUT7E"
  }
];
