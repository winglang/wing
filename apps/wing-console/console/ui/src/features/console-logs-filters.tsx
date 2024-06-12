import { MagnifyingGlassIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import { Button, Input, Listbox } from "@wingconsole/design-system";
import type { LogLevel } from "@wingconsole/server";
import debounce from "lodash.debounce";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

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
  onSearch: (search: string) => void;
  resourceIds?: string[];
  selectedResourceIds: string[];
  setSelectedResourceIds: (ids: string[]) => void;
  resourceTypes?: string[];
  selectedResourceTypes: string[];
  setSelectedResourceTypes: (types: string[]) => void;
}

const getResourceIdLabel = (id: string) => id.replaceAll("root/Default/", "");

const getResourceTypeLabel = (type: string) =>
  type.replaceAll("@winglang/", "");

export const ConsoleLogsFilters = memo(
  ({
    selectedLogTypeFilters,
    setSelectedLogTypeFilters,
    clearLogs,
    onSearch,
    resourceIds,
    selectedResourceIds,
    setSelectedResourceIds,
    resourceTypes,
    selectedResourceTypes,
    setSelectedResourceTypes,
  }: ConsoleLogsFiltersProps) => {
    const [searchText, setSearchText] = useState("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedOnSearch = useCallback(debounce(onSearch, 300), [onSearch]);
    useEffect(() => {
      debouncedOnSearch(searchText);
    }, [debouncedOnSearch, searchText]);

    const [defaultLogTypeSelection] = useState(selectedLogTypeFilters);

    const logTypeLabel = useMemo(() => {
      if (selectedLogTypeFilters.length === 4) {
        return "All levels";
      } else if (
        selectedLogTypeFilters.length === 3 &&
        selectedLogTypeFilters.includes("verbose") === false
      ) {
        return "Default levels";
      } else if (selectedLogTypeFilters.length === 0) {
        return "Hide all";
      } else if (
        selectedLogTypeFilters.length === 1 &&
        selectedLogTypeFilters[0]
      ) {
        return `${logLevelNames[selectedLogTypeFilters[0]]} only`;
      } else {
        return "Custom levels";
      }
    }, [selectedLogTypeFilters]);

    const resourceIdsLabel = useMemo(() => {
      return selectedResourceIds.length === 0
        ? "All resources"
        : getResourceIdLabel(selectedResourceIds.join(", "));
    }, [selectedResourceIds]);

    const resourceTypesLabel = useMemo(() => {
      return selectedResourceTypes.length === 0
        ? "All types"
        : getResourceTypeLabel(selectedResourceTypes.join(", "));
    }, [selectedResourceTypes]);

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
          label={logTypeLabel}
          items={logLevels.map((type) => ({
            value: type,
            label: logLevelNames[type],
          }))}
          selected={selectedLogTypeFilters}
          onChange={setSelectedLogTypeFilters as any}
          defaultSelection={defaultLogTypeSelection}
        />

        {resourceTypes && (
          <Listbox
            className="max-w-[14rem]"
            title={resourceTypesLabel}
            label={resourceTypesLabel}
            items={resourceTypes.map((type) => ({
              label: getResourceTypeLabel(type),
              value: type,
            }))}
            selected={selectedResourceTypes}
            onChange={setSelectedResourceTypes}
            defaultLabel="All types"
            defaultSelection={[]}
          />
        )}

        {resourceIds && (
          <Listbox
            className="max-w-[14rem]"
            title={resourceIdsLabel}
            label={resourceIdsLabel}
            items={resourceIds.map((id) => ({
              label: getResourceIdLabel(id),
              value: id,
            }))}
            selected={selectedResourceIds}
            onChange={setSelectedResourceIds}
            defaultLabel="All resources"
            defaultSelection={[]}
          />
        )}
      </div>
    );
  },
);
