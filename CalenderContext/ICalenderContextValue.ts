import {
  ObservableComputed,
  ObservableObject,
  ObservablePrimitiveBaseFns,
} from "@legendapp/state";

export interface ICalenderContextValue {
  selectedYear: ObservablePrimitiveBaseFns<number>;
  selectedMonth: ObservablePrimitiveBaseFns<number>;
  selectedDate: ObservableObject<Date>;
  currentFirstDay: ObservableComputed<number>;
}
