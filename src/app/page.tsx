"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { 
  BrainCircuit, 
  Shield, 
  Zap, 
  ArrowRight, 
  Rocket, 
  BarChart3, 
  Globe,
  Send,
  MessageSquare,
  Users,
  ChevronDown,
  Lock,
  Cpu,
  Workflow
} from "lucide-react";
const NeuralNetwork = dynamic(() => import("@/components/neural-network").then(m => m.NeuralNetwork), { ssr: false, loading: () => null });
const GlobalNetwork = dynamic(() => import("@/components/global-network").then(m => m.GlobalNetwork), { ssr: false, loading: () => null });
const Terminal = dynamic(() => import("@/components/terminal").then(m => m.Terminal), { ssr: false, loading: () => null });

const GlowCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

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

export default function Home() {
  const containerRef = useRef(null);
  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);
  const shouldReduceMotion = useReducedMotion();
  const [motionAllowed] = useState(() => {
    if (typeof window === "undefined") return true;
    const prefersReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const device = navigator as Navigator & { deviceMemory?: number };
    const lowMemory = device.deviceMemory && device.deviceMemory < 2;
    return !(prefersReduce || lowMemory || shouldReduceMotion);
  });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollYSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax values for a high-motion feel
  const heroY = useTransform(scrollYSpring, [0, 0.2], [0, -150]);
  const textY = useTransform(scrollYSpring, [0, 0.2], [0, 100]);
  const gridRotate = useTransform(scrollYSpring, [0, 0.2], [60, 45]);
  const blobX = useTransform(scrollYSpring, [0, 0.5], [0, 200]);
  const cursorXSpring = useSpring(cursorX, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const cursorYSpring = useSpring(cursorY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const footerLinkMap: Record<string, string> = {
    Technology: "#technology",
    Architecture: "#about",
    Security: "#services",
    Scale: "#services",
    Documentation: "#technology",
    "Vision Paper": "#about",
    "API Status": "#contact",
    GitHub: "https://github.com",
    About: "#about",
    Careers: "#contact",
    Press: "#contact",
    Contact: "#contact",
  };

  useEffect(() => {
    // Respect user preference and low-memory devices; motionAllowed is precomputed
    if (!motionAllowed) return;
    let frameId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (frameId !== 0) return;
      frameId = requestAnimationFrame(() => {
        cursorX.set(e.clientX - 400);
        cursorY.set(e.clientY - 400);
        frameId = 0;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameId !== 0) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [cursorX, cursorY, shouldReduceMotion, motionAllowed]);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-pink-500 selection:text-white transition-colors duration-300">
      {/* High-End Special Effect: Animated Mesh Background */}
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
        <motion.div 
          animate={{ 
            x: [0, 50, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="mesh-blob bottom-[-10%] left-[20%] bg-orange-400/10" 
        />
      </div>

      {/* Special Element: Cursor Follow Glow */}
      <motion.div 
        className="cursor-glow fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />

      {/* Background 3D Floating Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ x: blobX }}
          className="absolute top-[5%] left-[0%] w-150 h-150 bg-linear-to-br from-pink-500/5 to-purple-600/5 blur-[120px] rounded-full" 
        />
        
        {/* Abstract Grid Floor with Scroll Rotation */}
        <motion.div 
          style={{ rotateX: gridRotate }}
          className="absolute top-[20%] left-0 right-0 h-full perspective-grid opacity-30 z-0 origin-center" 
        />
        <div className="scanline" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-56 pb-40 px-6 flex flex-col items-center justify-center min-h-screen">
        <motion.div style={{ y: heroY }} className="max-w-6xl w-full mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 0.99 : 0.95, rotateX: shouldReduceMotion ? 0 : 6 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-600 text-[10px] font-bold tracking-[0.3em] uppercase">
              Next-Gen Tech Architecture
            </span>

            <div className="relative">
              <div className="overflow-hidden mb-8">
                <motion.h1
                  initial={{ y: shouldReduceMotion ? 0 : "100%", skewY: shouldReduceMotion ? 0 : 10 }}
                  animate={{ y: 0, skewY: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="text-5xl md:text-[100px] lg:text-[120px] font-black tracking-tighter leading-[0.85] text-shimmer"
                >
                  LIMITLESS
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-12">
                <motion.h1
                  initial={{ y: shouldReduceMotion ? 0 : "100%", skewY: shouldReduceMotion ? 0 : 10 }}
                  animate={{ y: 0, skewY: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="text-5xl md:text-[100px] lg:text-[120px] font-black tracking-tighter leading-[0.85] accent-gradient"
                >
                  INNOVATION
                </motion.h1>
              </div>
            </div>

            {motionAllowed && (
              <motion.div
                style={{ x: cursorXSpring, y: cursorYSpring }}
                className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20"
                aria-hidden
              >
                <div className="w-full h-full cursor-glow-inner" />
              </motion.div>
            )}

            <motion.p
              style={{ y: textY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 1, delay: 0.6 }}
              className="text-lg md:text-2xl text-slate-500 dark:text-white/40 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
            >
              Velsaim is engineering the future of digital ecosystems through advanced AI, quantum-ready security, and hyper-scalable infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button className="magnetic-button group relative overflow-hidden w-full sm:w-auto px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xs tracking-[0.2em] uppercase rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                <span className="relative z-10">Explore Our Tech</span>
                <motion.div
                  className="absolute inset-0 bg-pink-600 z-0"
                  initial={{ x: shouldReduceMotion ? 0 : "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ type: "tween", ease: "circOut" }}
                />
              </button>
              <button className="magnetic-button w-full sm:w-auto px-10 py-5 glass-card font-black text-xs tracking-[0.2em] uppercase rounded-full border border-slate-200 dark:border-white/20 text-foreground">
                Watch Vision Film
              </button>
            </motion.div>

            {/* New Hero Terminal Element */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-24"
            >
              <Terminal />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trusted By Section & Security Bar */}
      <section className="relative z-10 py-20 px-6 overflow-hidden bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-white/15">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400 mb-12">Pioneering with global leaders</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              {["SPACE X", "PALANTIR", "OPENAI", "ANTHROPIC", "DEEPMIND"].map((brand) => (
                <span key={brand} className="text-xl md:text-2xl font-black italic tracking-tighter">{brand}</span>
              ))}
            </div>
          </div>
          
          {/* Security & Compliance Bar */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 pt-16 border-t border-slate-200 dark:border-white/15 opacity-40">
            {[
              { label: "SOC2 TYPE II", icon: <Lock className="w-4 h-4" /> },
              { label: "GDPR COMPLIANT", icon: <Shield className="w-4 h-4" /> },
              { label: "ISO 27001", icon: <Lock className="w-4 h-4" /> },
              { label: "HIPAA READY", icon: <Shield className="w-4 h-4" /> },
            ].map((cert, i) => (
              <div key={i} className="flex items-center gap-2">
                {cert.icon}
                <span className="text-[9px] font-bold tracking-widest">{cert.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem / Integrations Bento Grid */}
      <section id="solutions" className="relative z-10 py-48 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-pink-600 text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Universal Connectivity</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic">THE ECOSYSTEM.</h2>
          </div>

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

      {/* Neural Infrastructure / Architecture Section */}
      <section id="about" className="relative z-10 py-48 px-6 bg-slate-900 text-white overflow-hidden">
        <NeuralNetwork />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <span className="text-pink-500 text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">The Neural Fabric</span>
              <h2 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tighter leading-[0.85] mb-12 italic max-w-[8.8ch]">CORE<br />ARCHITECTURE</h2>
              <p className="text-white/60 text-xl leading-relaxed mb-12 max-w-lg">
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
            
            <div className="grid grid-cols-2 gap-6 lg:mt-40">
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

      {/* Testimonials */}
      <section className="relative z-10 py-48 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none italic mb-8">INSIGHTS FROM THE EDGE</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                text: "Velsaim's infrastructure allowed us to scale our LLM deployments from zero to millions of users in days, not months. Their neural balancing is magic.",
                author: "Sarah Chen",
                role: "CTO, NeuralPath"
              },
              {
                text: "The security layer provided by Quantum Lock is the first time I've felt confident in moving our government-level datasets to the cloud.",
                author: "Marcus Thorne",
                role: "Security Director, Aeon Global"
              }
            ].map((t, i) => (
              <GlowCard key={i} className="p-16">
                <MessageSquare className="text-pink-600 mb-8 w-12 h-12" />
                <p className="text-xl italic font-medium mb-12 text-foreground">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <h4 className="text-lg font-black tracking-tighter">{t.author}</h4>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400">{t.role}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-48 px-6 bg-slate-50 dark:bg-slate-950/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic leading-[0.9] mb-12">TALK TO AN<br />EXPERT.</h2>
              <p className="text-slate-500 dark:text-white/40 text-lg mb-12">
                Ready to redefine your infrastructure? Our engineers are ready to build the future with you.
              </p>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-600">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">HQ</p>
                    <p className="text-sm font-black">Singapore, Asia-Pacific</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-600">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Email</p>
                    <p className="text-sm font-black">hello@velsaim.io</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-12">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Full Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-slate-200 dark:border-white/20 py-4 focus:border-pink-500 outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Company Email</label>
                  <input type="email" className="w-full bg-transparent border-b border-slate-200 dark:border-white/20 py-4 focus:border-pink-500 outline-none transition-colors" placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Message</label>
                  <textarea className="w-full bg-transparent border-b border-slate-200 dark:border-white/20 py-4 focus:border-pink-500 outline-none transition-colors resize-none h-32" placeholder="Tell us about your project" />
                </div>
                <button className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xs tracking-[0.3em] uppercase rounded-full flex items-center justify-center gap-4 group">
                  Send Inquiry <Send className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="relative z-10 py-36 md:py-44 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 max-w-3xl">
              <span className="text-pink-600 text-[10px] font-bold tracking-[0.4em] uppercase mb-5 block">Omnipresent Infrastructure</span>
              <h2 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.92] text-foreground italic max-w-[10ch]">GLOBAL REACH.</h2>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-card p-8 md:p-10 border border-slate-200 dark:border-white/20">
                <p className="text-slate-500 dark:text-white/60 text-lg leading-relaxed mb-8">
                  Our neural mesh spans 6 continents, ensuring your users are never more than 1ms away from your application.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-50 dark:bg-white/8 border border-slate-200 dark:border-white/20 p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-white/50">Regions</p>
                    <p className="text-2xl font-black mt-2">24</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 dark:bg-white/8 border border-slate-200 dark:border-white/20 p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-white/50">Avg Latency</p>
                    <p className="text-2xl font-black mt-2">0.82ms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-[56px] border border-slate-200 dark:border-white/25 dark:bg-slate-950/60 bg-linear-to-br from-slate-950/70 via-slate-950/40 to-slate-900/10 p-3 md:p-4 shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
            <GlobalNetwork />
          </div>
        </div>
      </section>

      {/* Technology Section with Glow Cards */}
      <section id="technology" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8"
          >
            <div className="max-w-2xl">
              <span className="text-pink-600 text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Core Capabilities</span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-foreground italic">FLUID MOTION</h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
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
                title: "Velocity OS", 
                desc: "The world's fastest edge computing operating system.",
                tag: "Performance"
              }
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <GlowCard className="p-12 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/10 flex items-center justify-center mb-10 group-hover:bg-pink-600 group-hover:text-white transition-all duration-500 text-pink-600">
                    {tech.icon}
                  </div>
                  <span className="text-pink-600 text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">{tech.tag}</span>
                  <h3 className="text-3xl font-bold mb-4 tracking-tight text-foreground">{tech.title}</h3>
                  <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed mb-8">{tech.desc}</p>
                  <button className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase hover:gap-4 transition-all text-foreground">
                    Documentation <ArrowRight className="w-4 h-4" />
                  </button>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid with Polygon Mask */}
      <section id="services" className="relative z-10 py-48 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div 
              initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative group"
            >
              <GlowCard className="aspect-video relative overflow-hidden flex items-center justify-center p-20 bg-slate-900 group-hover:scale-105 transition-transform duration-700">
                <Rocket className="w-40 h-40 text-pink-600 animate-pulse" />
                <motion.div 
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-40 border-white/5 rounded-full filter blur-3xl"
                />
              </GlowCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12 text-foreground italic">FLUID<br />SCALE.</h2>
              <p className="text-slate-500 dark:text-white/40 text-xl mb-12 font-medium leading-relaxed">
                Experience motion-driven infrastructure that adapts as fast as your business moves.
              </p>
              <button className="magnetic-button px-10 py-5 bg-pink-600 text-white font-black text-xs tracking-[0.3em] uppercase rounded-full shadow-lg shadow-pink-500/20">
                Learn Fluidity
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-48 px-6 bg-slate-50 dark:bg-white/1">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic">COMMON QUERIES.</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "How does the neural infrastructure differ from standard cloud?", a: "Unlike static cloud resources, Velsaim uses a neural mesh that predicts traffic spikes before they happen, reallocating compute power across the globe in under 1ms." },
              { q: "Is Quantum Lock compatible with existing legacy systems?", a: "Yes. Quantum Lock acts as a transparent proxy layer that can be integrated with existing TLS/SSL flows without code changes." },
              { q: "What regions are currently supported?", a: "We currently have 24 high-performance regions globally, with 12 more coming in late 2026." },
              { q: "How is billing calculated?", a: "Billing is based on 'Neural Compute Units' (NCUs) which combine CPU, Memory, and Network into a single, predictable metric." }
            ].map((faq, i) => (
              <details key={i} className="group glass-card p-8 cursor-pointer">
                <summary className="flex justify-between items-center list-none">
                  <h4 className="text-lg font-black tracking-tighter italic">{faq.q}</h4>
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-6 text-slate-500 dark:text-white/40 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-40 px-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glow-card-container py-24 px-12 text-center relative overflow-hidden bg-slate-950 border border-white/5 shadow-2xl"
        >
          {/* Refined subtle gradient instead of harsh pink */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(121,40,202,0.15),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,0,128,0.05),transparent_50%)] pointer-events-none" />
          
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none text-white italic">Ready for the future?</h2>
          <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto font-medium">
            Join the ranks of the world&apos;s most innovative companies building on Velsaim&apos;s neural infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="magnetic-button px-12 py-5 bg-white text-black font-black text-[10px] tracking-[0.3em] uppercase rounded-full hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
              Build Now
            </button>
            <button className="magnetic-button px-12 py-5 border border-white/10 bg-white/5 font-black text-[10px] tracking-[0.3em] uppercase rounded-full hover:bg-white/10 transition-all text-white backdrop-blur-sm">
              Talk to Expert
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-32 px-6 border-t border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-24 mb-24">
          <div className="col-span-1 md:col-span-1">
            <motion.div 
              whileHover={{ x: 10, scale: 1.05 }}
              className="mb-8 cursor-pointer"
            >
              <h2 className="text-3xl font-black tracking-tighter mb-2 italic text-foreground">VELSAIM</h2>
              <p className="text-[10px] text-pink-600 uppercase tracking-[0.4em] font-bold">Limitless Innovation</p>
            </motion.div>
          </div>
          
          {[
            { title: "Platform", links: ["Technology", "Architecture", "Security", "Scale"] },
            { title: "Resources", links: ["Documentation", "Vision Paper", "API Status", "GitHub"] },
            { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
          ].map((col, i) => (
            <div key={i}>
              <h5 className="text-[10px] text-slate-400 dark:text-white/20 uppercase tracking-[0.4em] font-bold mb-10">{col.title}</h5>
              <ul className="flex flex-col gap-6">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <motion.a
                      whileHover={{ x: 10 }}
                      href={footerLinkMap[link] ?? "#contact"}
                      target={link === "GitHub" ? "_blank" : undefined}
                      rel={link === "GitHub" ? "noopener noreferrer" : undefined}
                      className="inline-block text-slate-500 dark:text-white/40 hover:text-pink-600 dark:hover:text-pink-500 text-xs font-bold transition-colors"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto pt-12 border-t border-slate-100 dark:border-white/5 text-center">
          <p className="text-[10px] text-slate-400 dark:text-white/20 font-bold tracking-[0.3em] uppercase">© 2026 Velsaim Inc. Innovation for the next century.</p>
        </div>
      </footer>
    </main>
  );
}
