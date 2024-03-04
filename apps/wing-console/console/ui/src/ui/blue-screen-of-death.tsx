import classNames from "classnames";
import { memo, useEffect, useState } from "react";

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
          <div className="space-y-4">
            <div>{title}</div>
            <div className="py-4">
              <OpenFileInEditorButton className="cursor-text">
                <span
                  className="outline-none select-text whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: formattedPathsError }}
                />
              </OpenFileInEditorButton>
            </div>
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
