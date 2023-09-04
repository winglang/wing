import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  MutableRefObject,
  useState,
} from "react";

const PersistentStateContext = createContext<{
  state: MutableRefObject<Map<string, any[]>>;
}>(undefined!);

export const PersistentStateProvider = (props: PropsWithChildren) => {
  const state = useRef(new Map<string, any[]>());
  return (
    <PersistentStateContext.Provider value={{ state }}>
      {props.children}
    </PersistentStateContext.Provider>
  );
};

export const createPersistentState = (prefix: string) => {
  let index = 0;

  return {
    usePersistentState: function <T>(
      initialValue?: T | (() => T),
    ): [T, Dispatch<SetStateAction<T>>] {
      const { state } = useContext(PersistentStateContext);
      if (!state) {
        throw new Error(
          "usePersistentState must be used within a PersistentStateProvider",
        );
      }

      const currentIndex = useRef(index++);

      const [value, setValue] = useState(() => {
        const values = state.current.get(prefix) ?? [];
        if (values.length > currentIndex.current) {
          return values[currentIndex.current];
        }
        return initialValue;
      });

      useEffect(() => {
        return () => {
          const storedData = state.current.get(prefix) ?? [];
          storedData[currentIndex.current] = value;
          state.current.set(prefix, storedData);
        };
      }, [value]);

      return [value, setValue];
    },
  };
};
