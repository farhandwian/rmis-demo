import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateRiskScore(
  probability: number,
  impact: number
): number {
  return probability * impact;
}

export function getRiskLevel(score: number): string {
  if (score <= 5) return "Low";
  if (score <= 12) return "Medium";
  if (score <= 20) return "High";
  return "Critical";
}

export function getRiskLevelColor(score: number): string {
  if (score <= 5) return "text-green-600 bg-green-100";
  if (score <= 12) return "text-yellow-600 bg-yellow-100";
  if (score <= 20) return "text-orange-600 bg-orange-100";
  return "text-red-600 bg-red-100";
}
