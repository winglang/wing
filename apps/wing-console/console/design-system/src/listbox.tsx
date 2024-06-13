import { Listbox as HeadlessListbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import classNames from "classnames";
import type { ForwardRefExoticComponent, SVGProps } from "react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

import { Button } from "./button.js";
import { useTheme } from "./theme-provider.js";

export interface ListboxItem {
  value: string;
  label: string;
  icon?: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
}

export interface ListboxProps {
  label?: string;
  renderLabel?: (selected?: string[]) => JSX.Element;
  icon?: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
  className?: string;
  items: ListboxItem[];
  defaultSelection?: string[];
  transparent?: boolean;
  selected?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
  title?: string;
  defaultLabel?: string;
  showSearch?: boolean;
}

export const Listbox = ({
  label,
  renderLabel,
  icon,
  className,
  items,
  defaultSelection,
  transparent,
  selected,
  onChange,
  disabled = false,
  title = "",
  defaultLabel = "Default",
  showSearch = false,
}: ListboxProps) => {
  const { theme } = useTheme();

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
    placement: "bottom-end",
  });

  const [root] = useState(() => document.createElement("div"));
  useEffect(() => {
    document.body.append(root);
    return () => root.remove();
  }, [root]);

  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    if (search === "") {
      return items;
    }
    return items.filter((item) =>
      item.label.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
    );
  }, [search, items]);

  const showDefaultOption = useMemo(() => {
    return (
      defaultSelection &&
      defaultLabel.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }, [defaultSelection, defaultLabel, search]);

  return (
    <HeadlessListbox
      value={selected}
      onChange={(values) => onChange?.(values)}
      multiple={true}
      disabled={disabled}
    >
      <div className="relative inline-block">
        <div ref={setReferenceElement}>
          <HeadlessListbox.Button
            as={Button}
            className={classNames(
              "relative",
              label && "pr-8 min-w-[8rem]",
              !label && "pr-6",
              className,
            )}
            icon={icon}
            transparent={transparent}
            title={title}
          >
            {renderLabel && (
              <span className="block truncate">{renderLabel(selected)}</span>
            )}
            {!renderLabel && label && (
              <span className="block truncate">{label}</span>
            )}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5">
              <ChevronUpDownIcon
                className={classNames(theme.textInput, "h-4 w-4")}
                aria-hidden="true"
              />
            </span>
          </HeadlessListbox.Button>
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
              <HeadlessListbox.Options
                className={classNames(
                  theme.bgInput,
                  "z-10 m-1 w-full rounded-md",
                  "py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 outline-none",
                )}
              >
                {showSearch && (
                  <div className="pb-1">
                    <div className="px-1 relative">
                      <div className="pointer-events-none absolute inset-y-0 left-1 flex items-center pl-2">
                        <MagnifyingGlassIcon
                          className={classNames("size-4", theme.text2)}
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="text"
                        className={classNames(
                          theme.borderInput,
                          "pl-8",
                          "inline-flex gap-2 items-center px-2.5 py-1.5 border text-xs rounded",
                          "outline-none w-full shadow-inner",
                          theme.bg3,
                          theme.textInput,
                          theme.focusInput,
                        )}
                        placeholder="Search..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="overflow-auto max-h-80">
                  {showDefaultOption && (
                    <>
                      {/* TODO: Fix a11y */}
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                      <li
                        className={classNames(
                          "relative cursor-default select-none py-2 pl-10 pr-4",
                          theme.bgInputHover,
                          theme.text1,
                        )}
                        onClick={() => onChange?.(defaultSelection ?? [])}
                      >
                        <span
                          className={classNames("block truncate font-normal")}
                        >
                          {defaultLabel}
                        </span>
                        {defaultSelection?.length === 0 &&
                          selected?.length === 0 && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                              <CheckIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                      </li>
                      <div
                        className={classNames(
                          "border-slate-100 dark:border-slate-700",
                          "w-full border-t",
                        )}
                      />
                    </>
                  )}

                  {filteredItems.length === 0 &&
                    search !== "" &&
                    !showDefaultOption && (
                      <div
                        className={classNames(
                          theme.text2,
                          "py-2",
                          "w-full text-center",
                        )}
                      >
                        No items found
                      </div>
                    )}

                  {filteredItems.map((item, index) => (
                    <HeadlessListbox.Option
                      key={index}
                      className={({ active }) =>
                        classNames(
                          "relative cursor-default select-none py-2 pl-10 pr-4",
                          active && theme.bgInputHover,
                        )
                      }
                      value={item.value}
                    >
                      <span
                        className={classNames(
                          "truncate flex items-center gap-2",
                          selected?.includes(item.value)
                            ? theme.text1
                            : "text-slate-850 dark:text-slate-300",
                        )}
                      >
                        {item.icon && (
                          <item.icon
                            className={classNames("size-4", theme.text2)}
                          />
                        )}
                        {item.label}
                      </span>
                      {selected?.includes(item.value) && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                          <CheckIcon className="size-4" aria-hidden="true" />
                        </span>
                      )}
                    </HeadlessListbox.Option>
                  ))}
                </div>
              </HeadlessListbox.Options>
            </div>
          </Transition>,
          root,
        )}
      </div>
    </HeadlessListbox>
  );
};
