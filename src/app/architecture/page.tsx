"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Globe, Zap, Users, BarChart3 } from "lucide-react";
import { Navbar } from "@/components/navbar";

const NeuralNetwork = dynamic(() => import("@/components/neural-network").then(m => m.NeuralNetwork), { ssr: false, loading: () => null });

export default function ArchitecturePage() {
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
            The Neural Fabric
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 italic">
            CORE<br />ARCHITECTURE
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 dark:text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
            Self-healing neural nodes that anticipate load and reconfigure in milliseconds.
          </p>
        </motion.div>
      </section>

      {/* Architecture Details */}
      <section className="relative z-10 py-32 px-6 bg-slate-900 text-white">
        <NeuralNetwork />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.85] mb-12 italic">
                Autonomous Infrastructure
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-lg">
                Our infrastructure is built on self-healing neural nodes that anticipate load and reconfigure in milliseconds, providing the first truly autonomous cloud environment.
              </p>
              <div className="space-y-6">
                {[
                  "Global Low-Latency Mesh",
                  "Auto-Scaling Quantum Security",
                  "Native AI Integration Layers"
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-pink-500 rounded-full" />
                    <span className="text-xs font-bold tracking-widest uppercase">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Globe />, label: "Regions", val: "24" },
                { icon: <Zap />, label: "Latency", val: "<1ms" },
                { icon: <Users />, label: "Users", val: "2M+" },
                { icon: <BarChart3 />, label: "Growth", val: "400%" },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white/8 border border-white/20 rounded-3xl hover:bg-white/15 transition-colors">
                  <div className="text-pink-500 mb-4">{item.icon}</div>
                  <div className="text-3xl font-black mb-1 tracking-tighter">{item.val}</div>
                  <div className="text-[8px] font-bold tracking-[0.2em] uppercase text-white/40">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-24 italic text-center">
            Why Choose Our Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Zero Downtime",
                desc: "Self-healing nodes ensure 99.999% uptime with automatic failover."
              },
              {
                title: "Predictive Scaling",
                desc: "AI-powered load forecasting scales infrastructure before demand spikes."
              },
              {
                title: "Quantum Ready",
                desc: "Post-quantum cryptography built-in for future-proof security."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/2"
              >
                <h3 className="text-2xl font-black mb-4 italic">{feature.title}</h3>
                <p className="text-slate-600 dark:text-white/60">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
