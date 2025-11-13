import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function getVisiblePages(
  current: number,
  total: number,
  delta = 2,
): (number | string)[] {
  if (total <= 0) return [];

  const range: number[] = [];
  const result: (number | string)[] = [];

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  let prev: number | null = null;
  for (const page of range) {
    if (prev !== null && page - prev > 1) {
      result.push("...");
    }
    result.push(page);
    prev = page;
  }

  return result;
}

export async function Sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
