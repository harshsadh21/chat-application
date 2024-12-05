// Function to extract time from an ISO 8601 date string
export const extractTimeFromISOString = (isoString) => {
  // Create a new Date object from the ISO string
  const date = new Date(isoString);

  // Extract hours, minutes, and seconds
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return { hours, minutes, seconds };
};

// Example usage
const isoString = "2024-09-01T15:08:09.685Z";
const extractedTime = extractTimeFromISOString(isoString);

console.log(`Hours: ${extractedTime.hours}`); // Output: "15"
console.log(`Minutes: ${extractedTime.minutes}`); // Output: "08"
console.log(`Seconds: ${extractedTime.seconds}`); // Output: "09"
