export type { Trace } from "@winglang/sdk/std/test-runner";
export type { ResourceLifecycleEvent } from "@winglang/sdk/simulator/simulator";

export type State = "compiling" | "loadingSimulator" | "success" | "error";
