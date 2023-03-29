import classNames from "classnames";
import { PropsWithChildren } from "react";

import { SpinnerLoader } from "../design-system/SpinnerLoader.js";
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
  return (
    <>
      {loading && (
        <div
          className={classNames(
            "bg-slate-100 border border-slate-300 py-1 w-full justify-center flex",
            "outline-none rounded  text-slate-600 text-sm",
          )}
        >
          <SpinnerLoader className="h-5 w-5" />
        </div>
      )}
      {!loading && empty && (
        <div
          className={classNames(
            "flex-1 text-center text-slate-600 text-xs",
            "px-2 py-1 border rounded border-slate-200 bg-slate-100",
          )}
        >
          {placeholder}
        </div>
      )}

      {!loading && !empty && children}
    </>
  );
};
