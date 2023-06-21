export type TestStatus = "success" | "error" | "running" | "pending";

export interface TestItem {
  id: string;
  label: string;
  status: TestStatus;
  time?: number;
  runAllDisabled?: boolean;
}
