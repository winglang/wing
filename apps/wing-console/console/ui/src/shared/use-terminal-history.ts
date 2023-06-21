import { useCallback, useState } from "react";

import { TerminalHistoryItem } from "./ternimal.js";

export const useTerminalHistory = () => {
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistoryItem[]>(
    [],
  );
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(0);

  const updateCommandHistory = useCallback(
    (command: string, newItem: boolean = false) => {
      const newHistory = [...commandHistory];
      newHistory[0] = command;
      if (newItem) {
        setCommandHistory(["", ...newHistory]);
      } else {
        setCommandHistory([...newHistory]);
      }
      setCmdIndex(0);
    },
    [commandHistory],
  );
  const updateTerminalHistory = (items: TerminalHistoryItem[]) => {
    setTerminalHistory((previousState) => [...previousState, ...items]);
  };
  const clearTerminalHistory = () => {
    setTerminalHistory([]);
  };

  return {
    updateCommandHistory,
    updateTerminalHistory,
    clearTerminalHistory,
    terminalHistory,
    commandHistory,
    cmdIndex,
    setCmdIndex,
  };
};
