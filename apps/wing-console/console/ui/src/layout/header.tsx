import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useTheme, Button } from "@wingconsole/design-system";
import classNames from "classnames";

import { DiscordButton } from "./discord-button.js";
import { RestartButton } from "./restart-button.js";
import { ThemeToggle } from "./theme-toggle.js";

export interface HeaderProps {
  title: string;
  showDiscordButton?: boolean;
  onRestart?: () => void;
}

export const Header = ({
  title,
  showDiscordButton = true,
  onRestart,
}: HeaderProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={classNames(
        "w-full h-8 draggable-frame flex items-center px-2",
        theme.bg3,
        theme.text2,
      )}
    >
      <div className="w-1/3 grow flex items-center gap-x-1 text-sm">
        {showDiscordButton && <DiscordButton />}
      </div>
      <div className="w-1/3 justify-center items-center text-center gap-x-1 flex text-sm">
        {title}
      </div>
      <div className="w-1/3 flex space-x-2 justify-end">
        <RestartButton onRestart={onRestart} />
      </div>
    </div>
  );
};
