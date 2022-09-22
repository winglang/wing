import {
  ConstructSchema,
  EndpointSchema,
  FunctionSchema,
  ResourceSchema,
} from "@monadahq/wing-local-schema";
import { useState } from "react";

import { trpc } from "@/utils/trpc";

export interface NodeInteractionViewProps {
  node: ResourceSchema;
}

export function NodeInteractionView({ node }: NodeInteractionViewProps) {
  switch (node.type) {
    case "cloud.Endpoint":
      return <EndpointInteractionView node={node} />;
    case "cloud.Function":
      return <FunctionInteractionView node={node} />;
    default:
      return <></>;
  }
}

interface EndpointInteractionViewProps {
  node: EndpointSchema;
}

function EndpointInteractionView({ node }: EndpointInteractionViewProps) {
  return (
    <form
      method="POST"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
          <div className="flex gap-4 items-end">
            <div className="">
              <label
                htmlFor="method"
                className="block text-sm font-medium text-gray-700"
              >
                Method
              </label>
              <select
                id="method"
                name="method"
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              >
                <option>GET</option>
                <option selected>POST</option>
                <option>PUT</option>
              </select>
            </div>

            <div className="flex-1">
              <label
                htmlFor="uri"
                className="block text-sm font-medium text-gray-700"
              >
                Request URI
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="uri"
                  id="uri"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  placeholder="/"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Send
              </button>
            </div>
          </div>

          <div className="flex-1">
            <label
              htmlFor="contentType"
              className="block text-sm font-medium text-gray-700"
            >
              Content Type
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="contentType"
                id="contentType"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                placeholder="application/json"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700"
            >
              Body
            </label>
            <div className="mt-1">
              <textarea
                rows={4}
                name="body"
                id="body"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                defaultValue={""}
              />
            </div>
          </div>
          {/*
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Send
          </button> */}
        </div>

        <div className="space-y-6 bg-gray-100 px-4 py-5 sm:p-6">
          <div>
            <span className="block text-sm font-medium text-gray-500">
              Response
            </span>
          </div>

          <div>
            <pre className="text-sm">
              <code>
                {JSON.stringify({
                  message: "ok",
                })}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </form>
  );
}

interface FunctionInteractionViewProps {
  node: FunctionSchema;
}

function FunctionInteractionView({ node }: FunctionInteractionViewProps) {
  const invoke = trpc.useMutation("function.Invoke");
  const [input, setInput] = useState("");
  return (
    <form
      method="POST"
      onSubmit={(event) => {
        event.preventDefault();
        invoke.mutate({
          input,
          resourceId: node.path,
        });
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
            <code>{JSON.stringify(invoke.error ?? invoke.data)}</code>
          </pre>
        </div>
      </div>
    </form>
  );
}
