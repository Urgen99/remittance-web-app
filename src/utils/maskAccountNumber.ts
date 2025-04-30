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
