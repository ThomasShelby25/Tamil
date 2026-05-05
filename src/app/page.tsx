"use client";

import React, { useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Terminal = dynamic(() => import("@/components/terminal").then(m => m.Terminal), { ssr: false, loading: () => null });

export default function Home() {
  const scrollYSpring = useSpring(0, { stiffness: 100, damping: 30 });
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      scrollYSpring.set(Math.min(latest / (document.documentElement.scrollHeight - window.innerHeight), 1));
    });
    return () => unsubscribe();
  }, [scrollY, scrollYSpring]);

  const heroY = useTransform(scrollYSpring, [0, 0.2], [0, -150]);
  const textY = useTransform(scrollYSpring, [0, 0.2], [0, 100]);
  const blobX = useTransform(scrollYSpring, [0, 0.5], [0, 200]);

  return (
    <div className="relative w-full bg-white dark:bg-slate-950 overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden px-6 scroll-mt-20">
        {/* Animated Mesh Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div 
              style={{ y: blobX }}
              className="absolute top-[10%] left-[10%] w-96 h-96 rounded-full bg-pink-600 opacity-20 blur-3xl"
            />
            <motion.div 
              style={{ y: blobX }}
              className="absolute top-[50%] right-[5%] w-96 h-96 rounded-full bg-blue-600 opacity-10 blur-3xl"
            />
          </div>
        </div>

        {/* Content */}
        <motion.div style={{ y: heroY }} className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Logo/Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-block"
          >
            <div className="glass-card px-6 py-3 rounded-full border border-pink-500/20 bg-pink-500/5 text-[10px] font-bold tracking-[0.3em] uppercase text-pink-600">
              The Neural Fabric
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ y: textY }}
            className="text-5xl md:text-8xl font-black mb-8 tracking-tighter italic uppercase text-slate-900 dark:text-white leading-[0.85]"
          >
            LIMITLESS
            <br />
            INNOVATION
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto font-medium"
          >
            Experience the future of cloud infrastructure with neural intelligence and quantum-ready security.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <Link href="/solutions" className="magnetic-button group relative overflow-hidden w-full sm:w-auto px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xs tracking-[0.2em] uppercase rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.1)] inline-flex items-center justify-center gap-3 hover:scale-105 transition-transform">
              <span className="relative z-10">Explore Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/architecture" className="magnetic-button w-full sm:w-auto px-10 py-5 glass-card font-black text-xs tracking-[0.2em] uppercase rounded-full border border-slate-200 dark:border-white/20 text-foreground inline-flex items-center justify-center gap-3 hover:scale-105 transition-transform">
              <span>View Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Terminal Demo */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <Terminal />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-6 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic mb-6 text-slate-900 dark:text-white">
              What We Offer
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Explore our complete platform designed for modern infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Solutions", 
                description: "Enterprise integrations with AWS, Azure, Kubernetes, and more",
                href: "/solutions"
              },
              { 
                title: "Architecture", 
                description: "Global infrastructure with <1ms latency and 99.999% uptime",
                href: "/architecture"
              },
              { 
                title: "Technology", 
                description: "Neural engine, quantum lock, and advanced security protocols",
                href: "/technology"
              },
              { 
                title: "Support", 
                description: "Expert guidance and 24/7 enterprise support",
                href: "/contact"
              }
            ].map((feature, i) => (
              <Link
                key={i}
                href={feature.href}
                className="group glass-card p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-2xl font-black mb-3 tracking-tighter italic text-slate-900 dark:text-white group-hover:text-pink-600">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-pink-600 font-bold text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
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
          className="max-w-5xl mx-auto glass-card py-24 px-12 text-center relative overflow-hidden bg-slate-950 border border-white/5 shadow-2xl rounded-3xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(121,40,202,0.15),transparent_50%)] pointer-events-none" />
          
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none text-white italic">
            Ready for the future?
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto font-medium">
            Join innovative companies building on Velsaim&apos;s neural infrastructure. Get started today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact" className="magnetic-button px-12 py-5 bg-white text-black font-black text-xs tracking-[0.3em] uppercase rounded-full hover:scale-105 transition-transform shadow-lg">
              Get Started
            </Link>
            <Link href="/technology" className="magnetic-button px-12 py-5 border border-white/20 bg-white/5 font-black text-xs tracking-[0.3em] uppercase rounded-full hover:bg-white/10 transition-all text-white backdrop-blur-sm hover:scale-105">
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-black mb-4 italic text-slate-900 dark:text-white">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/solutions" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">Solutions</Link></li>
                <li><Link href="/architecture" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">Architecture</Link></li>
                <li><Link href="/technology" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">Technology</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-black mb-4 italic text-slate-900 dark:text-white">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">Contact</Link></li>
                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">About</a></li>
                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-black mb-4 italic text-slate-900 dark:text-white">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">API Status</a></li>
                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-black mb-4 italic text-slate-900 dark:text-white">Follow</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">GitHub</a></li>
                <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-slate-600 dark:text-slate-400">© 2024 Velsaim. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">Privacy</a>
              <a href="#" className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">Terms</a>
              <a href="#" className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
