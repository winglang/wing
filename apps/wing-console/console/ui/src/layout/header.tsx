import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

import { ThemeToggle } from "./theme-toggle.js";

export interface HeaderProps {
  title: string;
  showThemeToggle?: boolean;
}

export const Header = ({ title, showThemeToggle = true }: HeaderProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={classNames(
        "w-full h-8 draggable-frame border-b flex items-center px-4",
        theme.bg3,
        theme.border3,
        theme.text2,
      )}
    >
      <div className="w-1/3 grow" />
      <div className="w-1/3 justify-center items-center text-center gap-x-1 flex">
        <div>{title}</div>
      </div>
      <div className="w-1/3 flex space-x-1 justify-end">
        {showThemeToggle && <ThemeToggle />}
      </div>
    </div>
  );
};
