import { useId, useState } from "react";

import { BaseResourceSchema } from "../../electron/main/wingsdk.js";
import { Button } from "../design-system/Button.js";
import { ScrollableArea } from "../design-system/ScrollableArea.js";
import { TextArea } from "../design-system/TextArea.js";
import { trpc } from "../utils/trpc.js";

export interface FunctionInteractionViewProps {
  node: BaseResourceSchema;
}

export const FunctionInteractionView = ({
  node,
}: FunctionInteractionViewProps) => {
  const resourcePath = node.path ?? "";
  const timesCalled = trpc.useQuery(["function.timesCalled", { resourcePath }]);
  const utils = trpc.useContext();
  const invoke = trpc.useMutation("function.invoke", {
    onSuccess() {
      void utils.invalidateQueries(["function.timesCalled", { resourcePath }]);
    },
  });
  const [input, setInput] = useState("");
  const id = useId();
  return (
    <form
      className="h-full px-2 flex flex-col"
      method="POST"
      onSubmit={(event) => {
        event.preventDefault();
        invoke.mutate({
          resourcePath,
          message: input,
        });
        setInput("");
      }}
    >
      <div className="space-y-6 bg-slate-100 p-2 rounded">
        {timesCalled.data !== undefined && (
          <div className="block text-sm text-slate-500">
            {`This function was called ${timesCalled.data} ${
              timesCalled.data === 1 ? "time" : "times"
            }`}
          </div>
        )}
      </div>

      <div className="space-y-2 bg-white p-2">
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

      <div className="flex-1 flex flex-col space-y-2 p-2 pb-4">
        <div>
          <span className="block text-sm font-medium text-slate-500">
            Response
          </span>
        </div>

        <div className="flex-1 min-h-[8rem] relative bg-slate-100 rounded overflow-hidden">
          <ScrollableArea overflowX overflowY className="text-xs p-2">
            {invoke.data && (
              <pre className="select-text">
                <code>{JSON.stringify(invoke.data, undefined, 2)}</code>
              </pre>
            )}
          </ScrollableArea>
        </div>
      </div>
    </form>
  );
};
