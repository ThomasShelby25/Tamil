"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Shield, Zap, Lock, Cpu, Workflow } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function TechnologyPage() {
  const technologies = [
    { 
      icon: <BrainCircuit className="w-8 h-8" />, 
      title: "Neural Engine X", 
      desc: "Adaptive AI that evolves with your data patterns in real-time.",
      tag: "Artificial Intelligence"
    },
    { 
      icon: <Shield className="w-8 h-8" />, 
      title: "Quantum Lock", 
      desc: "Post-quantum cryptographic security for the most sensitive data layers.",
      tag: "Security"
    },
    { 
      icon: <Zap className="w-8 h-8" />, 
      title: "Lightning Protocol", 
      desc: "Sub-millisecond latency networking optimized for edge computing.",
      tag: "Performance"
    },
    { 
      icon: <Lock className="w-8 h-8" />, 
      title: "Mesh Security", 
      desc: "Zero-trust architecture with real-time threat detection.",
      tag: "Protection"
    },
    { 
      icon: <Cpu className="w-8 h-8" />, 
      title: "Neural Allocator", 
      desc: "Dynamic resource allocation powered by machine learning.",
      tag: "Optimization"
    },
    { 
      icon: <Workflow className="w-8 h-8" />, 
      title: "Auto-Orchestration", 
      desc: "Autonomous container and serverless workload management.",
      tag: "Automation"
    },
  ];

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
            Core Capabilities
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 italic">
            FLUID MOTION
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 dark:text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
            Six cutting-edge technologies powering the next generation of digital infrastructure.
          </p>
        </motion.div>
      </section>

      {/* Technology Grid */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/2 hover:border-pink-600 dark:hover:border-pink-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/10 flex items-center justify-center mb-6 group-hover:bg-pink-600 group-hover:text-white transition-all duration-500 text-pink-600">
                  {tech.icon}
                </div>
                <span className="inline-block text-[8px] font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400 mb-3">{tech.tag}</span>
                <h3 className="text-2xl font-black mb-3 italic">{tech.title}</h3>
                <p className="text-slate-600 dark:text-white/60">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="relative z-10 py-32 px-6 bg-slate-50 dark:bg-slate-950/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-24 italic text-center">
            Performance Benchmarks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Global Latency", value: "0.82ms", icon: "⚡" },
              { label: "Uptime SLA", value: "99.999%", icon: "🛡️" },
              { label: "Data Centers", value: "24", icon: "🌍" },
              { label: "Active Users", value: "2M+", icon: "👥" },
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl border border-slate-200 dark:border-white/10"
              >
                <div className="text-4xl mb-4">{metric.icon}</div>
                <div className="text-3xl font-black mb-2">{metric.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/50">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
