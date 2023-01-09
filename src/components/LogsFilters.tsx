import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

import { LogLevel } from "../../electron/main/consoleLogger.js";
import { Button } from "../design-system/Button.js";

const logLevels = ["verbose", "info", "warn", "error"] as const;
const logLevelNames: Record<(typeof logLevels)[number], string> = {
  verbose: "Verbose",
  info: "Info",
  warn: "Warnings",
  error: "Errors",
};

export interface LogsFiltersProps {
  selected: LogLevel[];
  onChange?: (selected: LogLevel[]) => void;
}

export default function LogsFilters({ selected, onChange }: LogsFiltersProps) {
  const [combinationName, setCombinationName] = useState<string>();
  useEffect(() => {
    if (selected.length === 4) {
      setCombinationName("All levels");
    } else if (
      selected.length === 3 &&
      selected.includes("verbose") === false
    ) {
      setCombinationName("Default levels");
    } else if (selected.length === 0) {
      setCombinationName("Hide all");
    } else if (selected.length === 1) {
      setCombinationName(`${logLevelNames[selected[0]!]} only`);
    } else {
      setCombinationName("Custom levels");
    }
  }, [selected]);

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    // eslint-disable-next-line unicorn/no-null
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(
    // eslint-disable-next-line unicorn/no-null
    null,
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: "fixed",
  });

  const [root] = useState(() => document.createElement("div"));
  useEffect(() => {
    document.body.append(root);
    return () => root.remove();
  }, []);

  return (
    <Listbox value={selected} onChange={(types) => onChange?.(types)} multiple>
      <div className="relative mt-1 inline-block">
        <div ref={setReferenceElement}>
          <Listbox.Button as={Button} className="relative pr-8">
            <span className="block truncate">{combinationName}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5">
              <ChevronUpDownIcon
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
        </div>

        {createPortal(
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              ref={setPopperElement}
              className="z-30"
              style={styles.popper}
              {...attributes.popper}
            >
              <Listbox.Options className="z-10 m-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <li
                  className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-indigo-50 hover:text-indigo-900"
                  onClick={() => onChange?.(["info", "warn", "error"])}
                >
                  <span className={`block truncate font-normal`}>Default</span>
                </li>

                <div className="relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-slate-300"></div>
                  </div>
                </div>

                {logLevels.map((logType, logTypeIndex) => (
                  <Listbox.Option
                    key={logTypeIndex}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-indigo-50 text-indigo-900"
                          : "text-gray-900"
                      }`
                    }
                    value={logType}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {logLevelNames[logType]}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                            <CheckIcon className="h-4 w-4" aria-hidden="true" />
                          </span>
                        ) : undefined}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Transition>,
          root,
        )}
      </div>
    </Listbox>
  );
}
