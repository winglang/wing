import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";

import { Button } from "./button.js";
import { Combobox } from "./combobox.js";
import { useTheme } from "./theme-provider.js";

export interface KeyValueItem {
  key: string;
  value: string;
}

export const useKeyValueList = () => {
  const [items, setItems] = useState<KeyValueItem[]>([]);

  const addItem = useCallback((item: KeyValueItem) => {
    setItems((items) => [...items, item]);
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((items) => items.filter((_, index_) => index_ !== index));
  }, []);

  const editItem = useCallback((index: number, item: KeyValueItem) => {
    setItems((items) =>
      items.map((item_, index_) => (index_ === index ? item : item_)),
    );
  }, []);

  const removeAll = useCallback(() => {
    setItems([]);
  }, []);

  return {
    items,
    addItem,
    removeItem,
    editItem,
    removeAll,
    setItems,
  };
};

export interface KeyValueListProps {
  items: KeyValueItem[];
  onAddItem?: (item: KeyValueItem) => void;
  onRemoveItem?: (index: number) => void;
  onEditItem?: (index: number, item: KeyValueItem) => void;
  onKeyChange?: (value: string) => void;
  keyPlaceholder?: string;
  keysList?: string[];
  valuePlaceholder?: string;
  valuesList?: string[];
  disabled?: boolean;
  keyDisabled?: boolean;
  valueDisabled?: boolean;
  readonly?: boolean;
  className?: string;
  placeholder?: string;
}
export const KeyValueList = ({
  items,
  onAddItem,
  onRemoveItem,
  onEditItem,
  onKeyChange,
  keyPlaceholder = "Key",
  keysList,
  valuePlaceholder = "Value",
  valuesList,
  className,
  disabled = false,
  keyDisabled = false,
  valueDisabled = false,
  readonly = false,
  placeholder = "No items",
}: KeyValueListProps) => {
  const { theme } = useTheme();

  const [editItems, setEditItems] = useState<KeyValueItem[]>([]);

  useEffect(() => {
    if (readonly || !onAddItem) {
      setEditItems(items);
      return;
    }
    setEditItems([...items, { key: "", value: "" }]);
  }, [readonly, items]);

  const onItemChange = (index: number, item: KeyValueItem) => {
    if (index === items.length) {
      onAddItem?.(item);
      return;
    }
    onEditItem?.(index, item);
  };

  return (
    <div className={classNames("space-y-1", className)}>
      {editItems.map((item, index) => (
        <div key={index} className="gap-1 flex">
          <Combobox
            placeholder={keyPlaceholder}
            items={keysList?.map((value) => {
              return { label: value, value: value };
            })}
            value={item.key}
            onChange={(value) => {
              onKeyChange?.(value);
              onItemChange(index, {
                key: value,
                value: item.value,
              });
            }}
            inputClassName={classNames(
              theme.bgInput,
              theme.textInput,
              theme.focusInput,
              theme.borderInput,
              "px-2.5 py-1.5 text-xs outline-none w-36",
              "border rounded",
              "transition ease-in-out",
            )}
            disabled={disabled}
            readonly={readonly || keyDisabled}
            filter={false}
            showSelected={false}
          />

          <Combobox
            placeholder={valuePlaceholder}
            items={valuesList?.map((value) => {
              return { label: value, value: value };
            })}
            value={item.value}
            onChange={(value) => {
              onItemChange(index, {
                key: item.key,
                value: value,
              });
            }}
            className="w-full"
            inputClassName={classNames(
              theme.bgInput,
              theme.textInput,
              theme.focusInput,
              theme.borderInput,
              "px-2.5 py-1.5 text-xs outline-none grow flex min-w-0 w-full",
              "border rounded",
              "transition ease-in-out",
            )}
            disabled={disabled}
            readonly={readonly || valueDisabled}
            filter={false}
            showSelected={false}
          />

          {!readonly && index === items.length && (
            <Button className="px-2 grow-0" icon={PlusIcon} disabled />
          )}
          {!readonly && index !== items.length && onRemoveItem && (
            <Button
              className="px-2"
              onClick={() => onRemoveItem(index)}
              icon={TrashIcon}
              disabled={disabled}
            />
          )}
        </div>
      ))}
      {editItems.length === 0 && (
        <div
          className={classNames(
            theme.bgInput,
            theme.text2,
            theme.borderInput,
            "flex-1 text-center text-xs",
            "px-2.5 py-1.5 rounded border",
          )}
        >
          {placeholder}
        </div>
      )}
    </div>
  );
};
