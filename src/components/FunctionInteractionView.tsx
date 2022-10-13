import { FunctionSchema } from "@monadahq/wing-local-schema";
import { useId, useState } from "react";

import { Button } from "@/design-system/Button";
import { TextArea } from "@/design-system/TextArea";

export interface FunctionInteractionViewProps {
  node: FunctionSchema;
}

export const FunctionInteractionView = ({
  node,
}: FunctionInteractionViewProps) => {
  const [input, setInput] = useState("");
  const id = useId();
  return (
    <form
      className="px-2"
      method="POST"
      onSubmit={(event) => {
        event.preventDefault();
        setInput("");
      }}
    >
      <div className="space-y-2 bg-white p-2 py-2">
        <div>
          {/* <h3 className="text-lg font-medium leading-6 text-slate-900">
            Test Function
          </h3> */}
          <p className="mt-1 text-sm text-slate-500">
            You can test the function by sending a JSON event.
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
          <pre className="text-sm">
            {/* <code>{JSON.stringify(invoke.error ?? invoke.data)}</code> */}
          </pre>
        </div>
      </div>
    </form>
  );
};
