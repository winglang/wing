import { Combobox as HeadlessCombobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { useRef } from "react";
import { Fragment, useEffect, useState } from "react";

interface Item {
  label?: string;
  value: string;
}

export interface ComboboxProps {
  items?: Item[];
  value: string;
  onChange: (selected: string) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  emptyLabel?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  readonly?: boolean;
  filter?: boolean;
  showSelected?: boolean;
  renderItem?: (item: Item) => JSX.Element;
}

export const Combobox = ({
  items,
  value,
  onChange,
  onKeyUp,
  placeholder = "Select an option",
  emptyLabel,
  className = "relative",
  inputClassName,
  disabled = false,
  readonly = false,
  filter = true,
  showSelected = true,
  renderItem,
}: ComboboxProps) => {
  const { theme } = useTheme();

  const [filtered, setFiltered] = useState<Item[]>(items ?? []);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (items === undefined) {
      setFiltered([]);
      return;
    }
    if (value === "" || !filter) {
      setFiltered(items);
      return;
    }
    setFiltered(
      items.filter((item) => {
        return item.label?.toLowerCase().includes(value.toLowerCase());
      }),
    );
  }, [items, value, filter]);

  const internalOnChange = (selected: string) => {
    onChange(selected);
    inputRef.current?.focus();
  };

  return (
    <HeadlessCombobox value={value} onChange={internalOnChange}>
      {({ open }) => (
        <div className={classNames("inline-block", className)}>
          <div className="w-full">
            <HeadlessCombobox.Button
              ref={buttonRef}
              as="button"
              className="hidden"
            />
            <HeadlessCombobox.Input
              ref={inputRef}
              as="input"
              placeholder={placeholder}
              className={classNames(
                inputClassName,
                theme.bgInput,
                theme.textInput,
                theme.borderInput,
                readonly && [theme.text1, "opacity-70 select-text"],
              )}
              onChange={(event) => onChange(event.target.value)}
              onFocus={() => {
                if (!open) {
                  buttonRef.current?.click();
                }
              }}
              onClick={() => {
                if (!open) {
                  buttonRef.current?.click();
                }
              }}
              onKeyUp={onKeyUp}
              readOnly={readonly}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HeadlessCombobox.Options
              className={classNames(
                theme.bgInput,
                "z-20 absolute mt-1 max-h-60 w-full left-0 overflow-auto rounded-md py-1",
                "text-xs shadow-lg ring-1 ring-black ring-opacity-5 outline-none",
                !items?.length && "invisible",
                !emptyLabel && filtered.length === 0 && "invisible",
              )}
            >
              {emptyLabel && filtered.length === 0 ? (
                <div
                  className={classNames(
                    theme.text1,
                    "relative cursor-default select-none py-2",
                    !renderItem && {
                      "pl-8": showSelected,
                      "pl-4": !showSelected,
                    },
                  )}
                >
                  {emptyLabel}
                </div>
              ) : (
                filtered.map((item) => (
                  <HeadlessCombobox.Option
                    key={item.value}
                    className={({ active }) =>
                      classNames(
                        "relative cursor-default select-none py-2",
                        active && theme.bgInputHover,
                        !renderItem && {
                          "pl-8": showSelected,
                          "pl-4": !showSelected,
                        },
                      )
                    }
                    title={item.label ?? item.value}
                    value={item.value}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={classNames(
                            "block truncate",
                            selected && showSelected
                              ? "font-medium"
                              : "font-normal",
                          )}
                        >
                          {renderItem
                            ? renderItem(item)
                            : item.label ?? item.value}
                        </span>
                        {selected && showSelected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                            <CheckIcon className="h-4 w-4" aria-hidden="true" />
                          </span>
                        ) : undefined}
                      </>
                    )}
                  </HeadlessCombobox.Option>
                ))
              )}
            </HeadlessCombobox.Options>
          </Transition>
        </div>
      )}
    </HeadlessCombobox>
  );
};
