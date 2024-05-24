/**
 * Converts a date to a long date string
 * EX: "Monday, January 1, 2022"
 * @param date date to convert
 */
export const dateToLongDateString = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Converts a date to a time string
 * EX: "12:00 PM"
 * @param date date to format
 * @returns formatted time string
 */
export const getFormattedTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
};
