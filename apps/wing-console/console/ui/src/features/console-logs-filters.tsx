import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  getResourceIconComponent,
  Input,
  Listbox,
  useTheme,
} from "@wingconsole/design-system";
import type { LogLevel } from "@wingconsole/server";
import classNames from "classnames";
import debounce from "lodash.debounce";
import uniqby from "lodash.uniqby";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

const logLevels = ["verbose", "info", "warn", "error"] as const;

const logLevelNames = {
  verbose: "Verbose",
  info: "Info",
  warn: "Warnings",
  error: "Errors",
} as const;

interface Resource {
  id: string;
  type?: string;
}

export interface ConsoleLogsFiltersProps {
  selectedLogTypeFilters: LogLevel[];
  setSelectedLogTypeFilters: (types: LogLevel[]) => void;
  clearLogs: () => void;
  onSearch: (search: string) => void;
  resources?: Resource[];
  selectedResourceIds: string[];
  setSelectedResourceIds: (ids: string[]) => void;
  selectedResourceTypes: string[];
  setSelectedResourceTypes: (types: string[]) => void;
  onResetFilters: () => void;
  shownLogs: number;
  hiddenLogs: number;
}

const getResourceIdLabel = (id: string) => id;

const getResourceTypeLabel = (type?: string) =>
  type?.replaceAll("@winglang/", "") ?? "";

export const ConsoleLogsFilters = memo(
  ({
    selectedLogTypeFilters,
    setSelectedLogTypeFilters,
    clearLogs,
    onSearch,
    resources,
    selectedResourceIds,
    setSelectedResourceIds,
    selectedResourceTypes,
    setSelectedResourceTypes,
    onResetFilters,
    shownLogs,
    hiddenLogs,
  }: ConsoleLogsFiltersProps) => {
    const { theme } = useTheme();

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
        ? "All resource Ids"
        : getResourceIdLabel(selectedResourceIds.join(", "));
    }, [selectedResourceIds]);

    const resourceTypeItems = useMemo(() => {
      if (!resources) {
        return [];
      }
      const resourceTypes = uniqby(
        resources
          .sort((a, b) => a.type?.localeCompare(b.type ?? "") ?? 0)
          .filter((resource) => resource.type !== undefined),
        (resource) => resource.type,
      );

      return resourceTypes.map((resource) => ({
        label: getResourceTypeLabel(resource.type),
        value: resource.type ?? "",
        icon: getResourceIconComponent(resource.type),
      }));
    }, [resources]);

    const resourceTypesLabel = useMemo(() => {
      return selectedResourceTypes.length === 0
        ? "All types"
        : getResourceTypeLabel(selectedResourceTypes.join(", "));
    }, [selectedResourceTypes]);

    const resourceIdItems = useMemo(() => {
      if (!resources) {
        return [];
      }
      let filteredResources = resources;

      // filter resources by selected types
      if (selectedResourceTypes.length > 0) {
        filteredResources = resources.filter((resource) => {
          return (
            selectedResourceIds.includes(resource.id) ||
            selectedResourceTypes.includes(resource.type ?? "")
          );
        });
      }

      return filteredResources.map((resource) => ({
        label: getResourceIdLabel(resource.id),
        value: resource.id,
        icon: getResourceIconComponent(resource.type),
      }));
    }, [resources, selectedResourceTypes, selectedResourceIds]);

    const showIncompatibleResourceTypeWarning = useMemo(() => {
      if (!resources || selectedResourceTypes.length === 0) {
        return false;
      }
      return selectedResourceIds.some((id) => {
        const resource = resources?.find((r) => r.id === id);
        return resource && !selectedResourceTypes.includes(resource.type ?? "");
      });
    }, [resources, selectedResourceIds, selectedResourceTypes]);

    const showAllLogsHiddenWarning = useMemo(() => {
      return shownLogs === 0 && hiddenLogs > 0;
    }, [shownLogs, hiddenLogs]);

    return (
      <div className="flex flex-col gap-1">
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

          <Listbox
            className="max-w-[14rem]"
            title={resourceTypesLabel}
            label={resourceTypesLabel}
            items={resourceTypeItems}
            selected={selectedResourceTypes}
            onChange={setSelectedResourceTypes}
            defaultLabel="All types"
            defaultSelection={[]}
          />

          <Listbox
            className="max-w-[14rem]"
            title={resourceIdsLabel}
            label={resourceIdsLabel}
            items={resourceIdItems}
            selected={selectedResourceIds}
            onChange={setSelectedResourceIds}
            defaultLabel="All resource Ids"
            defaultSelection={[]}
          />

          <div className="flex grow justify-end">
            <Button
              onClick={onResetFilters}
              title="Clear filters"
              className="truncate"
            >
              Clear filters
            </Button>
          </div>
        </div>

        {(showIncompatibleResourceTypeWarning || showAllLogsHiddenWarning) && (
          <div
            className={classNames(
              "flex px-2 py-1 text-xs gap-2 justify-between",
              "text-slate-600 dark:text-slate-300 font-light",
              theme.bg4,
            )}
          >
            {showIncompatibleResourceTypeWarning ? (
              <div className="flex gap-1">
                <ExclamationTriangleIcon className="size-4" />
                The selected resource Ids and resource type filters are
                incompatible.
              </div>
            ) : (
              <div className="flex gap-1">
                <span>All logs entries are hidden by the current filters.</span>
                <span className="italic opacity-80">
                  ({hiddenLogs} hidden entries)
                </span>
              </div>
            )}

            <button
              onClick={onResetFilters}
              className={classNames(
                "text-xs underline cursor-pointer rounded",
                "px-1 outline-none transition-all",
                theme.focusInput,
                theme.text1,
                theme.text1Hover,
              )}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    );
  },
);
