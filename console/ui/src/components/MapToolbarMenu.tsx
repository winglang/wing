import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ToolbarButton, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { useContext } from "react";

import { Button } from "../design-system/Button.js";
import { TestsContext } from "../utils/tests-context.js";

export const MapToolbarMenu = () => {
  const { theme } = useTheme();
  const { showTests, setShowTests } = useContext(TestsContext);
  const Icon = showTests ? EyeSlashIcon : EyeIcon;
  return (
    <div className="flex grow justify-end items-center h-full px-2">
      <ToolbarButton onClick={() => setShowTests(!showTests)}>
        <Icon className="w-4 h-4" />
        {showTests ? "Hide tests" : "Show tests"}
      </ToolbarButton>
    </div>
  );
};
