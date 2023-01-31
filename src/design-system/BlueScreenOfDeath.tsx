import classNames from "classnames";
import { useEffect, useRef } from "react";

import { parseLogMessage } from "../components/ConsoleLogs.js";

export const BlueScreenOfDeath = ({
  title,
  error = "",
  hidden = false,
}: {
  title: string;
  error: string;
  hidden?: boolean;
}) => {
  const errorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (errorRef.current === null) {
      return;
    }
    errorRef.current.innerHTML = parseLogMessage(
      error,
      "underline text-slate-300 hover:text-slate-400",
      true,
    );
  }, [error]);

  return (
    <div
      className={classNames(
        "absolute h-full w-full z-50 px-10 py-20 bg-[#004295] overflow-auto flex justify-center items-center",
        hidden && "hidden",
      )}
    >
      <div className="h-full w-full text-md font-share-tech text-white max-w-7xl break-words space-y-4">
        <div className="w-full flex justify-center">
          <span className="bg-slate-400 px-4 text-[#004295]">Wing</span>
        </div>
        <div className="leading-[40px]">
          <div>{title}</div>
          <div className="py-4">
            <span className="focus:outline-none" ref={errorRef} />
          </div>
          <div className="w-full text-center py-4">
            Click on any error reference to navigate to your IDE{" "}
            <span className="animate-ping">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};
