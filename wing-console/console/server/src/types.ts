import * as z from "zod";

export type { Trace } from "@winglang/sdk/lib/std/test-runner.js";
export type { ResourceLifecycleEvent } from "@winglang/sdk/lib/simulator/simulator.js";

export type State = "compiling" | "loadingSimulator" | "success" | "error";

export type ConsoleEnvironmentId = "local" | `local-test:${string}`;
