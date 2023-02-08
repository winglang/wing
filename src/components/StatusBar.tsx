import classNames from "classnames";

import { State } from "../../electron/main/types.js";
import { Loader } from "../design-system/Loader.js";

export interface StatusBarProps {
  wingVersion?: string;
  cloudAppState: State;
  isError?: boolean;
}

export const StatusBar = ({
  wingVersion = "",
  cloudAppState,
  isError = false,
}: StatusBarProps) => {
  return (
    <footer className="bg-slate-100 py-1 px-2 flex text-2xs w-full text-slate-500 relative">
      <div className="w-full flex space-x-6">
        <div title={wingVersion} className="truncate space-x-1 min-w-[7rem]">
          <span>Wing version:</span>
          <span className="text-slate-600">{wingVersion}</span>
        </div>

        <div className="flex space-x-1 min-w-[7rem]">
          <span>Status:</span>
          <span className="text-slate-600">
            <span
              className={classNames([
                isError ? "text-red-500" : "text-slate-600",
                "flex",
              ])}
            >
              {cloudAppState === "loading" && <Loader size="1rem" />}
              {cloudAppState}
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
};
