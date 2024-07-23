export type { Trace } from "@winglang/sdk/lib/std/test-runner.js";
export type { ResourceLifecycleEvent } from "@winglang/sdk/lib/simulator/simulator.js";

export type State = "compiling" | "loadingSimulator" | "success" | "error";
