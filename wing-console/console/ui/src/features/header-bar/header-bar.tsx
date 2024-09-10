import { Select } from "@headlessui/react";
import { BeakerIcon } from "@heroicons/react/24/solid";
import {
  useTheme,
  Loader,
  Listbox,
  Combobox,
  // Select,
} from "@wingconsole/design-system";
import type { ConsoleEnvironmentId, State } from "@wingconsole/server";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";

import { trpc } from "../../trpc.js";
import { useConsoleEnvironment } from "../console-environment-context/console-environment-context.js";

import { DiscordButton } from "./discord-button.js";
import { ResetButton } from "./reset-button.js";

export interface HeaderBarProps {
  cloudAppState: State;
}

export const HeaderBar = ({ cloudAppState }: HeaderBarProps) => {
  const { theme } = useTheme();
  const loading =
    cloudAppState === "loadingSimulator" || cloudAppState === "compiling";

  const renderResourceIdsLabel = useCallback((selected?: string[]) => {
    if (!selected || selected.length === 0) {
      return <span className="truncate">Local</span>;
    }

    const type = selected[0] as string;
    return (
      <span className="flex items-center truncate gap-1">
        <span className="truncate">{type.length > 0 ? type : "Local"}</span>
      </span>
    );
  }, []);

  const listEnvironments = trpc["environments.listEnvironments"].useQuery();
  const environments = useMemo(() => {
    return (
      listEnvironments.data?.environments.map((environment) => ({
        label: environment.name,
        value: environment.id,
      })) ?? []
    );
  }, [listEnvironments.data]);

  const { consoleEnvironment, setConsoleEnvironment } = useConsoleEnvironment();

  const activateEnvironment = trpc["environments.activate"].useMutation();

  const onChange = useCallback(
    (selected: string[]) => {
      const environmentId =
        (selected.at(-1) as ConsoleEnvironmentId | undefined) ?? "local";
      setConsoleEnvironment(environmentId);
      activateEnvironment.mutate({
        environmentId,
      });
    },
    [activateEnvironment, setConsoleEnvironment],
  );

  return (
    <div className="relative">
      <header
        className={classNames(
          theme.bg1,
          theme.text1,
          theme.border3,
          "px-2 flex gap-2 items-center text-2xs w-full relative z-10",
        )}
      >
        <div className="w-full flex gap-2 items-center py-1">
          <div className="flex gap-1 items-center">
            <Listbox
              items={environments}
              selected={[consoleEnvironment]}
              renderLabel={renderResourceIdsLabel}
              onChange={onChange}
              // defaultLabel="Local"
              // defaultSelection={[""]}
            />
            {/* <Combobox value="" items={[]} onChange={() => {}} /> */}
            {/* <Select items={[{ value: "a" }, { value: "b" }]} value="a" /> */}

            {/* <Select name="status" aria-label="Project status">
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="delayed">Delayed</option>
            <option value="canceled">Canceled</option>
          </Select> */}
            <ResetButton disabled={loading} />
          </div>
          <div className="grow"></div>
          <DiscordButton />
        </div>
      </header>

      {consoleEnvironment !== "local" && (
        <div className="absolute inset-x-0 bottom-0 z-50">
          <div className="relative w-full">
            <div className="absolute inset-x-0 top-0 w-full h-0.5 bg-yellow-300 dark:bg-yellow-400"></div>

            <div className="absolute inset-x-0 top-0">
              <div className="w-full flex justify-around">
                <div className="px-2 bg-yellow-300 dark:bg-yellow-400 rounded-b text-sm font-normal text-slate-900 flex items-center gap-1.5">
                  <BeakerIcon className="h-4 w-4 inline-block" />
                  {/* Test environment [{selectedEnvironment?.label}] */}
                  {consoleEnvironment}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
