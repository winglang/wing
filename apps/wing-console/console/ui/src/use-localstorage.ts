// Imported and modified from https://github.com/streamich/react-use/blob/master/src/useLocalStorage.ts
import type { Dispatch, SetStateAction } from "react";
import {
  useCallback,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useMemo,
} from "react";

import { trpc } from "./trpc.js";

const noop = () => {};

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>, boolean, () => void] => {
  const [valueExists] = useState(() => {
    try {
      const localStorageValue = localStorage.getItem(key);
      return localStorageValue !== null;
    } catch {
      return false;
    }
  });

  const initializer = useRef((key: string) => {
    try {
      const localStorageValue = localStorage.getItem(key);
      return localStorageValue === null
        ? initialValue
        : JSON.parse(localStorageValue);
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. JSON.parse and JSON.stringify
      // can throw, too.
      return initialValue;
    }
  });

  const [state, setState] = useState<T>(() => initializer.current(key));

  useLayoutEffect(() => setState(initializer.current(key)), [key]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. Also JSON.stringify can throw.
    }
  }, [state, key]);

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setState(initialValue);
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw.
    }
  }, [initialValue, key]);

  return [state, setState, valueExists, remove];
};

export const useAppLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>, boolean, () => void] => {
  const wingfileQuery = trpc["app.path"].useQuery();
  const wingfile = useMemo(() => {
    return wingfileQuery.data;
  }, [wingfileQuery.data]);

  return useLocalStorage(wingfile ? `${wingfile}.${key}` : key, initialValue);
};
