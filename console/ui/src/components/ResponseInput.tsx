import { SpinnerLoader, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { PropsWithChildren } from "react";

import { TextHighlight } from "../design-system/TextHighlight.js";

export interface ResponseInputProps {
  empty: boolean;
  loading: boolean;
  placeholder?: string;
}

export const ResponseInput = ({
  empty,
  loading,
  placeholder = "No response",
  children,
}: PropsWithChildren<ResponseInputProps>) => {
  const { theme } = useTheme();
  return (
    <>
      {loading && (
        <div
          className={classNames(
            theme.bgInput,
            theme.textInput,
            theme.borderInput,
            "py-1 w-full justify-center flex",
            "rounded text-sm border",
          )}
        >
          <SpinnerLoader size="sm" />
        </div>
      )}
      {!loading && empty && (
        <div
          className={classNames(
            theme.bgInput,
            theme.text2,
            theme.borderInput,
            "flex-1 text-center text-xs",
            "px-2.5 py-1.5 rounded border",
          )}
        >
          {placeholder}
        </div>
      )}

      {!loading && !empty && children}
    </>
  );
};
