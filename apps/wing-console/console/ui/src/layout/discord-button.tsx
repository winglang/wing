import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

import { DiscordIcon } from "./discord-icon.js";

const WING_DISCORD_URL = "https://t.winglang.io/discord";

const openDiscordLink = () => {
  open(WING_DISCORD_URL, "_blank");
};

export const DiscordButton = () => {
  const { theme } = useTheme();

  return (
    <button
      className={classNames(
        "font-medium flex focus:outline-none",
        "transition-color duration-300 cursor-pointer",
        "gap-x-1.5 p-1 items-center justify-center",
        theme.textInput,
        theme.bg2Hover,
      )}
      onClick={() => openDiscordLink()}
      title="Join our Discord community!"
    >
      <DiscordIcon className="size-4" />
    </button>
  );
};
