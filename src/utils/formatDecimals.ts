export function formatDecimal(value: number) {
  if (!Number.isFinite(value))
    throw new Error("Invalid currency value: must be a finite number");

  return new Intl.NumberFormat("en", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
