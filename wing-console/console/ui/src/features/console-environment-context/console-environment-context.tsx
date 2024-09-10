import type { ConsoleEnvironmentId } from "@wingconsole/server";
import type { PropsWithChildren, Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

const ConsoleEnvironmentContext = createContext<{
  consoleEnvironment: ConsoleEnvironmentId;
  setConsoleEnvironment: Dispatch<SetStateAction<ConsoleEnvironmentId>>;
}>({
  consoleEnvironment: "local",
  setConsoleEnvironment() {},
});

export interface ConsoleEnvironmentProviderProps {
  consoleEnvironment?: ConsoleEnvironmentId | undefined;
}

export const ConsoleEnvironmentProvider = (
  props: PropsWithChildren<ConsoleEnvironmentProviderProps>,
) => {
  const [consoleEnvironment, setConsoleEnvironment] = useState(
    props.consoleEnvironment ?? "local",
  );
  return (
    <ConsoleEnvironmentContext.Provider
      value={{
        consoleEnvironment,
        setConsoleEnvironment,
      }}
    >
      {props.children}
    </ConsoleEnvironmentContext.Provider>
  );
};

export const useConsoleEnvironment = () => {
  return useContext(ConsoleEnvironmentContext);
};
