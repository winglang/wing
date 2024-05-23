import { Button, useNotifications } from "@wingconsole/design-system";
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
    displayWingTitle = true,
  }: {
    title: string;
    error: string;
    displayLinks?: boolean;
    displayWingTitle?: boolean;
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
          "absolute h-full w-full z-50 px-10 py-20 bg-[#004295] overflow-auto flex justify-center items-center",
        )}
        data-testid="blue-screen-of-death"
      >
        <div className="h-full w-full text-md font-share-tech text-white max-w-7xl break-words space-y-4">
          {displayWingTitle && (
            <div className="w-full flex justify-center">
              <span className="bg-slate-400 px-4 text-[#004295]">Wing</span>
            </div>
          )}

          <div className="space-y-4 group">
            <OpenFileInEditorButton className="cursor-text select-text">
              <div className="flex gap-x-4 items-center">
                <div className="bg-slate-400 px-4 text-[#004295]">{title}</div>
                <Button
                  onClick={copyError}
                  primary
                  small
                  className="opacity-0 group-hover:opacity-100 transition-all"
                >
                  Copy error
                </Button>
              </div>
              <div className="py-4">
                <span
                  className="outline-none whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: formattedPathsError }}
                />
              </div>
            </OpenFileInEditorButton>
            {displayLinks && (
              <div className="w-full text-center py-4">
                Click on any error reference to navigate to your IDE{" "}
                <span className="animate-ping">_</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
