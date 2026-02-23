import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const API_ORIGIN =
  typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, '')
    : '';

export function imageSrc(url) {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('//') || url.startsWith('data:')) return url;
  return API_ORIGIN ? `${API_ORIGIN}${url}` : url;
}
