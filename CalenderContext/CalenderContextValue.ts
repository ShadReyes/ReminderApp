import { useState } from "react";
import { ICalenderContextValue } from "./ICalenderContextValue";

export const CalenderContextValue = (): ICalenderContextValue => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const [selectedDate, setSelectedDate] = useState(
    new Date(currentYear, currentMonth, new Date().getDay())
  );

  const currentFirstDay = new Date(currentYear, currentMonth, 1).getDay();
  console.log(currentFirstDay);

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
