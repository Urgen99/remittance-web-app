import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currencyFormatter(value: number) {
  if (!Number.isFinite(value))
    throw new Error("Invalid currency value: must be a finite number");

  return new Intl.NumberFormat("en", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function maskAccountNumber(cardNumber: string): string {
  const digitsOnly = cardNumber.replace(/\D/g, "");
  const n = digitsOnly.length;

  if (n <= 4) return digitsOnly;

  const visible = digitsOnly.slice(0, 4);
  const masked = "#".repeat(n - 4);
  const combined = visible + masked;

  const grouped = combined.match(/.{1,4}/g);

  return grouped ? grouped.join(" ") : "";
}
