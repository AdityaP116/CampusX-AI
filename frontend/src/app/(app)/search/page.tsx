"use client";

// =========================================================
// Search Results Page
// Pixel-perfect conversion of design/1/search_filters (Main Content Canvas)
// =========================================================

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function SearchPage() {
  const [activeFilters, setActiveFilters] = useState(["Textbooks", "Like New"]);

  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  const clearAll = () => {
    setActiveFilters([]);
  };

  return (
    <div className="w-full">
      {/* Results Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-xl">
        <div>
          <h1 className="font-bold text-h1 text-on-surface">Search Results</h1>
          <p className="text-body font-medium text-on-surface-variant">
            Showing {RESULTS.length} listings for <span className="font-semibold text-on-surface">&quot;Organic Chemistry&quot;</span>
          </p>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant/30">
          <span className="text-small font-medium text-on-surface-variant">Sort by:</span>
          <select className="bg-transparent border-none focus:ring-0 text-small font-bold text-on-surface outline-none cursor-pointer py-0">
            <option>Most Relevant</option>
            <option>Newest First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </header>

      {/* Active Chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-lg">
          {activeFilters.map(filter => (
            <span key={filter} className="flex items-center gap-1 bg-surface-container-high text-on-surface text-caption font-bold px-3 py-1 rounded-full border border-outline-variant/40">
              {filter}
              <button
                onClick={() => removeFilter(filter)}
                aria-label={`Remove ${filter} filter`}
                className="ml-0.5 flex items-center text-on-surface-variant hover:text-error transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </span>
          ))}
          <button onClick={clearAll} className="text-primary text-caption font-bold hover:underline">Clear all</button>
        </div>
      )}

      {/* Bento Results Grid */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-lg"
      >
        {RESULTS.map((result, idx) => (
          <motion.div 
            key={result.id}
            variants={fadeInUp}
            className={`${result.featured ? 'col-span-1 sm:col-span-2' : ''} group relative bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
          >
            <Link href={`/product/${result.id}`} className="block">
              <div className={`${result.featured ? 'aspect-[16/9]' : 'aspect-square'} w-full overflow-hidden relative`}>
                <img 
                  src={result.img} 
                  alt={result.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                {result.featured && (
                  <div className="absolute top-4 left-4 bg-primary text-on-primary text-caption font-bold px-3 py-1 rounded-full shadow-lg">
                    Featured
                  </div>
                )}
                <button 
                  className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-on-surface-variant hover:text-error transition-colors shadow-sm z-10"
                  onClick={(e) => {
                    e.preventDefault();
                    // Wishlist toggle logic would go here
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>favorite</span>
                </button>
              </div>
              <div className={`${result.featured ? 'p-6' : 'p-4'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary text-body" style={{ fontVariationSettings: "'FILL' 1" }}>
                    format_image_left
                  </span>
                  <span className={`text-caption font-medium ${result.featured ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                    {result.verifiedText}
                  </span>
                </div>
                <h3 className={`${result.featured ? 'text-title mb-1' : 'text-body line-clamp-2 mb-3'} font-bold text-on-surface group-hover:text-primary transition-colors`}>
                  {result.title}
                </h3>
                
                <div className={`flex items-center justify-between ${result.featured ? 'mt-4' : ''}`}>
                  {result.featured ? (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-h3 text-on-surface">{result.price}</span>
                        {result.originalPrice && (
                          <span className="text-caption text-on-surface-variant line-through">{result.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-caption font-medium text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-body">schedule</span>
                        {result.time}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-bold text-title text-on-surface">{result.price}</span>
                      <span className={`text-caption font-bold px-2 py-0.5 rounded text-xs uppercase ${
                        result.condition === 'Like New' || result.condition === 'Pristine' 
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}>
                        {result.condition}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <nav className="mt-xxl flex justify-center items-center gap-2" aria-label="Pagination">
        <button className="h-10 w-10 rounded-lg border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors disabled:opacity-30" disabled aria-label="Previous page">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button className="h-10 w-10 rounded-lg bg-primary text-on-primary font-bold" aria-current="page">1</button>
        <button className="h-10 w-10 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-variant transition-colors font-medium">2</button>
        <button className="h-10 w-10 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-variant transition-colors font-medium">3</button>
        <span className="px-2 text-outline" aria-hidden="true">...</span>
        <button className="h-10 w-10 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-variant transition-colors font-medium">12</button>
        <button className="h-10 w-10 rounded-lg border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors" aria-label="Next page">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </nav>
    </div>
  );
}

// Data definitions
const RESULTS = [
  {
    id: "1",
    featured: true,
    title: "Organic Chemistry: Structure and Function (8th Ed)",
    price: "$85",
    originalPrice: "$145",
    time: "2h ago",
    verifiedText: "Verified Student Seller",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClk5CzjS6Q3cvXZte7A4CXuYHmHyS3bwraY8JqOur1-OaV5q3ep1cMnsUMmSOfxKxY7z5sli-Yhrci3ua4AjnIaxLg5ApTVQheQ9n-3E7e-PBLcM84SDygDfmgucFe5nJ6vWLxHPPVko0sU_nERkM9BSGzQdhFP8x8tM71hHU9DZyK4xSHfXfWYLTsSYJqv6z_Gg1kX8yNRvKaK4wTlRhQFUotOmZISA_A1UYzuvlJwbJtiXeWofTKA2jL7WzMUg6egWZ7kSMIRPuK"
  },
  {
    id: "2",
    title: "Deluxe Molecular Model Kit (200+ Pieces)",
    price: "$25",
    condition: "Like New",
    verifiedText: "Verified",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGJV8xzgv137Ag4RWO1U83PDaHjhGbQwq2g71uA1ph7F4idNYrlPhN1bESb_JlxtH-ce4m2UE3NRCTZewjxAqi4xGioNlzrjIdMEmAg6QT_-u5Msc8gVq9snG5rzm85VD81nG2B4KLSSRRnAPQgRHeJIqoWdl-tjgF55L1JsgrfFCjyW0WoxMjO_ecF2cDgnTq9jD83HpVrmDsC0QasefQazBiuJt66SmRxi0p-rgY_J9THcX-ZKl4vKU94MA_RTox18_GbKg4Ljg7"
  },
  {
    id: "3",
    title: "Complete Organic Chem I & II Study Notes",
    price: "$15",
    condition: "Digital",
    verifiedText: "Verified",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbSCPxuNK1uSIGQuM6G_C-Flr3M2DChlRyGnVOJlPsOVzf3FSGeJPxIjHkbpizSfPnLAHfmq0bDsQxqT7mry9J9wESkdWASHYv9WWafM40MgQl-YhEdsUaqTdLewocF7rwYYgtXGMsLx3w_FO6DRAHaGo9B8owKqaZsjD1WVnbBjIEntFDprViFsKs7ycNscitEhxLGzHsGFwiRoI58TueSudVzeVd5gxPlwDFHBUN2qXRcF-VeC4I51OQHo8fyBHqTk43U8plR8JU"
  },
  {
    id: "4",
    title: "Lab Coat & Safety Goggles (Size Medium)",
    price: "$20",
    condition: "Used",
    verifiedText: "Verified",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMOPVvu1rnATn2OlCcv1gWmLp_BYROb0AkwsO4g5BwhliqD_Vw_77NN7XWTpqhOD6zkne2eCcDz-445QJtXk6nw5zmWxNpm7hLdRdDrbTdjDqvs9EIphITWFJSY7JyIvK7IziDyLpS4ek8vcn73arCeuSw3gf-944jDu7iiEUMe8eFxNUTfC5qgFt5Z_Y6VzHZ89eIc2gQdtCDbstgcaaNzsQWuU08UpKbSu63L2SXbMhcemIE5uNch8I0Px9Hf-BwXILqxGKK1MHA"
  },
  {
    id: "5",
    title: "Klein Organic Chemistry (3rd Edition)",
    price: "$110",
    condition: "Pristine",
    verifiedText: "Verified",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsfbsJa4KuYrJmzKdBX3F_eCKktwNLt7uYoTZhZgeQMobupOfpJpdJ8XW-bD6Ixjg1uV6ODylm9bh5G1SjQkOgK1QcDZ6n-4wa6EIslGawMYph0Q-X_MuU9LyhCuDaE2__ciBju2WpANr3wCwYeNUjsSHTVVuNgHHe0hA5kjvc91-ooTSkWHHHtq8hGlGlq4M_sfS5D94uoiRsnoDRaoWUAvBTfMJL6AiYvuFEAJETrpW75EuG5sqhomq4We0xUBz9wuRUl13ijSkd"
  },
  {
    id: "6",
    title: "ChemDraw Professional - Student License",
    price: "$45",
    condition: "Software",
    verifiedText: "Verified",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDj0wus7Bnx_kHXyxV-92oZK2N4ApJLqYoehxAM4oIvDDOHhaoZpeqQ6Mvg4XIWlsNbk7V20prVDETWr1b50GS8ooMj3Tvz1662-NpNPi2v3crHsMWOcIu-p9jYMDIa5RokcsEAS-YkV3qxUFPwjtUMmnmYPn65OqVCx1p4BXvl0v59FaLIqyBqstBVBp5FM80fCHDlJi5lT83MjXwQ9jplrXsXQGt2Og5daFvQAp_kYxKMDonJuGus7UnE5nPMM0Kfl9uNdrw_mAIl"
  }
];
