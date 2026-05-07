import { useState, useEffect } from "react";

interface RealTimeMetrics {
  globalUsers: string;
  transactions: string;
  uptime: string;
  securityScore: string;
}

interface UseMetricsReturn {
  metrics: RealTimeMetrics | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMetrics(): UseMetricsReturn {
  const [metrics, setMetrics] = useState<RealTimeMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/public/metrics", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch metrics: ${response.statusText}`);
      }

      const data = await response.json();
      setMetrics(data.data.metrics);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch metrics";
      setError(errorMessage);
      console.error("Error fetching metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      void fetchMetrics();
    });

    // Refresh metrics every 60 seconds
    const interval = setInterval(() => {
      void fetchMetrics();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return {
    metrics,
    loading,
    error,
    refetch: fetchMetrics,
  };
}
