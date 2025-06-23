import { formatDuration, intervalToDuration } from "date-fns";

export default function convertTime(identityExpiryDate: string) {
  const currentDate = new Date();
  const expiryDate = new Date(identityExpiryDate);

  // Handle expired documents first
  if (expiryDate < currentDate) return "Document Expired";

  const duration = intervalToDuration({
    start: currentDate,
    end: expiryDate,
  });

  // Define units in descending order
  const unitPriority = [
    "years",
    "months",
    "weeks",
    "days",
    "hours",
    "minutes",
    "seconds",
  ] as const;

  // Find the first non-zero duration unit
  const significantUnit = unitPriority.find(
    (unit) => duration[unit] && duration[unit]! > 0
  );

  // Format and return the result
  return significantUnit
    ? formatDuration(
        { [significantUnit]: duration[significantUnit] },
        { format: [significantUnit] }
      ) + " left"
    : "Expiring soon";
}
