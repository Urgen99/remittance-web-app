function getUserInitials(name: string): string {
  if (!name) return "";

  const trimmedName = name.trim();
  if (trimmedName.length === 0) return "";

  const nameParts = trimmedName.split(/\s+/);
  const firstNameInitial = nameParts[0]?.[0]?.toUpperCase() ?? "";
  const lastNameInitial = nameParts[1]?.[0]?.toUpperCase() ?? "";

  return `${firstNameInitial}${lastNameInitial || ""}`;
}

function getRandomColor(name: string, colorPalette: string[]) {
  if (!name) return { bg: "#2080F6", text: "white" };

  // hash calculation
  const hash = Array.from(name).reduce(
    (acc, char) => char.charCodeAt(0) + ((acc << 5) - acc),
    0
  );

  const bgColor = colorPalette[Math.abs(hash) % colorPalette.length];

  // hex to rgb
  const hex = bgColor.replace("#", "");
  const [r, g, b] = hex.match(/.{2}/g)!.map((v) => parseInt(v, 16));
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return {
    bg: bgColor,
    text: luminance > 0.5 ? "black" : "white",
  };
}

export type TransactionStatus =
  | "initiated"
  | "progress"
  | "verifying"
  | "completed"
  | "remaining"
  | "processing";

const statusColors: Record<TransactionStatus, string> = {
  initiated: "bg-[#1E2CA8]",
  progress: "bg-[#965800]",
  verifying: "bg-[#7B008B]",
  completed: "bg-[#1EA843]",
  remaining: "bg-[#494E40]",
  processing: "bg-[#3333C1]",
};

const textColors: Record<TransactionStatus, string> = {
  initiated: "text-[#1E2CA8]",
  progress: "text-[#965800]",
  verifying: "text-[#7B008B]",
  completed: "text-[#1EA843]",
  remaining: "text-[#494E40]",
  processing: "text-[#3333C1]",
};

const getStatusColor = (status: TransactionStatus) => statusColors[status];
const getTextColor = (status: TransactionStatus) => textColors[status];

const userColorPalettes = [
  "#2080F6",
  "#179173",
  "#7C3AED",
  "#DB2777",
  "#14B8A6",
  "#E11D48",
];

export {
  getRandomColor,
  getUserInitials,
  userColorPalettes,
  getStatusColor,
  getTextColor,
  statusColors,
  textColors,
};
