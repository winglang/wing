import type { BaseResourceSchema } from "@monadahq/wingsdk/lib/sim";
import { useId, useState } from "react";

import { Button } from "../design-system/Button.js";
import { TextArea } from "../design-system/TextArea.js";
import { trpc } from "../utils/trpc.js";

export interface FunctionInteractionViewProps {
  node: BaseResourceSchema;
}

export const FunctionInteractionView = ({
  node,
}: FunctionInteractionViewProps) => {
  const getTimesCalled = trpc.useQuery([
    "function.timesCalled",
    { resourcePath: node.path ?? "" },
  ]);
  const invoke = trpc.useMutation(["function.invoke"]);
  const [input, setInput] = useState("");
  const id = useId();
  return (
    <form
      className="px-2"
      method="POST"
      onSubmit={(event) => {
        event.preventDefault();
        if (!input || input === "") {
          return;
        }
        invoke.mutate({
          resourcePath: node.path ?? "",
          message: input,
        });
        setInput("");
      }}
    >
      <div className="space-y-6 bg-slate-100 p-2 pb-4 rounded">
        {getTimesCalled.data !== undefined && (
          <div className="block text-sm font-medium text-slate-500">
            {`this function was called ${getTimesCalled.data} ${
              getTimesCalled.data === 1 ? "time" : "times"
            }`}
          </div>
        )}
      </div>
      <div className="space-y-2 bg-white p-2 py-2">
        <div>
          <p className="mt-1 text-sm text-slate-500">
            You can test the function by sending a JSON message.
          </p>
        </div>

        <div>
          <label
            htmlFor={id}
            className="block text-sm font-medium text-slate-700"
          >
            Payload (JSON)
          </label>
          <div className="mt-1">
            <TextArea
              rows={4}
              id={id}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              value={input}
              onInput={(event) => setInput(event.currentTarget.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 items-end">
          <div>
            <Button type="submit" primary>
              Send
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6 bg-slate-100 p-2 pb-4 rounded">
        <div>
          <span className="block text-sm font-medium text-slate-500">
            Response
          </span>
        </div>

        <div>
          <div className="text-sm">
            {invoke.data && <code>{JSON.stringify(invoke.data)}</code>}
          </div>
        </div>
      </div>
    </form>
  );
};
