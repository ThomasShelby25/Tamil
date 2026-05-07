"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { RefreshCw, TrendingUp, Users, Zap } from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalTransactions: number;
  totalVolume: number;
  averageTransactionAmount: number;
  transactionSuccessRate: number;
  transactionFailureRate: number;
  systemUptime: number;
  averageResponseTime: number;
  contactSubmissions: number;
  emailDeliveryRate: number;
  weeklyGrowth: {
    userGrowth: number;
    transactionGrowth: number;
    volumeGrowth: number;
  };
}

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

interface SubmissionStats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  emailSentCount: number;
  emailSuccessRate: number;
}

const StatCard = ({ 
  label, 
  value, 
  trend, 
  icon,
  trendUp 
}: { 
  label: string; 
  value: string | number; 
  trend?: string;
  icon?: React.ReactNode;
  trendUp?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40 hover:border-pink-600 dark:hover:border-pink-500 transition-all"
  >
    <div className="flex items-start justify-between mb-4">
      <p className="text-xs font-bold tracking-widest uppercase text-slate-400">{label}</p>
      {icon && <div className="text-purple-500">{icon}</div>}
    </div>
    <p className="text-4xl font-black mb-2">{value}</p>
    {trend && (
      <p className={`text-xs flex items-center gap-1 ${trendUp ? "text-green-500" : "text-slate-500 dark:text-white/40"}`}>
        {trendUp && <TrendingUp className="w-3 h-3" />}
        {trend}
      </p>
    )}
  </motion.div>
);

export default function AdminPage() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [submissionStats, setSubmissionStats] = useState<SubmissionStats | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("admin_api_key") || "";
  });
  const [authenticated, setAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("admin_api_key");
  });
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setRefreshing(true);
    const key = apiKey || localStorage.getItem("admin_api_key");

    try {
      const [dashboardRes, submissionRes, submissionsRes] = await Promise.all([
        fetch("/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${key}` },
        }),
        fetch("/api/admin/stats", {
          headers: { Authorization: `Bearer ${key}` },
        }),
        fetch("/api/admin/submissions?limit=15", {
          headers: { Authorization: `Bearer ${key}` },
        }),
      ]);

      if (!dashboardRes.ok || !submissionRes.ok || !submissionsRes.ok) {
        throw new Error("Authentication failed or request failed");
      }

      const dashboardData = await dashboardRes.json();
      const submissionData = await submissionRes.json();
      const submissionsData = await submissionsRes.json();

      setDashboardStats(dashboardData.data.stats);
      setSubmissionStats(submissionData.data.stats);
      setSubmissions(submissionsData.data.submissions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [apiKey]);

  useEffect(() => {
    if (authenticated) {
      queueMicrotask(() => {
        void fetchData();
      });
    }
  }, [authenticated, fetchData]);

  const authenticate = () => {
    if (apiKey) {
      localStorage.setItem("admin_api_key", apiKey);
      setAuthenticated(true);
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
                onKeyPress={(e) => e.key === "Enter" && authenticate()}
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
            className="mb-16 flex justify-between items-start"
          >
            <div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-4 italic">
                ADMIN DASHBOARD
              </h1>
              <p className="text-lg text-slate-500 dark:text-white/40">
                Real-time system metrics and contact submissions.
              </p>
            </div>
            <button
              onClick={fetchData}
              disabled={refreshing}
              className="p-3 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-950/40 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </motion.div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-600 mb-8">
              ✗ {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-white/40">Loading dashboard...</p>
            </div>
          ) : (
            <>
              {/* System Health Section */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">System Health</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard 
                    label="System Uptime" 
                    value={`${dashboardStats?.systemUptime.toFixed(2)}%`}
                    icon={<Zap className="w-4 h-4" />}
                  />
                  <StatCard 
                    label="Avg Response Time" 
                    value={`${dashboardStats?.averageResponseTime.toFixed(0)}ms`}
                  />
                  <StatCard 
                    label="Email Delivery" 
                    value={`${dashboardStats?.emailDeliveryRate.toFixed(1)}%`}
                  />
                  <StatCard 
                    label="Success Rate" 
                    value={`${dashboardStats?.transactionSuccessRate.toFixed(1)}%`}
                    trendUp={true}
                    trend={`vs ${dashboardStats?.transactionFailureRate.toFixed(1)}% fail`}
                  />
                </div>
              </div>

              {/* User & Transaction Metrics */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">User & Transaction Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard 
                    label="Total Users" 
                    value={dashboardStats?.totalUsers ?? 0}
                    icon={<Users className="w-4 h-4" />}
                    trend={`${(dashboardStats?.weeklyGrowth.userGrowth ?? 0).toFixed(1)}% weekly growth`}
                    trendUp={(dashboardStats?.weeklyGrowth.userGrowth ?? 0) > 0}
                  />
                  <StatCard 
                    label="Active Users" 
                    value={dashboardStats?.activeUsers ?? 0}
                  />
                  <StatCard 
                    label="Total Transactions" 
                    value={dashboardStats?.totalTransactions ?? 0}
                    trend={`${(dashboardStats?.weeklyGrowth.transactionGrowth ?? 0).toFixed(1)}% growth`}
                    trendUp={(dashboardStats?.weeklyGrowth.transactionGrowth ?? 0) > 0}
                  />
                  <StatCard 
                    label="Transaction Volume" 
                    value={`$${(dashboardStats?.totalVolume || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
                    trend={`Avg: $${(dashboardStats?.averageTransactionAmount ?? 0).toFixed(2)}`}
                  />
                </div>
              </div>

              {/* Contact Form Submissions */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Contact Form Submissions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard label="Total Submissions" value={submissionStats?.total ?? 0} />
                  <StatCard label="Today" value={submissionStats?.today ?? 0} />
                  <StatCard label="This Week" value={submissionStats?.thisWeek ?? 0} />
                  <StatCard 
                    label="Email Delivery Rate" 
                    value={`${(submissionStats?.emailSuccessRate ?? 0).toFixed(1)}%`}
                  />
                </div>
              </div>

              {/* Recent Submissions */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Recent Contact Submissions</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-slate-200 dark:border-white/10">
                      <tr>
                        <th className="text-left py-4 px-4 font-bold text-slate-600 dark:text-white/60">Name</th>
                        <th className="text-left py-4 px-4 font-bold text-slate-600 dark:text-white/60">Email</th>
                        <th className="text-left py-4 px-4 font-bold text-slate-600 dark:text-white/60">Message</th>
                        <th className="text-left py-4 px-4 font-bold text-slate-600 dark:text-white/60">Status</th>
                        <th className="text-left py-4 px-4 font-bold text-slate-600 dark:text-white/60">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((submission) => (
                        <motion.tr
                          key={submission.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-950/40 transition-colors"
                        >
                          <td className="py-4 px-4">{submission.name}</td>
                          <td className="py-4 px-4 text-purple-600 dark:text-purple-400">{submission.email}</td>
                          <td className="py-4 px-4 max-w-xs truncate text-slate-500 dark:text-white/60">
                            {submission.message}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              {submission.confirmationEmailSent && (
                                <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded text-xs font-bold">
                                  ✓ Confirmed
                                </span>
                              )}
                              {submission.notificationEmailSent && (
                                <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-xs font-bold">
                                  ✓ Notified
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-xs text-slate-500 dark:text-white/60">
                            {new Date(submission.createdAt).toLocaleDateString()}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
