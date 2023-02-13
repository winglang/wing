import { MagnifyingGlassIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useState } from "react";

import { LogLevel } from "../../electron/main/consoleLogger.js";
import { Button } from "../design-system/Button.js";
import { Input } from "../design-system/Input.js";

import LogsFilters from "./LogsFilters.js";

export interface ConsoleFiltersProps {
  selectedLogTypeFilters: LogLevel[];
  setSelectedLogTypeFilters: (types: LogLevel[]) => void;
  clearLogs: () => void;
  isLoading: boolean;
  onSearch: (search: string) => void;
}
export const ConsoleFilters = ({
  selectedLogTypeFilters,
  setSelectedLogTypeFilters,
  clearLogs,
  isLoading,
  onSearch,
}: ConsoleFiltersProps) => {
  const [searchText, setSearchText] = useState("");

  const debouncedOnSearch = useCallback(debounce(onSearch, 300), [onSearch]);
  useEffect(() => {
    debouncedOnSearch(searchText);
  }, [searchText]);

  return (
    <div className="flex px-4 space-x-2 pt-1">
      <Button
        icon={NoSymbolIcon}
        className="px-1.5"
        onClick={() => clearLogs()}
        title="Clear logs"
      />

      <Input
        value={searchText}
        className="min-w-[14rem]"
        leftIcon={MagnifyingGlassIcon}
        type="text"
        placeholder="Filter..."
        onChange={(event) => setSearchText(event.target.value)}
      />

      <LogsFilters
        selected={selectedLogTypeFilters}
        onChange={(types) => setSelectedLogTypeFilters(types)}
        disabled={isLoading}
      />
    </div>
  );
};
