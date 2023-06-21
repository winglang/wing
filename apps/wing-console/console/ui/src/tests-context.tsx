import { PropsWithChildren, createContext, useState } from "react";

export const TestsContext = createContext<{
  showTests: boolean;
  setShowTests(showTests: boolean): void;
}>({
  showTests: false,
  setShowTests: () => {},
});

export const TestsContextProvider = (props: PropsWithChildren) => {
  const [showTests, setShowTests] = useState(false);

  return (
    <TestsContext.Provider
      value={{
        showTests,
        setShowTests,
      }}
    >
      {props.children}
    </TestsContext.Provider>
  );
};
