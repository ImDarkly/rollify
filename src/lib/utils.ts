import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDefaultTheme = () => {
  const today = new Date();
  return today.getMonth() === 9 ? "pumpkin" : "system";
};
