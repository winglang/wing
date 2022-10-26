import type { BaseResourceSchema } from "@monadahq/wingsdk/lib/sim";

import { Button } from "../design-system/Button.js";
import { TextArea } from "../design-system/TextArea.js";

export interface EndpointInteractionViewProps {
  node: BaseResourceSchema;
}

export const EndpointInteractionView = ({
  node,
}: EndpointInteractionViewProps) => {
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
                className="block text-sm font-medium text-slate-700"
              >
                Method
              </label>
              <select
                id="method"
                name="method"
                className="mt-1 block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              >
                <option>GET</option>
                <option selected>POST</option>
                <option>PUT</option>
              </select>
            </div>

            <div className="flex-1">
              <label
                htmlFor="uri"
                className="block text-sm font-medium text-slate-700"
              >
                Request URI
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="uri"
                  id="uri"
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  placeholder="/"
                />
              </div>
            </div>

            <div>
              <Button type="submit" primary label="Send" />
            </div>
          </div>

          <div className="flex-1">
            <label
              htmlFor="contentType"
              className="block text-sm font-medium text-slate-700"
            >
              Content Type
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="contentType"
                id="contentType"
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                placeholder="application/json"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium text-slate-700"
            >
              Body
            </label>
            <div className="mt-1">
              <TextArea
                rows={4}
                name="body"
                id="body"
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 bg-slate-100 px-4 py-5 sm:p-6">
          <div>
            <span className="block text-sm font-medium text-slate-500">
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
};
