import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";

import { Button } from "../design-system/Button.js";
import { TestsContext } from "../utils/tests-context.js";

export const MapToolbarMenu = () => {
  const { showTests, setShowTests } = useContext(TestsContext);
  return (
    <div className="flex grow justify-end items-center h-full px-2">
      <Button
        icon={showTests ? EyeSlashIcon : EyeIcon}
        onClick={() => setShowTests(!showTests)}
        label={showTests ? "Hide tests" : "Show tests"}
        transparent
        className="w-[90px] hover:bg-slate-100 font-normal"
      />
    </div>
  );
};
