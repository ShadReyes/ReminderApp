export interface ICalenderContextValue {
  currentYear: number;
  setCurrentYear: (year: number) => void;
  currentMonth: number;
  setCurrentMonth: (month: number) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  currentFirstDay: number;
}
