import { useEffect, useState } from "react";
import { ICalenderContextValue } from "./ICalenderContextValue";

export const CalenderContextValue = (): ICalenderContextValue => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const [selectedDate, setSelectedDate] = useState(
    new Date(currentYear, currentMonth, new Date().getDay())
  );

  const currentFirstDay = new Date(currentYear, currentMonth, 1).getDay();

  useEffect(() => {
    setSelectedDate(new Date(currentYear, currentMonth, new Date().getDate()));
    console.log("Selected Date: ", selectedDate);
  }, [currentYear, currentMonth]);

  console.log("Current Year: ", currentYear);

  return {
    currentYear,
    setCurrentYear,
    currentMonth,
    setCurrentMonth,
    selectedDate,
    setSelectedDate,
    currentFirstDay,
  };
};
