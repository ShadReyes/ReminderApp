import { IReminder, Reminder } from "@/models/Reminder";
import { MMKV } from "react-native-mmkv";

const calendarStorage = new MMKV({ id: "caledender" });
const baseKeyValue = "Reminder";

export class CalendarStorageService {
  public saveReminder(date: Date, newReminder: IReminder) {
    const reminders: Reminder[] = this.getReminders(date) ?? [];
    reminders.push(new Reminder(newReminder));

    const jsonString = JSON.stringify(reminders);

    calendarStorage.set(getDateStringKey(date), jsonString);
  }

  public getReminders(date: Date): Reminder[] | null {
    const jsonString = calendarStorage.getString(getDateStringKey(date));

    if (!jsonString) {
      return null;
    }

    const array: Reminder[] = JSON.parse(jsonString);

    return array;
  }
}

const getDateStringKey = (date: Date): string => {
  return `${baseKeyValue}-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};
