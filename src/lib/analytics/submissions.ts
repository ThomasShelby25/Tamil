export type SubmissionStats = {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  emailSentCount: number;
  emailSuccessRate: number;
};

export const getDateRangeLabel = (date: Date): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const submissionDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diff = today.getTime() - submissionDate.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
};

export const formatTimestamp = (date: Date): string => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
