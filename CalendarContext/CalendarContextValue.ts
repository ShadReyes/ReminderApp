import { useEffect, useState } from "react";
import { ICalendarContextValue } from "./ICalendarContextValue";
import { useObservable } from "@legendapp/state/react";
import { ObservableBaseFns, computed } from "@legendapp/state";
import { IReminder, Reminder } from "@/models/Reminder";
import { CalendarStorageService } from "./CalendarStorageService";

export const CalendarContextValue = (): ICalendarContextValue => {
  const selectedYear = useObservable<number>(new Date().getFullYear());
  const selectedMonth = useObservable<number>(new Date().getMonth());

  const calendarStorageService = new CalendarStorageService();

  const selectedDateReminders = useObservable<Reminder[]>([]);

  const selectedDate = useObservable<Date>(
    new Date(selectedYear.peek(), selectedMonth.peek(), new Date().getDate())
  );

  const currentFirstDay = computed(() =>
    new Date(selectedYear.get(), selectedMonth.get(), 1).getDay()
  );

  selectedDate.onChange(() => {
    console.log("Selected date changed");
    selectedDateReminders.set(
      calendarStorageService.getReminders(selectedDate.get()) ?? []
    );
  });

  const saveReminder = (formData: IReminder) => {
    console.log("Save reminder");
    const newReminder = new Reminder(formData);

    selectedDateReminders.push(newReminder);

    calendarStorageService.saveReminder(newReminder);
  };

  return {
    selectedYear,
    selectedMonth,
    selectedDate,
    currentFirstDay,
    selectedDateReminders,
    saveReminder,
  };
};
