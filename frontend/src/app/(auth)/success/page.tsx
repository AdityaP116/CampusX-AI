"use client";

// =========================================================
// Success / Welcome Page
// Pixel-perfect conversion of design/1/success
// Confetti is rendered via a simple particle canvas
// =========================================================

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function SuccessPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Confetti effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
    }[] = [];

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const colors = ["#4F46E5", "#4648d4", "#6063ee", "#c3c0ff"];

    const createConfetti = () => {
      for (let i = 0; i < 150; i++) {
        setTimeout(() => {
          particles.push({
            x: Math.random() * canvas.width,
            y: -20,
            size: Math.random() * 8 + 4,
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5,
          });
        }, i * 15);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        if (p.y > canvas.height) {
          particles.splice(i, 1);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    createConfetti();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="bg-background font-sans text-on-background min-h-screen overflow-hidden selection:bg-primary-container selection:text-on-primary-container">
      {/* Header Navigation Shell */}
      <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 h-16 flex items-center px-gutter">
        <div className="max-w-container-max mx-auto w-full flex justify-between items-center">
          <span className="font-bold text-title text-primary">CampusX</span>
          <div className="flex items-center gap-sm">
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-title text-on-surface-variant">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Background Pattern/Texture */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: "radial-gradient(var(--color-primary) 0.5px, transparent 0.5px)", 
            backgroundSize: "24px 24px" 
          }} 
        />
      </div>

      {/* Main Success Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-margin-mobile md:px-lg py-xxl">
        <div className="max-w-[640px] w-full text-center space-y-xl">
          {/* Success Icon Section */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="relative inline-block"
          >
            <div className="rounded-full p-lg bg-surface-container-lowest border border-outline-variant/20 animate-[float_4s_ease-in-out_infinite] shadow-[0_0_40px_rgba(79,70,229,0.2)]">
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-white text-display font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
            </div>
            {/* Mini Floating Orbs */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rounded-full blur-sm opacity-50 animate-pulse" />
            <div className="absolute bottom-4 -left-4 w-6 h-6 bg-tertiary-fixed-dim rounded-full blur-sm opacity-30 animate-pulse delay-700" />
          </motion.div>

          {/* Verification Text */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="space-y-md"
          >
            <h1 className="font-bold text-h1 text-on-surface tracking-tight">
              You&apos;re verified!
            </h1>
            <p className="text-body text-on-surface-variant max-w-md mx-auto">
              Welcome to the <span className="font-semibold text-primary">CampusX</span> community. Your student status has been successfully confirmed.
            </p>
          </motion.div>

          {/* Bento Summary of Actions */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-md mt-xxl"
          >
            {[
              { title: "Buy", icon: "shopping_bag", color: "text-primary", bg: "bg-primary-container/10", desc: "Find discounted gear from fellow students." },
              { title: "Sell", icon: "sell", color: "text-secondary", bg: "bg-secondary-container/10", desc: "List your items in seconds and earn cash." },
              { title: "Exchange", icon: "swap_horiz", color: "text-tertiary", bg: "bg-tertiary-container/10", desc: "Trade textbooks or services easily." },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="bg-white/70 backdrop-blur-md border border-slate-200/50 p-lg rounded-xl text-left hover:scale-[1.02] transition-transform duration-300"
              >
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-md`}>
                  <span className={`material-symbols-outlined ${item.color}`}>{item.icon}</span>
                </div>
                <h3 className="font-bold text-body mb-xs">{item.title}</h3>
                <p className="font-medium text-small text-on-surface-variant">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="pt-xl space-y-md"
          >
            <Link 
              href={ROUTES.DASHBOARD}
              className="inline-flex items-center justify-center bg-primary text-on-primary font-bold px-xxl py-md rounded-xl hover:bg-[#4338CA] active:scale-95 transition-all duration-200 shadow-md group"
            >
              Go to Dashboard
              <span className="material-symbols-outlined ml-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
            <div>
              <Link 
                href={ROUTES.PROFILE}
                className="font-medium text-small text-outline hover:text-primary transition-colors duration-200"
              >
                View Profile First
              </Link>
            </div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="pt-xl flex items-center justify-center gap-base"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
            <span className="text-caption text-outline uppercase tracking-wider font-bold">100% Student Verified Environment</span>
          </motion.div>
        </div>

        {/* Background Image Illustration */}
        <div className="hidden lg:block absolute bottom-0 right-0 w-1/3 h-2/3 pointer-events-none opacity-40 mix-blend-multiply">
          <div 
            className="w-full h-full bg-contain bg-bottom bg-no-repeat"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBOpc2W7QXbhiZ9lBdOKG8DKa8SpG_-ONiFo7dMPueYEnNYTJTRuIEnY2Q8OL6lN8LisIhPJAFNP-Cuk8bxm4jOtPBR_JHyuBgFL93tDyA6LPQ8MDe4Jymk8DnKO1cu_ilE4Z5-wxFqRVolawFsSCp7aYBwuzs5nhFB1nghexmx8PsMxSIU3M9hEeC8gpSQ6a7yrPAtrFA2Gx7uGwZRBq8zJqsu34CEg2tSk_hYFCLTP-WI1y94uTFH37sQFrGEVti3VvL_5woyxZg-')" }}
          />
        </div>
      </main>

      {/* Footer Identity */}
      <footer className="absolute bottom-8 w-full text-center z-10">
        <p className="text-caption text-outline-variant">
          © 2024 CampusX. All campus transactions are secured.
        </p>
      </footer>

      {/* Confetti Canvas */}
      <canvas 
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      />
    </div>
  );
}
