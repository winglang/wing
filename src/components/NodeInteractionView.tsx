import { EndpointSchema, ResourceSchema } from "@monadahq/wing-local-schema";

export interface NodeInteractionViewProps {
  node: ResourceSchema;
}

export function NodeInteractionView({ node }: NodeInteractionViewProps) {
  switch (node.type) {
    case "cloud.Endpoint":
      return <EndpointInteractionView node={node} />;
    default:
      return <div>Node Type [{node.type}] not implemented yet.</div>;
  }
}

export interface EndpointInteractionViewProps {
  node: EndpointSchema;
}

export function EndpointInteractionView({
  node,
}: EndpointInteractionViewProps) {
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
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="/"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={""}
              />
            </div>
          </div>
          {/*
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
