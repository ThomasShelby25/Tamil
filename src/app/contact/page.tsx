"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, MessageSquare, Send } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setErrors({});
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errorMap: Record<string, string> = {};
          data.errors.forEach((err: { field: string; message: string }) => {
            errorMap[err.field] = err.message;
          });
          setErrors(errorMap);
        } else {
          setError(data.error || "Failed to send message. Please try again.");
        }
        return;
      }

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Contact form error:", err);
    } finally {
      setLoading(false);
    }
  };
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
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 italic">
            TALK TO AN<br />EXPERT.
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 dark:text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
            Ready to redefine your infrastructure? Our engineers are ready to build the future with you.
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="text-4xl font-black tracking-tighter italic leading-[0.9] mb-12">GET IN TOUCH</h2>
              <p className="text-slate-500 dark:text-white/40 text-lg mb-12">
                Have questions about our technology? Our team is here to help.
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
              <form className="space-y-8" onSubmit={handleSubmit}>
                {success && (
                  <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-600 text-sm">
                    ✓ Thank you! We'll get back to you shortly.
                  </div>
                )}
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-600 text-sm">
                    ✗ {error}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full bg-transparent border-b border-slate-200 dark:border-white/20 py-4 focus:border-pink-500 outline-none transition-colors disabled:opacity-50" 
                    placeholder="John Doe" 
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Company Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full bg-transparent border-b border-slate-200 dark:border-white/20 py-4 focus:border-pink-500 outline-none transition-colors disabled:opacity-50" 
                    placeholder="john@company.com" 
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full bg-transparent border-b border-slate-200 dark:border-white/20 py-4 focus:border-pink-500 outline-none transition-colors resize-none h-32 disabled:opacity-50" 
                    placeholder="Tell us about your project" 
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>
                <button 
                  type="submit"
                  disabled={loading || success}
                  className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xs tracking-[0.3em] uppercase rounded-full flex items-center justify-center gap-4 group hover:gap-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : success ? "Sent!" : "Send Inquiry"} 
                  <Send className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-32 px-6 bg-slate-50 dark:bg-slate-950/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-24 italic text-center">
            Frequently Asked
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How long does implementation take?",
                a: "Most clients are live within 2-4 weeks. We handle the heavy lifting so you can focus on your business."
              },
              {
                q: "What's your uptime guarantee?",
                a: "We guarantee 99.999% uptime with automatic failover and redundancy across multiple regions."
              },
              {
                q: "Do you offer enterprise support?",
                a: "Yes. We provide 24/7 dedicated support, SLA guarantees, and custom solutions for enterprise clients."
              },
              {
                q: "Is migration from existing platforms supported?",
                a: "Absolutely. Our team provides zero-downtime migration assistance for smooth transitions."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-pink-600 dark:hover:border-pink-500 transition-all"
              >
                <h3 className="text-lg font-black mb-3 italic">{item.q}</h3>
                <p className="text-slate-600 dark:text-white/60">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
