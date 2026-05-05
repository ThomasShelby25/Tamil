"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Terminal = () => {
  const [text, setText] = useState("");
  const fullText = "npx velsaim deploy --global --neural-optimization";
  
  useEffect(() => {
    let index = 0;
    let isHolding = false;
    let holdTimeout: ReturnType<typeof setTimeout> | null = null;

    const interval = setInterval(() => {
      if (isHolding) return;

      setText(fullText.slice(0, index));

      if (index >= fullText.length) {
        isHolding = true;
        holdTimeout = setTimeout(() => {
          index = 0;
          isHolding = false;
          setText("");
        }, 2000);
        return;
      }

      index += 1;
    }, 100);

    return () => {
      clearInterval(interval);
      if (holdTimeout) clearTimeout(holdTimeout);
    };
  }, [fullText]);

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-950 rounded-xl overflow-hidden border border-white/10 shadow-2xl font-mono text-xs">
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <div className="text-white/30 text-[10px] ml-2">bash — velsaim-cli</div>
      </div>
      <div className="p-6 min-h-30">
        <div className="flex gap-3">
          <span className="text-pink-500">$</span>
          <span className="text-white">{text}</span>
          <motion.span 
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-4 bg-pink-500"
          />
        </div>
        {text === fullText && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 space-y-1"
          >
            <p className="text-green-400">✔ Neural context synchronized</p>
            <p className="text-green-400">✔ Global mesh nodes identified (128)</p>
            <p className="text-blue-400">Deploying to edge...</p>
            <p className="text-white/50">Done in 0.42s</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
