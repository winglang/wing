import type { PropsWithChildren } from "react";

import { trpc } from "../services/trpc.js";

export const createHtmlLink = (
  error: string,
  className: string,
  expanded: boolean = false,
) => {
  return error
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll(
      /\B((?:[a-z]:)?\.{0,2}[/\\]\S+):(\d+):(\d+)/gi,
      (match, path, line, column) => {
        return `<a class="${className}" path="${path}" line="${line}" column="${column}" >${match}</a>`;
      },
    )
    .replaceAll(/(\r\n|\n|\r)/gm, expanded ? "<br />" : "\n");
};

export const OpenFileInEditorButton = ({ children }: PropsWithChildren) => {
  const openFileInEditor = trpc["app.openFileInEditor"].useMutation();

  return (
    <button
      className="appearance-none text-left"
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
