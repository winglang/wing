import { Trace } from "@winglang/sdk/lib/testing";

export interface TestLog {
  type: "title" | "log" | "error" | "summary" | "success" | "fail";
  message: string;
  timestamp?: number;
}

export interface TestLogger {
  messages: TestLog[];
  log: (log: TestLog) => void;
}

export const createTestLogger = (): TestLogger => {
  return {
    messages: new Array<TestLog>(),
    log(log: TestLog) {
      this.messages.push(log);
    },
  };
};
