import type { FunctionComponent, PropsWithChildren } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface SelectionItem {
  id: string;
  children?: SelectionItem[];
}

const Context = createContext({
  setAvailableItems(items: SelectionItem[]) {},
  selectedItems: new Array<string>(),
  setSelectedItems(items: string[]) {},
  expandedItems: new Array<string>(),
  setExpandedItems(items: string[]) {},
  toggle(itemId: string) {},
  expandAll() {},
  collapseAll() {},
  expand(itemId: string) {},
  collapse(itemId: string) {},
  selectedEdgeId: undefined as string | undefined,
  setSelectedEdgeId(edgeId: string | undefined) {},
});

export const SelectionContextProvider: FunctionComponent<PropsWithChildren> = (
  props,
) => {
  const [availableItems, setAvailableItems] = useState(
    () => new Array<SelectionItem>(),
  );

  const [selectedItems, setSelectedItems] = useState(() => ["root"]);
  const [expandedItems, setExpandedItems] = useState(() => new Array<string>());

  const toggle = useCallback((itemId: string) => {
    setExpandedItems(([...openedMenuItems]) => {
      const index = openedMenuItems.indexOf(itemId);
      if (index !== -1) {
        openedMenuItems.splice(index, 1);
        return openedMenuItems;
      }

      openedMenuItems.push(itemId);
      return openedMenuItems;
    });
  }, []);

  const expandAll = useCallback(() => {
    const itemIds = [];
    const stack = [...availableItems];
    while (stack.length > 0) {
      const item = stack.pop();
      if (!item) {
        continue;
      }

      itemIds.push(item.id);

      if (item.children) {
        stack.push(...item.children);
      }
    }

    setExpandedItems(itemIds);
  }, [availableItems]);

  const collapseAll = useCallback(() => {
    setExpandedItems([]);
  }, []);

  const expand = useCallback((itemId: string) => {
    setExpandedItems(([...openedMenuItems]) => {
      const index = openedMenuItems.indexOf(itemId);
      if (index !== -1) {
        return openedMenuItems;
      }

      openedMenuItems.push(itemId);
      return openedMenuItems;
    });
  }, []);

  const collapse = useCallback((itemId: string) => {
    setExpandedItems(([...openedMenuItems]) => {
      const index = openedMenuItems.indexOf(itemId);
      if (index === -1) {
        return openedMenuItems;
      }

      openedMenuItems.splice(index, 1);
      return openedMenuItems;
    });
  }, []);

  const [selectedEdgeId, setSelectedEdgeId] = useState<string>();

  return (
    <Context.Provider
      value={{
        setAvailableItems,
        selectedItems,
        setSelectedItems: useCallback((selectedItems) => {
          setSelectedEdgeId(undefined);
          setSelectedItems(selectedItems);
        }, []),
        expandedItems,
        setExpandedItems,
        toggle,
        expandAll,
        collapseAll,
        expand,
        collapse,
        selectedEdgeId,
        setSelectedEdgeId: useCallback((edgeId) => {
          setSelectedItems([]);
          setSelectedEdgeId(edgeId);
        }, []),
      }}
      {...props}
    />
  );
};

export const useSelectionContext = () => {
  return useContext(Context);
};
