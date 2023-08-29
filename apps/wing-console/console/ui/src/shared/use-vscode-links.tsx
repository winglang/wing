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

export const VsCodeLinkWrapper = ({ children }: PropsWithChildren<{}>) => {
  const openVSCodeLink = trpc["app.openVSCodeLink"].useMutation();

  const onClick = async (link: string) => {
    openVSCodeLink.mutate({
      link,
    });
  };

  return (
    <button
      className="appearance-none text-left"
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.tagName === "A") {
          onClick(target.getAttribute("href")!);
        }
      }}
    >
      {children}
    </button>
  );
};
