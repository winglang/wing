import classNames from "classnames";
import type { KeyboardEvent, Ref } from "react";
import { useState, useEffect, useCallback, forwardRef } from "react";

import { useTheme } from "./theme-provider.js";

export interface TreeEntry {
  id: string;
  name: string;
}

export interface TreeProps {
  currentRef?: Ref<HTMLButtonElement>;
  entries: TreeEntry[];
  onSelectionChange: (entries: string[]) => void;
  onCurrentChange?: (index: string | undefined) => void;
  onOpenEntry?: () => void;
  className?: string;
  selectedEntries: string[];
  dataTestid?: string;
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
  const selectTo = useCallback(
    (index: number, { additive }: { additive: boolean }) => {
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

        onSelectionChange([
          ...new Set([
            ...newShiftEntries,
            ...selectedEntries.filter(
              (newEntry) => !previousRangeSelection.includes(newEntry),
            ),
          ]),
        ]);
        setPreviousRangeSelection(newShiftEntries);
      } else {
        setRangeOrigin(index);
        setPreviousRangeSelection([]);
        onSelectionChange([entry.id]);
      }

      setCurrent(index);
    },
    [
      entries,
      onSelectionChange,
      previousRangeSelection,
      rangeOrigin,
      selectedEntries,
    ],
  );

  /**
   * Toggles whether the entry [index] is selected or not.
   */
  const toggleOne = useCallback(
    (index: number) => {
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
        setCurrent(index);
      }
    },
    [entries, onSelectionChange, selectedEntries],
  );

  /**
   * Selects all entries.
   */
  const selectAll = useCallback(() => {
    onSelectionChange(entries.map((entry) => entry.id));
    setCurrent(entries.length - 1);
  }, [entries, onSelectionChange]);

  /**
   * Unselects all entries.
   */
  const unselectAll = useCallback(() => {
    onSelectionChange([]);
    setCurrent(-1);
  }, [onSelectionChange]);

  /**
   * Selects the entry previous to the current entry.
   */
  const selectPrevious = useCallback(
    ({ additive }: { additive: boolean }) => {
      selectTo(current - 1, { additive });
    },
    [current, selectTo],
  );

  /**
   * Selects the entry next to the current entry.
   */
  const selectNext = useCallback(
    ({ additive }: { additive: boolean }) => {
      selectTo(current + 1, { additive });
    },
    [current, selectTo],
  );

  return {
    selectTo,
    selectPrevious,
    selectNext,
    toggleOne,
    selectAll,
    unselectAll,
  };
};

interface TreeItemProps {
  entry: TreeEntry;
  index: number;
  selected: boolean;
  previousSelected: boolean;
  nextSelected: boolean;
  active: boolean;
  toggleOne: (index: number) => void;
  selectTo: (index: number, options: { additive: boolean }) => void;
  dataTestid?: string;
}

const TreeItem = forwardRef<HTMLButtonElement, TreeItemProps>(
  (
    {
      active,
      entry,
      index,
      selected,
      selectTo,
      previousSelected,
      nextSelected,
      toggleOne,
      dataTestid,
    },
    ref,
  ) => {
    return (
      // TODO: Fix a11y
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <button
        ref={ref}
        className={classNames(
          "px-2 w-full truncate py-0.5",
          "text-left text-sm cursor-default focus:outline-none",
          selected && [
            !active && "bg-slate-200 dark:bg-slate-750",
            active && "bg-sky-500 text-white",
            previousSelected && "rounded-t",
            nextSelected && "rounded-b",
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
        data-testid={`${dataTestid}-entry-${entry.name}`}
      >
        {entry.name}
      </button>
    );
  },
);

export const Tree = ({
  currentRef,
  entries,
  selectedEntries,
  onSelectionChange,
  onCurrentChange,
  onOpenEntry,
  className,
  dataTestid,
}: TreeProps) => {
  const { theme } = useTheme();

  const [active, setActive] = useState(false);
  const [current, setCurrent] = useState<string | undefined>();
  const currentChange = useCallback(
    (index: string | undefined) => {
      setCurrent(index);
      onCurrentChange?.(index);
    },
    [setCurrent, onCurrentChange],
  );

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
    onCurrentChange: currentChange,
  });

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTableElement>) => {
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
        case " ": {
          event.preventDefault();
          onOpenEntry?.();
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
    },
    [onOpenEntry, onSelectionChange, selectAll, selectNext, selectPrevious],
  );

  const activate = useCallback(() => setActive(true), []);
  const deactivate = useCallback(() => setActive(false), []);

  return (
    // TODO: Fix a11y
    //  eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={classNames(
        theme.bgInput,
        theme.textInput,
        theme.focusWithin,
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
      onClick={unselectAll}
      onFocus={activate}
      onBlur={deactivate}
    >
      {entries.map((entry, index) => {
        const previous = entries[index - 1];
        const next = entries[index + 1];
        return (
          <TreeItem
            ref={entry.id === current ? currentRef : undefined}
            key={entry.name}
            entry={entry}
            index={index}
            selected={selectedEntries.includes(entry.id)}
            previousSelected={
              (previous && selectedEntries.includes(previous.id)) ?? false
            }
            nextSelected={(next && selectedEntries.includes(next.id)) ?? false}
            active={active}
            toggleOne={toggleOne}
            selectTo={selectTo}
            dataTestid={dataTestid}
          />
        );
      })}
    </div>
  );
};
