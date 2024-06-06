import { on } from "node:events";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Menu, useTheme, MenuIcon } from "@wingconsole/design-system";
import classNames from "classnames";

import { DiscordButton } from "./discord-button.js";

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
      <div className="w-1/3 grow" />
      <div className="w-1/3 justify-center items-center text-center gap-x-1 flex">
        <div>{title}</div>
      </div>
      <div className="w-1/3 flex space-x-2 justify-end">
        {showDiscordButton && <DiscordButton />}
        {onRestart && (
          <Menu
            btnClassName={classNames(theme.bgInputHover, "rounded-sm")}
            icon={
              <MenuIcon
                className={classNames("size-6 transition-all p-1", theme.text2)}
              />
            }
            items={[
              {
                label: "Restart Simulator",
                icon: <ArrowPathIcon className="size-5" />,
                onClick: () => {
                  onRestart();
                },
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};
