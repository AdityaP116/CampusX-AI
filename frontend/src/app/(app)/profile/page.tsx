"use client";

// =========================================================
// Seller Profile Page
// Pixel-perfect conversion of design/3/seller_profile
// =========================================================

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { formatPrice } from "@/utils";

const MOCK_LISTINGS = [
  {
    id: "l1",
    title: "MacBook Air M2 (2022)",
    price: 850,
    condition: "Used - Mint",
    description: "8GB RAM, 256GB SSD. Silver. Original box included.",
    location: "Main Quad",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFNMITJlyGitCDQ4hyO9RoDxIP_eFx8rawWDT4gcJlVXrVGb4CJomQMxgtxlQp35vFP-3am08ern2MTHvw9I64od-SyiSgcbwBJWgR84C2F9mRfGZ8iGnDrKnymGVUFusIFe3JVK_iBOQKL7coCJbNagJPEa_wFOeYV4l6_UJGO07uGt9R-0Z6EAxNsKZWjj8rzuAvQ91P21fIjncNLYW-_n0kFfkbP2fYQvlozBJNdMkEzEQ-EfzQiwU33wtPlLl8UEl8AD8vQNvT",
    isExchange: true,
  },
  {
    id: "l2",
    title: "Sony WH-1000XM4",
    price: 180,
    condition: "Like New",
    description: "Noise cancelling, midnight blue. Barely used.",
    location: "Engineering Hub",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIU8_iFAP0XF5m2HcvSQhldIluBpr0NVw-zpxWCYq8OwNVeuqt9Y-N9lPMbteEj3Fpf3ahylV1AtcZOb7Tc3TDrwR5pu4ynFkagD-_mpA7wYmLTtMIuJD3mZIPdApsDIlm5iG7ZHwYeehmQTllISjZveFVQ77ixNoyx86HYXFAoNeOOilNAkG316uFRd6W-RIwS1VKK08Yt9CWcFTsNP8Tak-Wsz0HCsG3gs-5vLN8sH9rW00tzufOY3KX_IkH3F8RTLyZuzBvarf-",
  },
  {
    id: "l3",
    title: "Algorithms & Data Structs",
    price: 45,
    condition: "Used - Good",
    description: "Sedgewick & Wayne. 4th Edition. Minimal highlighting.",
    location: "Green Library",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEWuE62z5wA8HINE_8FS0ztssNlps8Ipr7yFGrWE41-gpsMCIh3siyNaKKw3xewtVE4sEoQ3cId5Dd9JkUr_IcWV82ND5YnCNxxFa_CLBov9fc3alytfKfXOvKpU4UHtSD2m5zgqUmvX7G5IQP9fPxFxDYkS5mjxjAtY2NDnyhrhZJdpK5IHsuMskDrta_F3nGs0fkZQv2Cnjw_tFK7OmgRTFZnDy3u-m9pYkmrIXbKjVLHxLkLYdm0DrXfcQAzLU5UgXw9K14rtsJ",
  },
  {
    id: "l4",
    title: "Adjustable Laptop Stand",
    price: 35,
    condition: "New",
    description: "Aluminum, foldable. Great for dorm desks.",
    location: "Main Quad",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJBp9olPZA-LNERo0JJSKILwEmar5JfWPhvMAxhzzU0JPAlkm6aHTaaWWorFWGbqM3o3Qh44a_fFV-FhAU1i0cTjkxyZ09yhR77oFbzAV4GgQ3D1fT8mmqhrLhYfGGxtYQt42Vq3nReA7dFlzKcF84eVfZ2tRxanqahtMajzWaj8PAgrEXFFQMpG6IGpXbjqEB4kRm0NrlBmgzM82FZUI4To_VwCrEGpBB3C9Xy6x-g1k1K4-IXxz5AkshKVrVLc6AxwLweGklnPkb",
  },
];

const MOCK_REVIEWS = [
  {
    id: "r1",
    author: "Sarah K.",
    time: "2 days ago",
    rating: 5,
    text: "Met Alex on the quad for a monitor. Item was exactly as described and he even helped me carry it to my car. Super nice guy!",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzbKCFD8ODQj0LZYImeYy-bxy5aJXgcKbU1L9waSCYOC6wJVjiRJQZuvTH2wgB4C7XNo9tG28u30yw86UGadl3rgN3xCDbUIJ2wF3g3BXgIWRzp46PsjBBodzqozlZ9OQJmdgCmM1hW5IEJ5_HCSSWEbfz5gJ54OsLDQhl3CjaW-PH08u2R_NwPpEFjcer7zGunlyvINuFq-ctmDdmupURIVLq2TgJNPoqsuzPSpO86Leh8c3PzIvQTXncUlpCTF1z-ZuYh6sGD3cN",
  },
  {
    id: "r2",
    author: "Michael T.",
    time: "1 week ago",
    rating: 5,
    text: "Responsive and easy to coordinate with. Great seller!",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_ogZCykiNYZGrGs-LxX-uJZtQjVDmW75U8lEIQSmmVnHwEJVWoQIPMZAgnFYYYfQ90OdrfsMHQIMzj3q2dORClUDuC-fZ5Yf2IBjGSaWygrlSFQm6tGsCkkxYspR4jlPJgz5ekIBEF_RLpYaB8HV40_SnIy_Fld5PyZ9TEj134Yid9srIaEub54z1g60tTnXgzDw4lkiZZh56cYTxqNQbuoFo-XVhT6Cuq_RLcaoGZs7f7kJhwYw7icLLekt7AH6-5ql_AppqoziG",
  }
];

export default function ProfilePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Profile Sidebar */}
      <aside className="lg:col-span-4 flex flex-col gap-lg">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-surface-container-lowest rounded-3xl p-xl border border-outline-variant/20 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-md">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzH0RWFyb5W19qDCYw6fKxGiSNytgjClwT2DTosPiBcsqoDQfDWB2kSe4hQLcStxNnCIRwoFUShd7LGEFuxZxJHvNjlvSqBJPDiuBKpo4mu6HYt1PwJthj58ca0p9UYMPyJnJXgjDUoUZXmwNVlQbaX3PJX2e-hw3XZe0SXtfIi2y20Mbadsm9Fp4I_MqAhFcsBY-yfpmOYIzvYyTv3ZuPujjrP2uJgxMBg-MwTH_S-tMSdFAl7ba31NaSeIeqLc-XjpqEdCpbptdQ"
                alt="Alex Rivera"
                width={128}
                height={128}
                className="w-full h-full rounded-full object-cover border-4 border-surface-container"
              />
              <div className="absolute bottom-1 right-1 bg-primary text-white p-1 rounded-full border-2 border-white flex items-center justify-center">
                <span className="material-symbols-outlined text-body" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            
            <h1 className="font-bold text-h2 mb-xs text-on-surface">Alex Rivera</h1>
            <p className="text-body text-on-surface-variant mb-md">Computer Science @ Stanford</p>
            
            <div className="flex items-center gap-xs mb-lg">
              <div className="flex text-amber-500">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0.5" }}>star_half</span>
              </div>
              <span className="font-semibold text-title ml-xs">4.8</span>
              <span className="text-on-surface-variant text-caption">(124 ratings)</span>
            </div>
            
            <div className="w-full grid grid-cols-2 gap-sm mb-lg">
              <div className="bg-surface-container p-md rounded-xl text-center">
                <span className="block font-semibold text-title text-primary">98%</span>
                <span className="text-caption text-on-surface-variant uppercase tracking-wider">Response Rate</span>
              </div>
              <div className="bg-surface-container p-md rounded-xl text-center">
                <span className="block font-semibold text-title text-primary">&lt; 1hr</span>
                <span className="text-caption text-on-surface-variant uppercase tracking-wider">Response Time</span>
              </div>
            </div>
            
            <button className="w-full bg-primary text-on-primary py-md rounded-2xl font-semibold text-title hover:bg-secondary transition-all active:scale-[0.98] flex items-center justify-center gap-sm mb-md">
              <span className="material-symbols-outlined">mail</span>
              Message Seller
            </button>
            
            <div className="flex items-center justify-center gap-sm text-on-surface-variant font-medium text-small">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              Joined CampusX Sept 2022
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="bg-surface-container-lowest rounded-3xl p-lg border border-outline-variant/20 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <h3 className="font-semibold text-title mb-md text-on-surface">Seller Verification</h3>
          <ul className="space-y-md">
            <li className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-full bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">alternate_email</span>
              </div>
              <div>
                <p className="font-medium text-small text-on-surface">University Email Verified</p>
                <p className="text-caption text-on-surface-variant">Confirmed @stanford.edu address</p>
              </div>
            </li>
            <li className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">credit_card</span>
              </div>
              <div>
                <p className="font-medium text-small text-on-surface">ID Verified</p>
                <p className="text-caption text-on-surface-variant">Government ID checked</p>
              </div>
            </li>
            <li className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">format_image_left</span>
              </div>
              <div>
                <p className="font-medium text-small text-on-surface">Trusted Seller</p>
                <p className="text-caption text-on-surface-variant">50+ successful transactions</p>
              </div>
            </li>
          </ul>
        </motion.div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:col-span-8 flex flex-col gap-xl">
        {/* About / Bio */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="bg-surface-container-lowest rounded-3xl p-xl border border-outline-variant/20 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <h2 className="font-semibold text-title mb-md text-on-surface">About Alex</h2>
          <p className="text-body text-on-surface-variant leading-relaxed">
            Hey everyone! I&apos;m a senior CS major clearing out some of my high-end gear and textbooks before graduation. I take great care of all my electronics and most of them still have original packaging. Always open to reasonable offers from fellow students. Meetups preferred on the Main Quad or near Green Library.
          </p>
        </motion.div>

        {/* Active Listings Feed */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-lg">
          <div className="flex justify-between items-end mb-sm">
            <div>
              <h2 className="font-bold text-h3 text-on-surface">Current Listings</h2>
              <p className="text-body text-on-surface-variant">12 items available for pickup</p>
            </div>
            <div className="flex gap-sm hidden sm:flex">
              <button className="px-md py-sm rounded-full border border-outline text-small font-medium hover:bg-surface-container transition-colors text-on-surface">Category</button>
              <button className="px-md py-sm rounded-full border border-outline text-small font-medium hover:bg-surface-container transition-colors text-on-surface">Price</button>
            </div>
          </div>

          {/* Grid of listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_LISTINGS.map((listing) => (
              <motion.div 
                key={listing.id}
                variants={fadeInUp}
                className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/20 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <Image 
                    src={listing.image}
                    alt={listing.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-sm py-xs rounded-lg text-primary font-bold text-small shadow-sm">
                    {formatPrice(listing.price)}
                  </div>
                  {listing.isExchange && (
                    <div className="absolute top-3 right-3 bg-primary text-white p-1 rounded-full shadow-md flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>format_image_left</span>
                    </div>
                  )}
                </div>
                <div className="p-lg flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-xs gap-2">
                    <h4 className="font-semibold text-title truncate text-on-surface">{listing.title}</h4>
                    <span className="bg-surface-container text-on-surface-variant px-sm py-xs rounded text-caption whitespace-nowrap">{listing.condition}</span>
                  </div>
                  <p className="text-caption text-on-surface-variant mb-md flex-1">{listing.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-xs text-on-surface-variant text-caption">
                      <span className="material-symbols-outlined text-body">location_on</span>
                      {listing.location}
                    </div>
                    <Link href={`/product/${listing.id}`} className="text-primary font-medium text-small hover:underline">
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Feedback */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="bg-surface-container-lowest rounded-3xl p-xl border border-outline-variant/20 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <h3 className="font-semibold text-title mb-lg text-on-surface">What students say</h3>
          <div className="space-y-xl">
            {MOCK_REVIEWS.map((review, i) => (
              <div key={review.id} className={`flex gap-md ${i > 0 ? 'pt-lg border-t border-outline-variant/10' : ''}`}>
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image src={review.avatar} alt={review.author} width={48} height={48} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-xs">
                    <span className="font-semibold text-title text-on-surface">{review.author}</span>
                    <span className="text-caption text-on-surface-variant">{review.time}</span>
                  </div>
                  <div className="flex text-amber-500 mb-xs">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="material-symbols-outlined text-small" style={{ fontVariationSettings: j < review.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                    ))}
                  </div>
                  <p className="text-body text-on-surface-variant">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
