import { useContext, useId, useState } from "react";

import { AppContext } from "../../AppContext.js";
import { Button } from "../../design-system/Button.js";
import { TextArea } from "../../design-system/TextArea.js";
import { trpc } from "../../utils/trpc.js";

export interface FunctionViewProps {
  resourcePath: string;
}

export const FunctionView = ({ resourcePath }: FunctionViewProps) => {
  const { appMode } = useContext(AppContext);
  const invoke = trpc["function.invoke"].useMutation();
  const [input, setInput] = useState("");
  const id = useId();
  return (
    <form
      className="h-full w-full flex flex-col p-4"
      method="POST"
      aria-disabled={appMode === "webapp"}
      onSubmit={(event) => {
        event.preventDefault();
        invoke.mutate({
          resourcePath,
          message: input,
        });
        setInput("");
      }}
    >
      <div className="space-y-2">
        <div>
          <p className="mt-1 text-sm text-slate-500">
            You can test the function by sending a JSON message.
          </p>
        </div>

        <div>
          <label
            htmlFor={id}
            className="block text-sm font-medium text-slate-500"
          >
            Payload (JSON)
          </label>
          <div className="mt-1">
            <TextArea
              rows={4}
              id={id}
              value={input}
              className="text-sm"
              onInput={(event) => setInput(event.currentTarget.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 items-end">
          <div>
            <Button disabled={appMode === "webapp"} type="submit" primary>
              Send
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-2 py-2 pb-4">
        <div>
          <span className="block text-sm font-medium text-slate-500">
            Response
          </span>
        </div>
        <TextArea
          rows={4}
          id={id}
          className="text-sm"
          value={
            invoke.data ? JSON.stringify(invoke.data, undefined, 2) : undefined
          }
          disabled
        />
      </div>
    </form>
  );
};
