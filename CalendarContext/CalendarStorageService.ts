import { IReminder, Reminder } from "@/models/Reminder";
import { MMKV } from "react-native-mmkv";

const calendarStorage = new MMKV({ id: "caledender" });
const baseKeyValue = "Reminder";

export class CalendarStorageService {
  public saveReminder(newReminder: IReminder) {
    const reminders: Reminder[] = this.getReminders(newReminder.dateTime) ?? [];
    reminders.push(new Reminder(newReminder));

    const jsonString = JSON.stringify(reminders);

    calendarStorage.set(getDateStringKey(newReminder.dateTime), jsonString);
  }

  public getReminders(date: Date): Reminder[] | null {
    const jsonString = calendarStorage.getString(getDateStringKey(date));

    if (!jsonString) {
      return null;
    }

    //Dates are parsing as string, so we need to convert them back to Date.
    const array: Reminder[] = JSON.parse(jsonString, (key, value) => {
      return key == "dateTime" ? new Date(value) : value;
    });

    return array;
  }
  public deleteReminder(oldReminder: Reminder): boolean {
    const reminders: Reminder[] = this.getReminders(oldReminder.dateTime) ?? [];
    const reminderToRemove = reminders.find((r) => r.id === oldReminder.id);

    if (!reminderToRemove) {
      return false;
    }
    reminders.splice(reminders.indexOf(reminderToRemove), 1);

    const jsonString = JSON.stringify(reminders);

    calendarStorage.set(getDateStringKey(oldReminder.dateTime), jsonString);

    return true;
  }

  public reset() {
    calendarStorage.clearAll();
  }
}

const getDateStringKey = (date: Date): string => {
  return `${baseKeyValue}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};
