import { PropsWithChildren, createContext, useState } from "react";

export const TestsContext = createContext<{
  showTests: boolean;
  setShowTests(showTests: boolean): void;
  testsExists: boolean;
  setTestsExists(testsExists: boolean): void;
}>({
  showTests: false,
  testsExists: false,
  setShowTests: () => {},
  setTestsExists: () => {},
});

export const TestsContextProvider = (props: PropsWithChildren) => {
  const [showTests, setShowTests] = useState(false);
  const [testsExists, setTestsExists] = useState(false);

  return (
    <TestsContext.Provider
      value={{
        showTests,
        setShowTests,
        testsExists,
        setTestsExists,
      }}
    >
      {props.children}
    </TestsContext.Provider>
  );
};
