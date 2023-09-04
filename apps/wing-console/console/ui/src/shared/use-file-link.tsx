import { PropsWithChildren } from "react";

import { trpc } from "../services/trpc.js";

export const createHtmlLink = (
  error: string,
  className: string,
  expanded: boolean = false,
) => {
  return error
    .replaceAll(
      /\B((?:[a-z]:)?[/\\]\S+):(\d+):(\d+)/gi,
      (match, path, line, column) => {
        const link = `vscode://file/${path}:${line}:${column}`;
        return `<a class="${className}" href="${link}" path="${path}" line="${line}" column="${column}" >${match}</a>`;
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
        const target = event.target as HTMLElement;
        if (target.tagName === "A") {
          const path = target.getAttribute("href")!;
          const line = target.getAttribute("line");
          const column = target.getAttribute("column");

          openFileInEditor.mutate({
            path,
            line: line && Number.parseInt(line),
            column: column && Number.parseInt(column),
          });
        }
      }}
    >
      {children}
    </button>
  );
};
