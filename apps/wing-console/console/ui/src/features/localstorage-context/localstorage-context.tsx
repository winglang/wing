import type { PropsWithChildren } from "react";
import { createContext, useMemo } from "react";

const hashCode = (value: string) => {
  let hash = 0;
  if (value.length === 0) {
    return hash.toString();
  }
  for (let index = 0; index < value.length; index++) {
    const chr = value.codePointAt(index);
    hash = (hash << 5) - hash + chr!;
    hash = Math.trunc(hash);
  }
  return hash.toString();
};

export const AppLocalStorageContext = createContext<{
  storageKey: string | undefined;
}>({
  storageKey: undefined,
});

export interface AppLocalStorageProviderProps extends PropsWithChildren {
  storageKey: string | undefined;
}

export const AppLocalStorageProvider = (
  props: AppLocalStorageProviderProps,
) => {
  const key = useMemo(() => {
    if (props.storageKey) {
      const hash = hashCode(props.storageKey);
      return hash;
    }
  }, [props.storageKey]);
  console.log("AppLocalStorageProvider", { key });
  return (
    <AppLocalStorageContext.Provider
      value={{
        storageKey: key,
      }}
    >
      {props.children}
    </AppLocalStorageContext.Provider>
  );
};
