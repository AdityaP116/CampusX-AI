"use client";

// =========================================================
// Categories Discovery Page
// Pixel-perfect conversion of design/1/categories_discovery
// =========================================================

import { motion } from "framer-motion";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function CategoriesPage() {
  return (
    <div className="w-full">
      {/* Hero Header */}
      <section className="mb-xxl">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-bold text-h1 text-on-surface mb-md"
          >
            Marketplace Categories
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-body text-on-surface-variant"
          >
            Discover everything you need for your campus life. From verified rentals to second-hand textbooks, explore Stanford&apos;s largest peer-to-peer student network.
          </motion.p>
        </div>
      </section>

      {/* Discovery Bento Grid */}
      <section className="mb-xxl">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-lg h-auto md:h-[600px]"
        >
          {/* Academic Block */}
          <motion.div 
            variants={fadeInUp}
            className="md:col-span-8 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 transition-transform duration-300 hover:shadow-lg cursor-pointer h-[300px] md:h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZKLvr8GHSsgEb-xkKX8Fj9GaTEEmK07dE11sP0HbJ9Lv2V-5JFwKEp5pVPg-OBbQiEdAOSkwlAmehrU9wZrDQTzmb__Vik1fO58hsolfFFiLBbZSe6GRXLn9Z4pXs8rXktc4dTS-sLI3VUxHkhTi8a59ErTHjlW0SyJdPbaU6hSNsVdnN9LbtWqLkRoKXD2oPDskvLqEartF_x-J7htRJfgq4upmLh2yLyVCdfkdOmj-Qk0sf7FN75jCIHwhEv4q6tnbkYbDe5jQK" 
              alt="Academic" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute bottom-0 left-0 p-xl z-20 w-full">
              <div className="flex justify-between items-end">
                <div>
                  <span className="bg-primary/90 text-on-primary text-caption font-bold px-3 py-1 rounded-full mb-3 inline-block">5.2k+ Listings</span>
                  <h2 className="font-bold text-h2 text-white">Academic</h2>
                  <p className="text-white/80 font-medium text-small mt-2">Textbooks, Lab Equipment, Stationary &amp; More</p>
                </div>
                <span className="material-symbols-outlined text-white text-h2 group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
              <div className="mt-md flex gap-sm overflow-x-auto no-scrollbar pt-2">
                {["Textbooks", "Lab Kits", "Calculators"].map(tag => (
                  <span key={tag} className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-caption px-4 py-1.5 rounded-full whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tech Block */}
          <motion.div 
            variants={fadeInUp}
            className="md:col-span-4 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 transition-transform duration-300 hover:shadow-lg cursor-pointer h-[300px] md:h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDB2jOy0tItTzV3781GSjLNx-ZHnPx3Zyuq7j94vaxomcWTZljpOLEhjbKPBdNiNYYMsX4V0YPrJm7u8wxFfhxLfPPO8qJT3guQ6lDP-yRy2pYw0Qx9pzLo6jTDyo-jzwsd96CB3mZRMk-Qpmw9fEoQFsDKRt52SuWo2BXFNkrH9TRCF0dECqMIPMAz1gbudwY8mWyIGVeiMnW95J2_g0EEeyz-PdrDJJ-KbuhOjAHYv7aRSAy1zazga4pOKLRZrHIiXUgD-fz6yyDZ" 
              alt="Tech" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute bottom-0 left-0 p-xl z-20">
              <span className="bg-secondary/90 text-on-secondary text-caption font-bold px-3 py-1 rounded-full mb-3 inline-block">New This Week</span>
              <h2 className="font-bold text-h2 text-white">Tech</h2>
              <p className="text-white/80 font-medium text-small mt-2">Laptops, Gaming &amp; Monitors</p>
            </div>
          </motion.div>

          {/* Living Block */}
          <motion.div 
            variants={fadeInUp}
            className="md:col-span-4 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 transition-transform duration-300 hover:shadow-lg cursor-pointer h-[300px] md:h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKY00fXZXjQd-ZeudtCD_vdLIE_nnIUnS-Q4Nb195q1Eorntqq02E2xxaX7Kfs8NBHoY4CBt9-kRnM5LA95IiMu6SAcwnYrRdTuuw3wgQ-zd9qZyC3aZ0xJm5gMKsFQgC3vQXY_oBnBsjaB74nr60sbo_mldEanA0v2UIfShgaIomx-5Yj2phL8Rab47hFmIZ1ImwbkG6k8bkEx-Hgiy1-0SHpOC14UUvRC7j1kNiti4xUNUMCKB4KnkooK9o3gD6Kk90FJna9_Dg9" 
              alt="Living" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute bottom-0 left-0 p-xl z-20">
              <h2 className="font-bold text-h2 text-white">Living</h2>
              <p className="text-white/80 font-medium text-small mt-2">Furniture, Decor &amp; Storage</p>
            </div>
          </motion.div>

          {/* Services Block */}
          <motion.div 
            variants={fadeInUp}
            className="md:col-span-8 group relative overflow-hidden rounded-xl shadow-sm border border-outline-variant/30 transition-transform duration-300 hover:shadow-lg cursor-pointer h-[300px] md:h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFgB6WKGTEMfv355X4TPzHzLUulE1pME-Fhs_yxGsFb5bQLte_N-fxbxzwHRIVpMlnaPWS03aYKFWFcZmE7D5hAh9dZayATFhP9Pu3ou70t5QBKrNDGQ5bUpXl-wIHw5cno4Vort8aRzWPolI3iV1DVP_dR-QMfGnzd5H10HUIhCGd8wuRmbocasu_1sxWRYoWU8T7KqChta5E930ADLsrYz-wW2wwS5VJivq2QY63vxQYnBmLttYHG0fSMG7vBGBpJr91bH22RKq3" 
              alt="Services" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute bottom-0 left-0 p-xl z-20 w-full flex justify-between items-end">
              <div>
                <h2 className="font-bold text-h2 text-white">Services</h2>
                <p className="text-white/80 font-medium text-small mt-2">Tutoring, Moving, &amp; Design Gigs</p>
              </div>
              <span className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white flex items-center justify-center">
                <span className="material-symbols-outlined">handshake</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Sub-Categories Exploration */}
      <section className="mb-xxl">
        <div className="flex items-center justify-between mb-xl">
          <h2 className="font-bold text-h2 text-on-surface">Explore Sub-categories</h2>
          <Link href={ROUTES.MARKETPLACE} className="text-primary font-medium text-small flex items-center gap-xs hover:underline">
            View All Categories
            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
          {SUB_CATEGORIES.map((sub, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-md ${sub.colorClass} ${sub.bgClass}`}>
                <span className="material-symbols-outlined">{sub.icon}</span>
              </div>
              <h4 className="font-bold text-body mb-1 text-on-surface">{sub.title}</h4>
              <p className="text-on-surface-variant text-caption">{sub.count}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Curated Collections Section */}
      <section className="mb-xxl">
        <div className="bg-primary rounded-[32px] p-xl md:p-xxl relative overflow-hidden shadow-2xl">
          {/* Subtle pattern overlay */}
          <div 
            className="absolute inset-0 opacity-10" 
            style={{ 
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", 
              backgroundSize: "24px 24px" 
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-xl">
            <div className="md:w-1/2">
              <span className="bg-white/20 text-white font-bold text-caption px-4 py-1.5 rounded-full mb-md inline-block uppercase tracking-wider">Curated by CampusX</span>
              <h2 className="font-bold text-h1 text-white mb-md">The &quot;Freshman Essentials&quot; Collection</h2>
              <p className="text-primary-fixed font-medium text-body mb-xl">
                Everything you need to survive your first year, pre-vetted by seniors. Save up to 60% compared to new retail.
              </p>
              <button className="bg-white text-primary px-xl py-md rounded-2xl font-bold text-body hover:bg-surface-bright transition-all active:scale-95">
                Browse Collection
              </button>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-md">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwOOg5VK-rAw0-5K2Skw4zJjON0ZEJFfK4YP3TmP0V37kHsV6aTRf-WPkUhcHJU4kWt-YiLBjd0nTa1GEaGnI-gFk9mbkXw0pzXEov83I511ZBP9_YhumIRkOnczgFD2zwKkeDOQ_bWzA_HjLfwdXAn2UXafcZ1qz8mjSDLW8Xt71zqFaPYsiuUUJgsds2wDjkfAOJ0ttUZoieqPCy7mg4D_ZwC3OCBKpqoEAXUkxDNcPmowAvCDmKDSwIJvc0pPxdeuWJJC2oWLJW" 
                  alt="Study Setup" 
                  className="w-full h-32 object-cover rounded-xl mb-md" 
                />
                <p className="text-white font-bold text-small">Study Setup</p>
                <p className="text-white/60 text-caption">12 items</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFa1mlGLsJcph30xxiEq6WuRN3TuQM0_IZJ-yWi65Frp2bmmO60gF830bzFHmYfkZYp53jpYYenlk0c7saXjfnKiCC6osO6vdgKpTLyofbUtpPb_JmtMSyWai5A51slczWtT0UYwGW7CQrC4aYn7eUxU1N8CjB1dyjTyOEZ17APj0iXk-5m2ZoevXTXrE_bgc4niAQglCdWBq9tufNG_EFpmv2GxnVvBCQjnnGDgjhnZIKjTnxm6BotLN1oYbTiZBqcINMVlKrbB1V" 
                  alt="Kitchen Basics" 
                  className="w-full h-32 object-cover rounded-xl mb-md" 
                />
                <p className="text-white font-bold text-small">Kitchen Basics</p>
                <p className="text-white/60 text-caption">8 items</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grad School Section */}
      <section className="mb-xxl">
        <div className="flex items-center gap-md mb-xl">
          <div className="h-10 w-1.5 bg-secondary rounded-full" />
          <h2 className="font-bold text-h2 text-on-surface">Grad School Gear</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {GRAD_SCHOOL.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-md shadow-sm">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>
              <h4 className="font-bold text-title mb-1 text-on-surface">{item.title}</h4>
              <p className="text-on-surface-variant font-medium text-small">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Data definitions
const SUB_CATEGORIES = [
  {
    title: "Printing & Supplies",
    count: "124 active listings",
    icon: "print",
    colorClass: "text-primary",
    bgClass: "bg-primary/10"
  },
  {
    title: "Gaming & Consoles",
    count: "89 active listings",
    icon: "sports_esports",
    colorClass: "text-secondary",
    bgClass: "bg-secondary/10"
  },
  {
    title: "Dorm Furniture",
    count: "342 active listings",
    icon: "chair",
    colorClass: "text-tertiary-container",
    bgClass: "bg-tertiary-container/10"
  },
  {
    title: "Bikes & Scooters",
    count: "56 active listings",
    icon: "electric_bike",
    colorClass: "text-primary-container",
    bgClass: "bg-primary-container/10"
  }
];

const GRAD_SCHOOL = [
  {
    title: "Professional Wardrobe",
    desc: "Suits, blazers, and formal wear for networking events.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJm86J8T01YjNjZv6DylLjWdWkc3dY5OTp2rjYGEzuG1vkBBJ0Vascp0Sm3RQaFtkW9ZHJJPdKApTqOMArX7HBOpdRJ9ZrFcY8WVXbSAo_44kllOn1ei9XQ6rT0M1gQWy4r8FY0HMKL7KpZ_S-I7K8qM31FwkENJrh9si6pzxRos354YrLqsfY7Y9djjTgu61ZDR61zQXcAgGgLUCyjkV-3B7Gj0H0ZCZjE7x_k8WgOxgO7Py7YkAcnGi3V319YrQ31ZOX8zwnlv-4"
  },
  {
    title: "Advanced Lab Tools",
    desc: "Specialized equipment for STEM research and clinicals.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC38tQM3ZdWB3GgFHeb_g5SKvJQgJAjh1ecz7aZtzao_FnMx_Z55yMe4yz2_9vAxHk81lHAxZXrGDEOreB9rvfqAvtj2sZEfGivLWKqlumc5Y7k-z1axiKBL19tx8OXsDzobGdYz5xDUVV3b-Bi1Dnj2wXk2x_jMr9Tnq7bRuDSYZtirR_ykncCpck9UkOo_Y5akH-KhcBItWbmgJ6HawFqM55lnCRdJ3vjgdvsKMpOfsfUPGuhIt3ZH5tB3sV5Gw83gtOb4-ZuFQTv"
  },
  {
    title: "Reference Materials",
    desc: "Hardcover legal codes, medical atlases, and handbooks.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdt_g3pPagzNV1P-cj7b087f4rW7xWWEBRjfsOUmo5vQOL4n1ckR1kWc-wGQYeXwsA5h5HX4UBDpLSgRE-ujzdx4C2gS1x89LnqgG8VjXK5AGRsL2vrx0unD5oKv0l-bcphGGfUwQLNWCERyMni-7FlI_eMb9M7_kXZEr29w0dnwKlSaDRiFFR3vzxz36EwkOiCxN8fPYSc0VlsnLa_N9tsBVaZnB3vpm7xcyiJjsatVjpkTW4Li7gFALI1BccdazZLVNLT9RbO_TX"
  }
];
