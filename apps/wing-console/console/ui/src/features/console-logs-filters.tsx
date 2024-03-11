import { MagnifyingGlassIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import { Button, Input, Listbox } from "@wingconsole/design-system";
import type { LogLevel } from "@wingconsole/server";
import debounce from "lodash.debounce";
import { memo, useCallback, useEffect, useState } from "react";

const logLevels = ["verbose", "info", "warn", "error"] as const;

const logLevelNames = {
  verbose: "Verbose",
  info: "Info",
  warn: "Warnings",
  error: "Errors",
} as const;

export interface ConsoleLogsFiltersProps {
  selectedLogTypeFilters: LogLevel[];
  setSelectedLogTypeFilters: (types: LogLevel[]) => void;
  clearLogs: () => void;
  isLoading: boolean;
  onSearch: (search: string) => void;
}

export const ConsoleLogsFilters = memo(
  ({
    selectedLogTypeFilters,
    setSelectedLogTypeFilters,
    clearLogs,
    isLoading,
    onSearch,
  }: ConsoleLogsFiltersProps) => {
    const [searchText, setSearchText] = useState("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedOnSearch = useCallback(debounce(onSearch, 300), [onSearch]);
    useEffect(() => {
      debouncedOnSearch(searchText);
    }, [debouncedOnSearch, searchText]);

    const [defaultSelection, setDefaultSelection] = useState<string[]>();
    const [combinationName, setCombinationName] = useState<string>();

    useEffect(() => {
      if (selectedLogTypeFilters.length === 4) {
        setCombinationName("All levels");
      } else if (
        selectedLogTypeFilters.length === 3 &&
        selectedLogTypeFilters.includes("verbose") === false
      ) {
        setCombinationName("Default levels");
      } else if (selectedLogTypeFilters.length === 0) {
        setCombinationName("Hide all");
      } else if (
        selectedLogTypeFilters.length === 1 &&
        selectedLogTypeFilters[0]
      ) {
        setCombinationName(`${logLevelNames[selectedLogTypeFilters[0]]} only`);
      } else {
        setCombinationName("Custom levels");
      }
    }, [selectedLogTypeFilters]);

    useEffect(() => {
      setDefaultSelection(selectedLogTypeFilters);
    }, [selectedLogTypeFilters]);

    return (
      <div className="flex px-2 space-x-2 pt-1">
        <Button
          icon={NoSymbolIcon}
          className="px-1.5"
          onClick={clearLogs}
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

        <Listbox
          label={combinationName}
          items={logLevels.map((type) => ({
            value: type,
            label: logLevelNames[type],
          }))}
          selected={selectedLogTypeFilters}
          onChange={setSelectedLogTypeFilters as any}
          defaultSelection={defaultSelection}
        />
      </div>
    );
  },
);
