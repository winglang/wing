import { TrashIcon } from "@heroicons/react/24/outline";
import { QueueSchema } from "@monadahq/wing-local-schema";
import classNames from "classnames";
import prettyBytes from "pretty-bytes";
import { useState } from "react";

import { Button } from "@/design-system/Button";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "long",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

export interface QueueInteractionViewProps {
  node: QueueSchema;
}

export interface QueueMessage {
  id: string;
  body: string;
  sentAt: number;
  size: number;
  receiveCount: number;
}

let messagesCount = 3;
const MockQueueMessages: QueueMessage[] = [
  {
    id: "1",
    body: "Hello World",
    sentAt: Date.now(),
    size: 300,
    receiveCount: 0,
  },
  {
    id: "2",
    body: "Hello World1",
    sentAt: Date.now() - 1000 * 60 * 60 * 24,
    size: 603,
    receiveCount: 12,
  },
  {
    id: "3",
    body: "Hello World2",
    sentAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    size: 1000,
    receiveCount: 2,
  },
];

// TODO: add message body as a popover / tooltip / collapsible row in a table

export const QueueInteractionView = ({ node }: QueueInteractionViewProps) => {
  const [messages, setMessages] = useState<QueueMessage[]>(() => {
    return MockQueueMessages;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all Queue messages.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            primary
            onClick={() => {
              setMessages((prev: QueueMessage[]) => {
                messagesCount++;
                return [
                  ...prev,
                  {
                    id: `${messagesCount}`,
                    body: `Hello World${messagesCount}`,
                    sentAt: Date.now(),
                    size: 300,
                    receiveCount: 0,
                  },
                ];
              });
            }}
            label={"Add Message"}
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
              <table
                className="min-w-full border-separate"
                style={{ borderSpacing: 0 }}
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Sent At
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      Size
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      Receive Count
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {messages.map((message, messageIdx) => (
                    <tr key={message.id}>
                      <td
                        className={classNames(
                          messageIdx !== messages.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8",
                        )}
                      >
                        <span title={message.body}>{message.id}</span>
                      </td>
                      <td
                        className={classNames(
                          messageIdx !== messages.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell",
                        )}
                      >
                        {message.sentAt}
                      </td>
                      <td
                        className={classNames(
                          messageIdx !== messages.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell",
                        )}
                      >
                        {prettyBytes(message.size)}
                      </td>
                      <td
                        className={classNames(
                          messageIdx !== messages.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                        )}
                      >
                        {message.receiveCount}
                      </td>
                      <td
                        className={classNames(
                          messageIdx !== messages.length - 1
                            ? "border-b border-gray-200"
                            : "",
                          "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8",
                        )}
                      >
                        <Button
                          icon={TrashIcon}
                          label="Delete"
                          onClick={() => {
                            setMessages((prev: QueueMessage[]) => {
                              return prev.filter((m) => m.id !== message.id);
                            });
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
