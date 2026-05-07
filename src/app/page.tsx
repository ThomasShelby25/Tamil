"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { ArrowRight, Globe, Zap, Shield, BarChart3, Wallet, Cpu } from "lucide-react";
import Link from "next/link";
import { BentoGrid, BentoCard } from "@/components/bento-grid";
import { useMetrics } from "@/hooks/useMetrics";

const HeroGlobe = dynamic(() => import("@/components/hero-globe").then(m => m.HeroGlobe), { 
  ssr: false, 
  loading: () => <div className="absolute inset-0 bg-slate-950" /> 
});

const defaultStats = [
  { label: "Global Users", value: "Loading...", icon: <Globe className="w-4 h-4" /> },
  { label: "Transactions", value: "Loading...", icon: <Wallet className="w-4 h-4" /> },
  { label: "Uptime", value: "Loading...", icon: <Zap className="w-4 h-4" /> },
  { label: "Security Score", value: "Loading...", icon: <Shield className="w-4 h-4" /> },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { metrics, loading, error } = useMetrics();

  const stats = [
    { label: "Global Users", value: metrics?.globalUsers || defaultStats[0].value, icon: <Globe className="w-4 h-4" /> },
    { label: "Transactions", value: metrics?.transactions || defaultStats[1].value, icon: <Wallet className="w-4 h-4" /> },
    { label: "Uptime", value: metrics?.uptime || defaultStats[2].value, icon: <Zap className="w-4 h-4" /> },
    { label: "Security Score", value: metrics?.securityScore || defaultStats[3].value, icon: <Shield className="w-4 h-4" /> },
  ];
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-slate-950 text-white selection:bg-purple-500/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <HeroGlobe />
        
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-block"
          >
            <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400">
              The Future of Finance
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 md:mb-8 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent"
          >
            Cross-border
            <br />
            finance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 md:mb-10 max-w-2xl mx-auto px-4 sm:px-6"
          >
            Empowering global businesses with seamless, secure, and instant 
            financial infrastructure powered by neural intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4"
          >
            <Link href="/get-started" className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 text-sm sm:text-base text-center">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity" />
            </Link>
            <Link href="/docs" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-white/10 hover:bg-white/5 font-bold rounded-full transition-all text-sm sm:text-base text-center">
              Documentation
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest text-slate-500">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent" />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative py-16 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4"
          >
            Built for the next generation.
          </motion.h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Everything you need to manage global capital in one unified platform.
          </p>
        </div>

        <BentoGrid>
          <BentoCard
            title="Real-time Settlements"
            description="Move money across borders in seconds, not days. Our neural network optimizes routing for maximum speed."
            icon={<Zap className="w-8 h-8" />}
            className="md:col-span-2"
          />
          <BentoCard
            title="Neural Security"
            description="Enterprise-grade encryption with AI-driven fraud detection."
            icon={<Shield className="w-8 h-8" />}
          />
          <BentoCard
            title="Global Compliance"
            description="Built-in KYC/AML and multi-jurisdictional compliance out of the box."
            icon={<BarChart3 className="w-8 h-8" />}
          />
          <BentoCard
            title="Unified API"
            description="One simple integration to access all global payment rails and financial instruments."
            icon={<Cpu className="w-8 h-8" />}
            className="md:col-span-2"
          />
        </BentoGrid>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-32 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {error && (
            <div className="mb-6 md:mb-8 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs sm:text-sm">
              Using mock data. Real-time data unavailable.
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3 md:mb-4 text-purple-500 text-lg md:text-2xl">{stat.icon}</div>
                <div className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tighter ${loading ? "animate-pulse text-slate-600" : ""}`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-40 px-4 sm:px-6 text-center overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/5 blur-3xl rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 md:mb-8">
            Ready to scale?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mb-6 md:mb-10">
            Join thousands of teams building on the future of financial infrastructure.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 sm:px-10 py-3 sm:py-5 bg-purple-600 hover:bg-purple-500 text-white text-sm sm:text-base font-bold rounded-full transition-all hover:scale-105 active:scale-95">
            Start Building Now <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-0 md:flex-row md:justify-between md:items-center">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-bold italic text-sm">V</div>
             <span className="font-bold tracking-tighter text-lg md:text-xl italic uppercase">Velsaim</span>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-8 text-xs sm:text-sm text-slate-500 justify-center md:justify-start">
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 text-center md:text-right">© 2026 Velsaim. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
