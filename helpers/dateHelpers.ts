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

export const getFormattedTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
};
