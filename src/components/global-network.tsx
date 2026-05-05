"use client";

import React from "react";
import { motion } from "framer-motion";

export const GlobalNetwork = () => {
  // Mock node positions (percentages for responsiveness)
  const nodes = [
    { top: "30%", left: "20%", label: "US-West" },
    { top: "35%", left: "45%", label: "EU-West" },
    { top: "60%", left: "75%", label: "AP-South" },
    { top: "25%", left: "80%", label: "AP-North" },
    { top: "70%", left: "30%", label: "SA-East" },
    { top: "45%", left: "15%", label: "US-East" },
  ];

  return (
    <div className="relative w-full h-[600px] bg-slate-950/50 rounded-[48px] overflow-hidden border border-white/5 group">
      {/* Abstract World Map Silhouette (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] scale-150" viewBox="0 0 1000 500">
        <path fill="currentColor" d="M150,100 Q200,50 300,100 T500,100 T700,150 T850,200 L850,400 Q700,450 500,400 T200,400 Z" />
        {/* Simple abstract map paths */}
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
      
      {/* Pulsing Grid Background */}
      <div className="absolute inset-0 perspective-grid opacity-20" />

      {/* Neural Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.2 }}
          className="absolute z-20"
          style={{ top: node.top, left: node.left }}
        >
          <div className="relative">
            <motion.div 
              animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-[-10px] bg-pink-500/30 rounded-full blur-sm"
            />
            <div className="w-3 h-3 bg-pink-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(255,0,128,0.8)]" />
            
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[8px] font-black tracking-widest uppercase text-white/40 bg-slate-900/80 px-2 py-1 rounded-md border border-white/5">
                {node.label}
              </span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Connection Lines (Decorative) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node, i) => {
          if (i === nodes.length - 1) return null;
          const next = nodes[i + 1];
          return (
            <motion.line
              key={i}
              x1={node.left}
              y1={node.top}
              x2={next.left}
              y2={next.top}
              stroke="rgba(255, 0, 128, 0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
          );
        })}
      </svg>

      <div className="absolute bottom-12 left-12">
        <h4 className="text-2xl font-black italic tracking-tighter text-white mb-2">NEURAL MESH V2.4</h4>
        <p className="text-xs text-white/40 font-bold tracking-widest uppercase">Live Global Latency: 0.82ms</p>
      </div>
      
      <div className="absolute top-12 right-12 flex items-center gap-3">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
        <span className="text-[10px] font-bold tracking-widest text-green-500 uppercase">Nodes Active</span>
      </div>
    </div>
  );
};
