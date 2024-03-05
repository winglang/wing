import type {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  MutableRefObject,
} from "react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  memo,
} from "react";

const PersistentStateContext = createContext<
  | {
      state: MutableRefObject<Map<string, any[]>>;
    }
  | undefined
>(undefined);

export const usePersistentStateContext = () => {
  const context = useContext(PersistentStateContext);
  if (!context?.state) {
    throw new Error(
      "usePersistentState must be used within a PersistentStateProvider",
    );
  }
  return context.state;
};

export const PersistentStateProvider = memo((props: PropsWithChildren) => {
  const state = useRef(new Map<string, any[]>());
  return (
    <PersistentStateContext.Provider value={{ state }}>
      {props.children}
    </PersistentStateContext.Provider>
  );
});

export const createPersistentState = (stateId: string) => {
  let index = 0;

  return {
    usePersistentState: function <S>(
      initialValue?: S | (() => S),
    ): [S, Dispatch<SetStateAction<S>>] {
      const currentIndex = useRef(index++);

      const valueRef = useRef<S>() as MutableRefObject<S>;
      const state = usePersistentStateContext();

      const [value, setValue] = useState(() => {
        const values = state.current.get(stateId) ?? [];
        if (values.length > currentIndex.current) {
          return values[currentIndex.current];
        }
        return initialValue instanceof Function ? initialValue() : initialValue;
      });

      useEffect(() => {
        valueRef.current = value;
      }, [value]);

      useEffect(() => {
        const currentState = state.current;
        const index = currentIndex.current;
        return () => {
          const storedData = currentState.get(stateId) ?? [];
          storedData[index] = valueRef.current;
          currentState.set(stateId, storedData);
        };
      }, [state]);

      return [value, setValue];
    },
  };
};
