import classNames from "classnames";
import type { PropsWithChildren } from "react";

import { trpc } from "../../trpc.js";

export const createHtmlLink = (text: string, className: string) => {
  return text.replaceAll(
    /([\w./-]+\.w):(\d+):(\d+)/g,
    (match, path, line, column) => {
      return `<a class="${className}" path="${path}" line="${line}" column="${column}" >${match}</a>`;
    },
  );
};

export const OpenFileInEditorButton = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  const openFileInEditor = trpc["app.openFileInEditor"].useMutation();

  return (
    <button
      className={classNames("appearance-none text-left", className)}
      onClick={(event) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (target.tagName === "A") {
          const path = target.getAttribute("path")!;
          const line = target.getAttribute("line")!;
          const column = target.getAttribute("column")!;

          if (!path || !line || !column) {
            return;
          }

          openFileInEditor.mutate({
            path,
            line: Number.parseInt(line),
            column: Number.parseInt(column),
          });
        }
      }}
    >
      {children}
    </button>
  );
};
