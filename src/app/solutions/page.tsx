"use client";

import React from "react";
import { motion } from "framer-motion";
import { Workflow, Cpu, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";

const GlowCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - top}px`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glow-card-container group transition-all duration-500 hover:scale-[1.02] ${className}`}
    >
      {children}
    </div>
  );
};

export default function SolutionsPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-pink-500 selection:text-white transition-colors duration-300">
      <div className="mesh-bg">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="mesh-blob top-[-10%] left-[-10%] bg-pink-500/20" 
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="mesh-blob top-[20%] right-[-10%] bg-purple-600/10" 
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-32 px-6 flex flex-col items-center justify-center min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl w-full mx-auto text-center"
        >
          <span className="inline-block px-4 py-1.5 mb-8 rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-600 text-[10px] font-bold tracking-[0.3em] uppercase">
            Universal Connectivity
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 italic">
            THE ECOSYSTEM.
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 dark:text-white/40 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
            Connect your existing stack in minutes with our pre-built neural bridges.
          </p>
        </motion.div>
      </section>

      {/* Ecosystem Cards */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlowCard className="md:col-span-2 p-12 bg-slate-900 text-white min-h-100 flex flex-col justify-between">
              <div>
                <Workflow className="w-12 h-12 text-pink-500 mb-8" />
                <h3 className="text-4xl font-black mb-4 tracking-tighter italic">NATIVE INTEGRATIONS</h3>
                <p className="text-white/40 max-w-md">Connect your existing stack in minutes with our pre-built neural bridges.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {["AWS", "Azure", "GitHub", "Slack", "Discord", "Terraform", "Kubernetes"].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-white/8 border border-white/20 text-[10px] font-bold tracking-widest">{tag}</span>
                ))}
              </div>
            </GlowCard>
            <GlowCard className="p-12 flex flex-col justify-between">
              <div>
                <Cpu className="w-12 h-12 text-pink-600 mb-8" />
                <h3 className="text-3xl font-black mb-4 tracking-tighter italic">AUTO-SCALING</h3>
                <p className="text-slate-500 dark:text-white/40 text-sm">Dynamic resource allocation based on real-time traffic patterns.</p>
              </div>
              <div className="pt-8 border-t border-slate-100 dark:border-white/15">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[8px] font-bold uppercase tracking-widest">Efficiency</span>
                  <span className="text-pink-600 font-bold">99%</span>
                </div>
                <div className="w-full h-1 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "99%" }}
                    className="h-full bg-pink-600" 
                  />
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 italic">Ready to Integrate?</h2>
          <p className="text-slate-500 dark:text-white/40 mb-12 text-lg">Start connecting to our ecosystem today. No configuration needed.</p>
          <button className="px-10 py-5 bg-pink-600 text-white font-black text-xs tracking-[0.2em] uppercase rounded-full hover:bg-pink-700 transition-colors inline-flex items-center gap-3">
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>
    </main>
  );
}
