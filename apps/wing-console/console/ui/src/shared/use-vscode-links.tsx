import { PropsWithChildren } from "react";

import { trpc } from "../services/trpc.js";

export const useVSCodeLinks = () => {
  const createHtmlLink = (
    error: string,
    className: string,
    expanded: boolean = false,
  ) => {
    return error
      .replaceAll(
        /\B((?:[a-z]:)?[/\\]\S+):(\d+):(\d+)/gi,
        (match, path, line, column) => {
          const link = `vscode://file/${path}:${line}:${column}`;
          return `<a class="${className}" href="${link}">${match}</a>`;
        },
      )
      .replaceAll(/(\r\n|\n|\r)/gm, expanded ? "<br />" : "\n");
  };

  return {
    createHtmlLink,
  };
};

export const OpenFileInEditorButton = ({ children }: PropsWithChildren<{}>) => {
  const openFileInEditor = trpc["app.openFileInEditor"].useMutation();

  return (
    <button
      className="appearance-none text-left"
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.tagName === "A") {
          const [link, row, column] = target
            .getAttribute("href")!
            .replace("vscode://file/", "")
            .split(":");
          openFileInEditor.mutate({
            link,
            row: row && Number.parseInt(row),
            column: column && Number.parseInt(column),
          });
        }
      }}
    >
      {children}
    </button>
  );
};
