"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X, ArrowUpRight, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Solutions", href: "/solutions" },
    { name: "Architecture", href: "/architecture" },
    { name: "Technology", href: "/technology" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 glass-nav"
    >
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="logo-filter transition-all duration-500">
            <Image 
              src="/3.png" 
              alt="VELSAIM Logo" 
              width={180} 
              height={48} 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </div>
        </Link>
      </div>
      
      <div className="hidden lg:flex items-center gap-10">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-xs font-bold tracking-[0.2em] uppercase"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {/* System Status Indicator */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[9px] font-bold tracking-widest text-slate-500 dark:text-white/40 uppercase">Systems Operational</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white"
          aria-label="Toggle theme"
        >
          <SunMoon className="w-5 h-5" />
        </button>

        <button className="hidden sm:flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-bold tracking-widest uppercase rounded-full hover:opacity-90 transition-all hover:scale-105">
          Get Started <ArrowUpRight className="w-3 h-3" />
        </button>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white lg:hidden z-50"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 bg-white dark:bg-slate-950 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-black tracking-tighter hover:text-pink-600 transition-colors dark:text-white"
            >
              {link.name}
            </Link>
          ))}
          <button className="mt-8 px-12 py-5 bg-pink-600 text-white text-xs font-bold tracking-widest uppercase rounded-full">
            Get Started
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};

