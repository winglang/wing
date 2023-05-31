import classNames from "classnames";
import { uniq } from "lodash";
import { useState, KeyboardEvent, useEffect } from "react";

import { useTheme } from "./theme-provider.js";

export interface TreeEntry {
  id: string;
  name: string;
}

export interface TreeProps {
  entries: TreeEntry[];
  onSelectionChange: (entries: string[]) => void;
  onCurrentChange?: (index: string | undefined) => void;
  className?: string;
  selectedEntries: string[];
}

interface UseSelectionRangeOptions {
  entries: TreeEntry[];
  onSelectionChange: (entries: string[]) => void;
  onCurrentChange?: (index: string | undefined) => void;
  selectedEntries: string[];
}

const useSelectionRange = ({
  entries,
  selectedEntries,
  onSelectionChange,
  onCurrentChange,
}: UseSelectionRangeOptions) => {
  const [current, setCurrent] = useState(-1);
  useEffect(() => {
    onCurrentChange?.(entries[current]?.id);
  }, [current, entries, onCurrentChange]);

  const [rangeOrigin, setRangeOrigin] = useState(-1);
  const [previousRangeSelection, setPreviousRangeSelection] = useState<
    string[]
  >([]);

  /**
   * Selects a range of entries from the [rangeOrigin] to [index].
   *
   * Additive will add the entries to the current selection.
   */
  const selectTo = (index: number, { additive }: { additive: boolean }) => {
    const entry = entries[index];
    if (!entry) {
      return;
    }

    if (additive && rangeOrigin !== -1) {
      const slice = {
        start: Math.min(rangeOrigin, index),
        end: Math.max(rangeOrigin, index),
      };

      const newShiftEntries = entries
        .slice(slice.start, slice.end + 1)
        .map((newEntry) => newEntry.id);

      onSelectionChange(
        uniq([
          ...newShiftEntries,
          ...selectedEntries.filter(
            (newEntry) => !previousRangeSelection.includes(newEntry),
          ),
        ]),
      );
      setPreviousRangeSelection(newShiftEntries);
    } else {
      setRangeOrigin(index);
      setPreviousRangeSelection([]);
      onSelectionChange([entry.id]);
    }

    setCurrent(index);
  };

  /**
   * Toggles whether the entry [index] is selected or not.
   */
  const toggleOne = (index: number) => {
    const entry = entries[index];
    if (!entry) {
      return;
    }

    setRangeOrigin(index);
    setPreviousRangeSelection([]);
    if (selectedEntries.includes(entry.id)) {
      onSelectionChange(
        selectedEntries.filter((current) => current !== entry.id),
      );
      setCurrent(-1);
    } else {
      onSelectionChange([...selectedEntries, entry.id]);
      // setCurrent(index);
    }
  };

  /**
   * Selects all entries.
   */
  const selectAll = () => {
    onSelectionChange(entries.map((entry) => entry.id));
    setCurrent(entries.length - 1);
  };

  /**
   * Unselects all entries.
   */
  const unselectAll = () => {
    onSelectionChange([]);
    setCurrent(-1);
  };

  /**
   * Selects the entry previous to the current entry.
   */
  const selectPrevious = ({ additive }: { additive: boolean }) => {
    selectTo(current - 1, { additive });
  };

  /**
   * Selects the entry next to the current entry.
   */
  const selectNext = ({ additive }: { additive: boolean }) => {
    selectTo(current + 1, { additive });
  };

  return {
    selectTo,
    selectPrevious,
    selectNext,
    toggleOne,
    selectAll,
    unselectAll,
  };
};

export const Tree = ({
  entries,
  selectedEntries,
  onSelectionChange,
  onCurrentChange,
  className,
}: TreeProps) => {
  const { theme } = useTheme();

  const {
    selectTo,
    selectNext,
    selectPrevious,
    toggleOne,
    selectAll,
    unselectAll,
  } = useSelectionRange({
    entries,
    selectedEntries,
    onSelectionChange,
    onCurrentChange,
  });

  const onKeyDown = (event: KeyboardEvent<HTMLTableElement>) => {
    switch (event.key) {
      case "Escape": {
        onSelectionChange([]);
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        selectNext({ additive: event.shiftKey });
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        selectPrevious({ additive: event.shiftKey });
        break;
      }
      case "a": {
        if (event.metaKey || event.ctrlKey) {
          event.preventDefault();
          selectAll();
        }
        break;
      }
    }
  };

  return (
    // TODO: Fix a11y
    //  eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={classNames(
        theme.bgInput,
        theme.textInput,
        theme.focusInput,
        theme.borderInput,
        "outline-none rounded border",
        "transition ease-in-out group",
        "p-1",
        className,
      )}
      // TODO: Fix a11y
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      onKeyDown={onKeyDown}
      onClick={() => {
        unselectAll();
      }}
    >
      {entries.map((entry, index) => {
        const selected = selectedEntries.includes(entry.id);
        const previous = entries[index - 1];
        const next = entries[index + 1];
        return (
          // TODO: Fix a11y
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            key={entry.name}
            className={classNames(
              "px-2 group w-full truncate py-0.5",
              selected && [
                "bg-slate-200 dark:bg-slate-750",
                "group-focus:bg-sky-500 group-focus:text-white",
                !(previous && selectedEntries.includes(previous.id)) &&
                  "rounded-t",
                !(next && selectedEntries.includes(next.id)) && "rounded-b",
              ],
              !selected && [
                "rounded",
                index % 2 === 0 && "bg-slate-100 dark:bg-slate-850",
              ],
            )}
            onClick={async (event) => {
              event.stopPropagation();
              if (event.metaKey || event.ctrlKey) {
                toggleOne(index);
              } else {
                selectTo(index, { additive: event.shiftKey });
              }
            }}
          >
            {entry.name}
          </div>
        );
      })}
    </div>
  );
};
