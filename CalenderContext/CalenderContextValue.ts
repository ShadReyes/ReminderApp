import { useEffect, useState } from "react";
import { ICalenderContextValue } from "./ICalenderContextValue";
import { useObservable } from "@legendapp/state/react";
import { computed } from "@legendapp/state";

export const CalenderContextValue = (): ICalenderContextValue => {
  const selectedYear = useObservable<number>(new Date().getFullYear());
  const selectedMonth = useObservable<number>(new Date().getMonth());

  const selectedDate = useObservable<Date>(
    new Date(selectedYear.peek(), selectedMonth.peek(), new Date().getDate())
  );

  const currentFirstDay = computed(() =>
    new Date(selectedYear.get(), selectedMonth.get(), 1).getDay()
  );

  // useEffect(() => {
  //   setSelectedDate(new Date(currentYear, currentMonth, new Date().getDate()));
  //   console.log("Selected Date: ", selectedDate);
  // }, [currentYear, currentMonth]);

  return {
    selectedYear,
    selectedMonth,
    selectedDate,
    currentFirstDay,
  };
};
