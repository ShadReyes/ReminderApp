import {
  ObservableComputed,
  ObservableObject,
  ObservablePrimitiveBaseFns,
} from "@legendapp/state";

export interface ICalendarContextValue {
  selectedYear: ObservablePrimitiveBaseFns<number>;
  selectedMonth: ObservablePrimitiveBaseFns<number>;
  selectedDate: ObservableObject<Date>;
  currentFirstDay: ObservableComputed<number>;
}
