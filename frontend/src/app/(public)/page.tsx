"use client";

// =========================================================
// Landing Page — Public route
// Pixel-perfect conversion of design/1/landing_page/code.html
// Uses Framer Motion for all animations from the Stitch design
// =========================================================

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/constants/routes";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import TopNav from "@/components/common/TopNav";
import Footer from "@/components/common/Footer";

const CATEGORY_CARDS = [
  {
    id: "electronics",
    title: "Electronics",
    subtitle: "Laptops, tablets, and high-performance gear.",
    badge: "Most Popular",
    badgeClass: "bg-primary/20 text-primary-fixed",
    colSpan: "md:col-span-2 md:row-span-2",
    titleClass: "text-h2",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBP2LkoXVKPEd8U86o1uArfora8TwsH-27h43bsnKjzYY4x2rSBhPyGHAjDjDRm6XHj1nzY71OLlqLgDnn-620SZ0GKbQgh9Cy-lztkLcuG672PJG1vazW4KSlPhLGflPtQZsnKY_ew1KRwA0bMRMZecazDPCDxXiEH2n-JDaYVvA7CBplPqDIzf5H9bo8eFpJF1un07WwVoOLXLyYPSasPFcNeqnRiM1eUT0EjJbijHkTKq5ezgSPyfqwI2iWBP4sbDn9m7o7xbz79",
    padding: "p-8",
  },
  {
    id: "textbooks",
    title: "Academic Resources",
    subtitle: "Textbooks, notes, and lab equipment.",
    badge: null,
    badgeClass: "",
    colSpan: "md:col-span-2 md:row-span-1",
    titleClass: "text-h3",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCeltbdC7To5NVImpbIq_-JOjRs2iol_x6Ms1z6--viiTyyMnxoyuIqG4Tz1lXkhpyHkS7XRviXP5uNnowN_AThh-xLhjNgcifZiat_HQl_EUODJLLBkXgyVXpAipbXvN4-aCrYpqT9zrSh-OWzmJg360EcARyLVIZVa3ZzFr5R6vnMkueNVQ3hE8JI2t5qEpW6pPm_L9jQp3Zr855dCcn0tYVu_3BnF9pb3r8jG_pQ7YNAETYyPrFDgcdUopmwUXinkvtUX4Yup3_u",
    padding: "p-8",
  },
  {
    id: "rentals",
    title: "Campus Rentals",
    subtitle: null,
    badge: null,
    badgeClass: "",
    colSpan: "md:col-span-1 md:row-span-1",
    titleClass: "text-title",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQjNfm5Z07l7_vGRnbgS43hQIs1ceGctn6T3pY1y6soo2Wt3JZ3VPKWZFszGDIUhgPYhAT9P46fJzKzTNq1PUbXqieo4ioPcnUK9dFLXBqBWGwc6ehlBqYJEZY6mvSUEWmD2jfWaEhawQZX3ck6nYMGL-GEQwAcf-DDkYwyOjYxtbMXXyoAEZiR8JY5GO5cYqRzpNny8OcYsvbUN7GQy77KsJnLu9ThpbfBmnGKgS_X4pZGiwlm6s8IW--G5fCr8fi09l2Fq72w-uP",
    padding: "p-6",
  },
  {
    id: "services",
    title: "Student Services",
    subtitle: null,
    badge: null,
    badgeClass: "",
    colSpan: "md:col-span-1 md:row-span-1",
    titleClass: "text-title",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjAO8UG0fsbF_fsLTue8Ab-wiupl388OiCRbSrAmvjuqwxFv8IEp1G367RRJRzLjkaPKgLO9sRQhXYQijJp1ZJZQzCxJ0S2-8cqJD36dMsap6Ma4j6HI7E1Pplre4XPhfZgqDyVpNUz7nAu0o-QcB6jYsUPyRZxsjc1MWAZXrkeDmtUIRpAfp-Jv3BDRPtEekbDudrod9NbOo6uaXN9AhVMQTQ83fAXrcaeQHldLKtTNlXxSRGDU_5nR14nR8FSGTjeGbcebwES7_e",
    padding: "p-6",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "person_check",
    title: "1. Verify Identity",
    description:
      "Connect your university email to unlock the platform. We ensure every user is a legitimate student at your campus.",
    iconBg: "bg-primary-container",
    iconColor: "text-on-primary-container",
  },
  {
    step: "02",
    icon: "add_shopping_cart",
    title: "2. List or Discover",
    description:
      "Post your items with high-res photos or browse the curated feed of premium student listings in your area.",
    iconBg: "bg-secondary-container",
    iconColor: "text-on-secondary-container",
  },
  {
    step: "03",
    icon: "handshake",
    title: "3. Meet & Exchange",
    description:
      "Coordinate a secure on-campus meeting. Complete your transaction with confidence using our safe meeting zones.",
    iconBg: "bg-tertiary-container",
    iconColor: "text-on-tertiary",
  },
];

const TRUST_FEATURES = [
  {
    icon: "verified_user",
    title: ".edu Email Verification",
    description: "Mandatory university email check for every single account.",
  },
  {
    icon: "gpp_good",
    title: "Verified Meet-up Spots",
    description:
      "Suggested public, well-lit campus locations for every trade.",
  },
  {
    icon: "reviews",
    title: "Peer Review System",
    description: "Build your reputation within the student community.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-on-background overflow-x-hidden">
      {/* Top Navigation */}
      <TopNav variant="public" />

      <main className="relative pt-16">
        {/* ═══════════ Hero Section ═══════════ */}
        <section className="relative min-h-[921px] flex flex-col justify-center items-center px-gutter py-xxl hero-gradient">
          <div className="max-w-4xl w-full text-center space-y-8">
            {/* Verified badge */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline-variant/30 rounded-full mb-4"
            >
              <span
                className="material-symbols-outlined text-primary text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                verified
              </span>
              <span className="text-small text-on-surface-variant">
                Exclusive to verified university students
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="font-bold text-on-background tracking-tight text-h1-mobile md:text-display leading-tight"
            >
              The Premium Marketplace <br />
              <span className="text-primary">
                for Your Campus.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-h3 text-on-surface-variant max-w-2xl mx-auto font-normal"
            >
              A secure, high-end ecosystem for verified student-to-student
              trading. High-performance utility meets campus community.
            </motion.p>

            {/* Glassmorphic CTA Card */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="relative mt-12 mx-auto max-w-lg"
            >
              {/* Glow effect */}
              <div
                className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[20px] blur opacity-20"
                aria-hidden="true"
              />
              <div className="glass-card relative border border-white/40 p-8 rounded-xl shadow-[var(--shadow-floating)] space-y-6">
                {/* Search + CTA row */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <span
                      className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                      aria-hidden="true"
                    >
                      search
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-none bg-surface/50 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-inner text-body"
                      placeholder="Search textbooks, tech..."
                      type="search"
                      aria-label="Search listings"
                    />
                  </div>
                  <Link
                    href={ROUTES.SELL}
                    className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:bg-secondary transition-colors shadow-[var(--shadow-primary)] text-center whitespace-nowrap"
                  >
                    Post Listing
                  </Link>
                </div>

                {/* Stats row */}
                <div className="flex justify-center gap-8 border-t border-outline-variant/20 pt-6">
                  {[
                    { value: "12k+", label: "Active Students" },
                    { value: "45k+", label: "Total Trades" },
                    { value: "100%", label: "Verified" },
                  ].map((stat, i) => (
                    <div key={stat.label} className="flex flex-col items-center">
                      {i > 0 && (
                        <div className="w-px h-8 bg-outline-variant/20 -ml-4 mr-4" />
                      )}
                      <span className="text-h3 font-bold text-primary">
                        {stat.value}
                      </span>
                      <span className="text-caption text-on-surface-variant">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════ Trending Categories (Bento Grid) ═══════════ */}
        <section
          className="max-w-container-max mx-auto px-gutter py-xxl space-y-12"
          id="marketplace"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <motion.div variants={fadeInUp} className="space-y-2">
              <h2 className="text-h2 font-semibold text-on-background">
                Trending Categories
              </h2>
              <p className="text-body text-on-surface-variant max-w-xl">
                Curated items from top students across campus. Quality checked
                and verified.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link
                href={ROUTES.CATEGORIES}
                className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Browse all categories
                <span className="material-symbols-outlined" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Bento grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]"
          >
            {CATEGORY_CARDS.map((card) => (
              <motion.div
                key={card.id}
                variants={fadeInUp}
                className={`${card.colSpan} relative group overflow-hidden rounded-xl cursor-pointer`}
                style={{ minHeight: 200 }}
              >
                {/* Background image with zoom */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${card.image}')` }}
                  role="img"
                  aria-label={card.title}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Content */}
                <div className={`absolute bottom-0 left-0 ${card.padding} space-y-2`}>
                  {card.badge && (
                    <span
                      className={`inline-block px-3 py-1 ${card.badgeClass} backdrop-blur-md font-medium rounded-full text-small`}
                    >
                      {card.badge}
                    </span>
                  )}
                  <h3 className={`font-bold ${card.titleClass} text-white`}>
                    {card.title}
                  </h3>
                  {card.subtitle && (
                    <p className="text-white/80 text-body">{card.subtitle}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════ How It Works ═══════════ */}
        <section className="bg-surface-container-low py-xxl">
          <div className="max-w-container-max mx-auto px-gutter space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-4"
            >
              <h2 className="text-h2 font-semibold">Simplicity by Design</h2>
              <p className="text-body text-on-surface-variant max-w-2xl mx-auto">
                Trading on campus has never been more refined. Three steps to a
                better marketplace experience.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {HOW_IT_WORKS.map((step) => (
                <motion.div
                  key={step.step}
                  variants={fadeInUp}
                  className="relative group p-8 bg-surface rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 ${step.iconBg} rounded-lg flex items-center justify-center mb-6 ${step.iconColor}`}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      aria-hidden="true"
                    >
                      {step.icon}
                    </span>
                  </div>
                  <h3 className="text-h3 font-semibold mb-4">{step.title}</h3>
                  <p className="text-body text-on-surface-variant leading-relaxed">
                    {step.description}
                  </p>
                  {/* Large step number watermark */}
                  <div
                    className="absolute -top-4 -right-4 text-[80px] font-extrabold text-on-surface/5 select-none leading-none"
                    aria-hidden="true"
                  >
                    {step.step}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════ Trust & Safety ═══════════ */}
        <section className="max-w-container-max mx-auto px-gutter py-xxl">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Left: content */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-1 space-y-8"
            >
              <div className="inline-block px-3 py-1 bg-error-container text-on-error-container font-medium rounded-full text-small">
                Trust First Platform
              </div>
              <h2 className="text-h1 font-bold text-on-background">
                Your Safety is <br /> Our Infrastructure.
              </h2>
              <p className="text-h3 font-normal text-on-surface-variant">
                We built CampusX with a security-first mindset, because trading
                with peers should be stress-free.
              </p>

              <div className="space-y-6">
                {TRUST_FEATURES.map((feature) => (
                  <div key={feature.icon} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-primary"
                        aria-hidden="true"
                      >
                        {feature.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-title font-semibold text-on-surface">
                        {feature.title}
                      </h4>
                      <p className="text-body text-on-surface-variant">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: device mockup */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex-1 relative"
            >
              <div
                className="absolute -inset-4 bg-primary/5 rounded-xl blur-2xl"
                aria-hidden="true"
              />
              <div className="relative bg-surface p-2 rounded-2xl border border-outline-variant/30 shadow-[var(--shadow-floating)] overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4GNtMjxFkqwmSOnwYQhQFONMgukgWEaZRtiAYCZZ4kO2pjybGa3BqE2Q6hmipgDR4L0P4OhVbsHiie3rwwFwmUbtxoYA5liURI5v2XparoqKat3deaWvaykpHTdSd06dlvMNQtHHfHMhZs7t5olcCJH12sfn74Mv_9aiYKdrofGhiVXmB9B3gyiBoLEL4XO0SNdIdUsiAgdv5mZR3M2hgAZPB6PQD1oYQLx78DSDs5CpaXG0xYd6A3qRMcpOHP7pteBFxrTAgy4_D"
                  alt="CampusX verified student profile with ratings and sold listings"
                  width={600}
                  height={500}
                  className="w-full rounded-xl shadow-inner"
                  priority={false}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════ Final CTA ═══════════ */}
        <section className="max-w-container-max mx-auto px-gutter py-xxl mb-xxl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-primary text-on-primary rounded-[32px] p-12 md:p-24 overflow-hidden"
          >
            <div className="relative z-10 max-w-2xl space-y-8">
              <h2 className="text-h1 md:text-display font-bold leading-none">
                Ready to upgrade your campus life?
              </h2>
              <p className="text-on-primary/80 text-h3 font-normal">
                Join thousands of students at your university today. It&apos;s
                time for a better marketplace.
              </p>
              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <Link
                  href={ROUTES.SIGNUP}
                  className="bg-surface text-primary px-10 py-5 rounded-xl font-bold text-title shadow-xl hover:scale-[1.03] active:scale-95 transition-transform text-center"
                >
                  Join Your Campus
                </Link>
                <Link
                  href={ROUTES.MARKETPLACE}
                  className="border-2 border-on-primary/30 text-on-primary px-10 py-5 rounded-xl font-bold text-title hover:bg-on-primary/10 transition-colors text-center"
                >
                  Explore Marketplace
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
