"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

export const BentoCard = ({ title, description, icon, className, delay = 0 }: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8 transition-all hover:bg-white/10",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative z-10">
        {icon && <div className="mb-3 sm:mb-4 text-purple-400 text-lg sm:text-xl">{icon}</div>}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
      <div className="absolute bottom-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="h-24 w-24 rounded-full bg-purple-500/20 blur-2xl" />
      </div>
    </motion.div>
  );
};

export const BentoGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[250px] sm:auto-rows-[300px]">
      {children}
    </div>
  );
};
