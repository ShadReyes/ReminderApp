import { IReminder, Reminder } from "@/models/Reminder";
import { MMKV } from "react-native-mmkv";

const calenderStorage = new MMKV({ id: "caledender" });
const baseKeyValue = "Reminder";

export class CalenderStorageService {
  public saveReminder(date: Date, newReminder: IReminder) {
    const reminders: Reminder[] = this.getReminders(date) ?? [];
    reminders.push(new Reminder(newReminder));

    const jsonString = JSON.stringify(reminders);

    calenderStorage.set(getDateStringKey(date), jsonString);
  }

  public getReminders(date: Date): Reminder[] | null {
    const jsonString = calenderStorage.getString(getDateStringKey(date));

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
