import { useNotifications } from "@wingconsole/design-system";
import classNames from "classnames";
import { memo, useCallback, useEffect, useState } from "react";

import {
  OpenFileInEditorButton,
  createHtmlLink,
} from "../shared/use-file-link.js";

export const BlueScreenOfDeath = memo(
  ({
    title,
    error = "",
    displayLinks = true,
  }: {
    title: string;
    error: string;
    displayLinks?: boolean;
  }) => {
    const [formattedPathsError, setFormattedPathsError] = useState("");
    const { showNotification } = useNotifications();

    const copyError = useCallback(() => {
      navigator.clipboard.writeText(error);
      showNotification("Error copied to clipboard", { type: "success" });
    }, [error, showNotification]);

    useEffect(() => {
      if (!displayLinks) {
        setFormattedPathsError(error);
        return;
      }
      setFormattedPathsError(
        createHtmlLink(
          error,
          "underline text-slate-300 hover:text-slate-400 cursor-pointer",
          true,
        ),
      );
    }, [error, displayLinks]);

    return (
      <div
        className={classNames(
          "absolute inset-0",
          "px-10 pb-4 bg-[#004295] flex justify-center items-center",
        )}
        data-testid="blue-screen-of-death"
      >
        <div className="relative w-full h-full text-md font-share-tech text-white flex flex-col max-w-7xl break-words space-y-4">
          <div className="flex-grow overflow-hidden flex flex-col">
            <OpenFileInEditorButton className="cursor-text select-text flex-grow flex flex-col h-full">
              <div className="py-10 overflow-auto h-full">
                <div className="flex mb-4">
                  <div className="underline font-semibold">{title}</div>
                </div>
                <span
                  className="outline-none whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: formattedPathsError }}
                />
              </div>
            </OpenFileInEditorButton>
          </div>

          <div className="flex flex-col items-center flex-shrink-0">
            <button
              onClick={copyError}
              className={classNames(
                "text-center px-4 py-1 transition-all",
                "bg-slate-400 hover:bg-slate-450 px-4 text-[#004295]",
              )}
            >
              Click here to copy the error
            </button>
          </div>
        </div>
      </div>
    );
  },
);
