import { ReactNode, createContext, useContext } from "react";
import { ICalenderContextValue } from "./ICalenderContextValue";
import { CalenderContextValue } from "./CalenderContextValue";

const Context = createContext<ICalenderContextValue>(undefined!);

export const useCalenderContext = () => {
  const contextHook = useContext(Context);
  if (!contextHook) {
    throw new Error("useCalenderContext must be used within a CalenderContext");
  }
  return contextHook;
};

interface ICalenderContextProps {
  children: ReactNode;
}

export const CalenderContext = (props: ICalenderContextProps) => {
  const contextValue = CalenderContextValue();
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
