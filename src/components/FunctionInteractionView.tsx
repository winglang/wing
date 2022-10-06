import { FunctionSchema } from "@monadahq/wing-local-schema";
import { useState } from "react";

export interface FunctionInteractionViewProps {
  node: FunctionSchema;
}

export const FunctionInteractionView = ({
  node,
}: FunctionInteractionViewProps) => {
  const [input, setInput] = useState("");
  return (
    <form
      method="POST"
      onSubmit={(event) => {
        event.preventDefault();
        setInput("");
      }}
    >
      <div className="space-y-6 bg-white p-2 py-4">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Test Function
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            You can test the function by sending a JSON event.
          </p>
        </div>

        <div>
          <label
            htmlFor="payload"
            className="block text-sm font-medium text-gray-700"
          >
            Payload (JSON)
          </label>
          <div className="mt-1">
            <textarea
              rows={4}
              name="payload"
              id="payload"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              value={input}
              onInput={(event) => setInput(event.currentTarget.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 items-end">
          <div>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6 bg-gray-100 p-2 pb-4">
        <div>
          <span className="block text-sm font-medium text-gray-500">
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
