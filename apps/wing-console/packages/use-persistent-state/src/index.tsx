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
    usePersistentState: function <S>(
      initialValue?: S | (() => S),
    ): [S, Dispatch<SetStateAction<S>>] {
      const { state } = useContext(PersistentStateContext);
      if (!state) {
        throw new Error(
          "usePersistentState must be used within a PersistentStateProvider",
        );
      }
      const currentIndex = useRef(index++);

      const valueRef = useRef<S>() as MutableRefObject<S>;

      const [value, setValue] = useState(() => {
        const values = state.current.get(prefix) ?? [];
        if (values.length > currentIndex.current) {
          return values[currentIndex.current];
        }
        return initialValue instanceof Function ? initialValue() : initialValue;
      });

      useEffect(() => {
        valueRef.current = value;
      }, [value]);

      useEffect(() => {
        return () => {
          const storedData = state.current.get(prefix) ?? [];
          storedData[currentIndex.current] = valueRef.current;
          state.current.set(prefix, storedData);
        };
      }, []);

      return [value, setValue];
    },
  };
};
