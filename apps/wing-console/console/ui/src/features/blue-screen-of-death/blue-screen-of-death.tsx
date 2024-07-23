import { useNotifications } from "@wingconsole/design-system";
import classNames from "classnames";
import { memo, useCallback, useMemo } from "react";

import { trpc } from "../../trpc.js";

import type { AsciiColor } from "./turn-ascii-colors-into-html.js";
import { turnAsciiColorsIntoHtml } from "./turn-ascii-colors-into-html.js";
import { OpenFileInEditorButton, createHtmlLink } from "./use-file-link.js";

const colors = {
  black: "text-black-500",
  red: "text-red-500",
  green: "text-green-500",
  yellow: "text-yellow-500",
  blue: "text-blue-500",
  magenta: "text-magenta-500",
  cyan: "text-cyan-500",
  white: "text-white-500",
} satisfies Record<AsciiColor, string>;

export const BlueScreenOfDeath = memo(
  ({ displayLinks = true }: { displayLinks?: boolean }) => {
    const errorQuery = trpc["app.error"].useQuery();

    const coloredError = useMemo(() => {
      return turnAsciiColorsIntoHtml(errorQuery.data ?? "", {
        colorsTransform: (color) => `class="${colors[color]}"`,
      });
    }, [errorQuery.data]);

    const { showNotification } = useNotifications();

    const copyError = useCallback(() => {
      navigator.clipboard.writeText(
        errorQuery.data?.replaceAll(/\u001B\[\d+m/g, "") ?? "",
      );
      showNotification("Error copied to clipboard", { type: "success" });
    }, [errorQuery.data, showNotification]);

    const formattedPathsError = useMemo(() => {
      if (!displayLinks) {
        return coloredError;
      }

      return createHtmlLink(
        coloredError,
        "underline text-slate-300 hover:text-slate-400 cursor-pointer",
      );
    }, [coloredError, displayLinks]);

    return (
      <div
        className={classNames(
          "absolute h-full w-full z-50 px-10 py-10 bg-[#004295] overflow-auto flex justify-center items-center select-text",
        )}
        data-testid="blue-screen-of-death"
      >
        <div className="h-full w-full text-md font-share-tech text-white max-w-7xl break-words space-y-4">
          <div className="flex items-center gap-x-4">
            <button
              onClick={copyError}
              className={classNames(
                "text-center px-4 py-1 transition-all",
                "bg-slate-400 hover:bg-slate-450 px-4 text-[#004295]",
                "select-none",
              )}
            >
              Copy error message
            </button>
          </div>
          <div className="space-y-4">
            <OpenFileInEditorButton className="cursor-text">
              <div className="py-4">
                <span
                  className="outline-none whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: formattedPathsError }}
                />
              </div>
            </OpenFileInEditorButton>

            {displayLinks && (
              <div className="w-full text-center pb-4 select-none">
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
