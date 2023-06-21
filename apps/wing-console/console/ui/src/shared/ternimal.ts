export interface TerminalHistoryItem {
  type: "command" | "message";
  message: string;
}
