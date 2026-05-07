"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Solutions", href: "/solutions" },
    { name: "Developers", href: "/developers" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-4",
        scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center group">
          <Image
            src="/velsaim.png"
            alt="Velsaim"
            width={804}
            height={175}
            priority
            className="h-8 sm:h-10 md:h-12 w-auto object-contain"
          />
        </Link>
        
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-slate-400 hover:text-white transition-colors text-xs sm:text-sm font-medium tracking-tight"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/login" className="hidden sm:block text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Log in
          </Link>
          <Link 
            href="/get-started" 
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-white text-black text-xs sm:text-sm font-bold rounded-full hover:bg-slate-200 transition-all active:scale-95"
          >
            Get Started
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-400 hover:text-white lg:hidden"
          >
            {isOpen ? <X className="w-5 sm:w-6 h-5 sm:h-6" /> : <Menu className="w-5 sm:w-6 h-5 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-slate-950 border-b border-white/5 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 lg:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg sm:text-2xl font-bold tracking-tight text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
            <Link href="/login" className="text-lg font-medium text-slate-400">Log in</Link>
            <Link href="/get-started" className="w-full py-4 bg-white text-black text-center font-bold rounded-xl">Get Started</Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
