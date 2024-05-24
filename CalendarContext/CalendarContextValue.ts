import { ICalendarContextValue } from "./ICalendarContextValue";
import { useObservable } from "@legendapp/state/react";
import { computed } from "@legendapp/state";
import { IReminder, Reminder } from "@/models/Reminder";
import { CalendarStorageService } from "./CalendarStorageService";

export const CalendarContextValue = (): ICalendarContextValue => {
  const selectedYear = useObservable<number>(new Date().getFullYear());
  const selectedMonth = useObservable<number>(new Date().getMonth());

  const calendarStorageService = new CalendarStorageService();

  const selectedDate = useObservable<Date>(
    new Date(selectedYear.peek(), selectedMonth.peek(), new Date().getDate())
  );
  const selectedDateReminders = useObservable<Reminder[]>(
    calendarStorageService.getReminders(selectedDate.get()) ?? []
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

    //Don't want to push date to selected date unless it is the same date.
    if (_doesDateMatchSelected(newReminder.dateTime)) {
      selectedDateReminders.push(newReminder);
    }

    calendarStorageService.saveReminder(newReminder);
  };

  const deleteReminder = (reminder: Reminder) => {
    console.log("Delete reminder");
    const success = calendarStorageService.deleteReminder(reminder);

    if (!success) {
      return;
    }

    const reminders = selectedDateReminders.peek();

    reminders.splice(selectedDateReminders.indexOf(reminder), 1);

    selectedDateReminders.set(reminders);
  };

  const _doesDateMatchSelected = (date: Date) => {
    return (
      date.getFullYear() === selectedDate.get().getFullYear() &&
      date.getMonth() === selectedDate.get().getMonth() &&
      date.getDate() === selectedDate.get().getDate()
    );
  };

  return {
    selectedYear,
    selectedMonth,
    selectedDate,
    currentFirstDay,
    selectedDateReminders,
    saveReminder,
    deleteReminder,
  };
};
