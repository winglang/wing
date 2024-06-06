import classNames from "classnames";

import { DiscordIcon } from "./discord-icon.js";

const WING_DISCORD_URL = "https://t.winglang.io/discord";

const openDiscordLink = () => {
  open(WING_DISCORD_URL, "_blank");
};

export const DiscordButton = () => {
  return (
    <button
      className={classNames(
        "rounded-3xl font-medium flex focus:outline-none",
        "hover:bg-slate-200 hover:dark:bg-slate-600",
        "transition-color duration-300 cursor-pointer",
        "gap-x-1.5 p-1 items-center justify-center",
        "text-white",
        "bg-[#5661eb] hover:bg-[#4449c0]",
      )}
      onClick={() => openDiscordLink()}
    >
      <DiscordIcon className="size-4" />
    </button>
  );
};
