import { ReactNode, createContext, useContext } from "react";
import { ICalendarContextValue } from "./ICalendarContextValue";
import { CalendarContextValue } from "./CalendarContextValue";

const Context = createContext<ICalendarContextValue>(undefined!);

export const useCalendarContext = () => {
  const contextHook = useContext(Context);
  if (!contextHook) {
    throw new Error("useCalendarContext must be used within a CalendarContext");
  }
  return contextHook;
};

interface ICalendarContextProps {
  children: ReactNode;
}

export const CalendarContext = (props: ICalendarContextProps) => {
  const contextValue = CalendarContextValue();
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
