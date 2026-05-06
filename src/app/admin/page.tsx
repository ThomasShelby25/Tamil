"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import type { SubmissionStats } from "@/lib/analytics/submissions";

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  sourceIp?: string;
  confirmationEmailSent: boolean;
  notificationEmailSent: boolean;
  createdAt: string;
  updatedAt: string;
}

const StatCard = ({ label, value, trend }: { label: string; value: string | number; trend?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40 hover:border-pink-600 dark:hover:border-pink-500 transition-all"
  >
    <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">{label}</p>
    <p className="text-4xl font-black mb-2">{value}</p>
    {trend && <p className="text-xs text-slate-500 dark:text-white/40">{trend}</p>}
  </motion.div>
);

export default function AdminPage() {
  const [stats, setStats] = useState<SubmissionStats | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const authenticate = () => {
    if (apiKey) {
      localStorage.setItem("admin_api_key", apiKey);
      setAuthenticated(true);
      fetchData();
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const key = apiKey || localStorage.getItem("admin_api_key");

    try {
      const [statsRes, submissionsRes] = await Promise.all([
        fetch("/api/admin/stats", {
          headers: { Authorization: `Bearer ${key}` },
        }),
        fetch("/api/admin/submissions?limit=10", {
          headers: { Authorization: `Bearer ${key}` },
        }),
      ]);

      if (!statsRes.ok || !submissionsRes.ok) {
        throw new Error("Authentication failed or request failed");
      }

      const statsData = await statsRes.json();
      const submissionsData = await submissionsRes.json();

      setStats(statsData.data.stats);
      setSubmissions(submissionsData.data.submissions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
        <Navbar />
        <section className="relative z-10 pt-40 pb-32 px-6 flex flex-col items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.85] mb-8 italic">
              ADMIN ACCESS
            </h1>
            <p className="text-lg text-slate-500 dark:text-white/40 mb-8">
              Enter your API key to access the admin dashboard.
            </p>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-6 py-4 rounded-full border border-slate-200 dark:border-white/20 bg-slate-50 dark:bg-slate-950/40 focus:border-pink-500 outline-none transition-colors"
              />
              <button
                onClick={authenticate}
                className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xs tracking-[0.3em] uppercase rounded-full hover:shadow-lg transition-all"
              >
                Authenticate
              </button>
            </div>
          </motion.div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      <section className="relative z-10 pt-40 pb-32 px-6">
        <div className="max-w-7xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-4 italic">
              ADMIN DASHBOARD
            </h1>
            <p className="text-lg text-slate-500 dark:text-white/40">
              Manage contact submissions and track analytics.
            </p>
          </motion.div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-600 mb-8">
              ✗ {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-white/40">Loading...</p>
            </div>
          ) : stats ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <StatCard label="Total Submissions" value={stats.total} />
                <StatCard label="Today" value={stats.today} />
                <StatCard label="This Week" value={stats.thisWeek} />
                <StatCard
                  label="Email Success Rate"
                  value={`${stats.emailSuccessRate}%`}
                  trend={`${stats.emailSentCount} of ${stats.total} sent`}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-black tracking-tighter italic mb-6">
                  RECENT SUBMISSIONS
                </h2>
                {submissions.length > 0 ? (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <motion.div
                        key={submission.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40 hover:border-pink-600 dark:hover:border-pink-500 transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="font-black text-lg">{submission.name}</p>
                            <p className="text-sm text-slate-500 dark:text-white/40">{submission.email}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
                              {new Date(submission.createdAt).toLocaleDateString()}
                            </p>
                            <div className="flex gap-2 mt-2 justify-end">
                              {submission.confirmationEmailSent && (
                                <span className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-300 text-xs rounded">
                                  ✓ Confirmation
                                </span>
                              )}
                              {submission.notificationEmailSent && (
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs rounded">
                                  ✓ Notified
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-600 dark:text-white/60 text-sm line-clamp-2">
                          {submission.message}
                        </p>
                        <p className="text-xs text-slate-400 mt-3">IP: {submission.sourceIp}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 dark:text-white/40">No submissions yet.</p>
                )}
              </motion.div>
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
