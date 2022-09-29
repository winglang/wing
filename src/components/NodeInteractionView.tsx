// import { FolderIcon } from "@heroicons/react/24/outline";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  DocumentIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { FolderIcon } from "@heroicons/react/24/solid";
import {
  BucketSchema,
  ConstructSchema,
  EndpointSchema,
  FunctionSchema,
  ResourceSchema,
} from "@monadahq/wing-local-schema";
import prettyBytes from "pretty-bytes";
import { useRef, useState } from "react";

import { Button } from "@/design-system/Button";
import { Checkbox } from "@/design-system/Checkbox";
import { Input } from "@/design-system/Input";
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
    case "cloud.Bucket":
      return <BucketInteractionView node={node} />;
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

interface BucketInteractionViewProps {
  node: BucketSchema;
}

interface FileExplorerEntry {
  type: "directory" | "file";
  name: string;
  updatedAt: number;
  fileSize?: number;
}

function BucketInteractionView({ node }: BucketInteractionViewProps) {
  const [path] = useState("/example/path");
  const [entries] = useState<FileExplorerEntry[]>(() => {
    return [
      { type: "directory", name: ".vscode", updatedAt: Date.now() },
      { type: "directory", name: "src", updatedAt: Date.now() },
      {
        type: "file",
        name: "package.json",
        updatedAt: Date.now(),
        fileSize: 12,
      },
      {
        type: "file",
        name: "README.md",
        updatedAt: Date.now(),
        fileSize: 1500,
      },
    ];
  });
  const [checkedEntries, setCheckedEntries] = useState<string[]>([]);
  const [dateFormatter] = useState(
    () =>
      new Intl.DateTimeFormat(undefined, {
        // dateStyle: "long",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
  );
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex-1 space-y-2 p-2 flex flex-col text-sm">
      <div className="flex justify-between items-center gap-1">
        <div className="flex items-center gap-1">
          <Button
            icon={ArrowDownTrayIcon}
            label="Download"
            disabled={checkedEntries.length === 0}
          />
          <Button
            icon={TrashIcon}
            label="Delete"
            disabled={checkedEntries.length === 0}
          />
        </div>

        <Button icon={ArrowUpTrayIcon} label="Upload" primary />
      </div>

      <Input
        ref={inputRef}
        type="text"
        className="py-1"
        leftIcon={FolderIcon}
        value={path}
        readOnly
        onFocus={() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(
              0,
              inputRef.current.value.length,
            );
          }
        }}
      />

      <div className="flex-1 bg-white rounded border border-slate-200 h-96">
        <table className="w-full bg-slate-100 rounded">
          <thead>
            <tr className="text-left text-sm text-slate-900">
              <th className="px-2 border-b border-slate-200 font-semibold">
                Name
              </th>
              <th className="px-2 border-b border-slate-200 font-semibold">
                Size
              </th>
              <th className="px-2 border-b border-slate-200 font-semibold">
                Last Modified
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {entries.map((entry) => {
              return (
                <tr key={entry.name}>
                  <td className="px-2">
                    <div className="flex items-center gap-1.5">
                      <Checkbox
                        checked={checkedEntries.includes(entry.name)}
                        onChange={(event) => {
                          const { checked } = event.currentTarget;
                          setCheckedEntries(([...checkedEntries]) => {
                            if (checked) {
                              return [...checkedEntries, entry.name];
                            } else {
                              const index = checkedEntries.indexOf(entry.name);
                              if (index !== -1) {
                                checkedEntries.splice(index, 1);
                              }
                              return checkedEntries;
                            }
                          });
                        }}
                      />

                      {entry.type === "directory" && (
                        <FolderIcon className="w-5 h-5 text-sky-500" />
                      )}
                      {entry.type === "file" && (
                        <DocumentIcon className="w-5 h-5 text-slate-500" />
                      )}
                      <span className="text-slate-900">{entry.name}</span>
                    </div>
                  </td>

                  <td className="px-2 text-slate-500">
                    {entry.fileSize ? prettyBytes(entry.fileSize) : ""}
                  </td>

                  <td className="px-2 text-slate-500">
                    {dateFormatter.format(entry.updatedAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
