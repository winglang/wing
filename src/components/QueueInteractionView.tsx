import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { QueueSchema } from "@monadahq/wing-local-schema";
import classNames from "classnames";
import prettyBytes from "pretty-bytes";
import { useId, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/design-system/Button";
import { SlideOver } from "@/design-system/SlideOver";
import { TextArea } from "@/design-system/TextArea";

import { ScrollableArea } from "./ScrollableArea";

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

const formatDate = new Intl.DateTimeFormat(undefined, {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
});

export const QueueInteractionView = ({ node }: QueueInteractionViewProps) => {
  const [messages, setMessages] = useState<QueueMessage[]>(() => {
    return MockQueueMessages;
  });
  const [open, setOpen] = useState(false);

  const sendMessage = () => {
    setOpen(false);
    setMessages((prev: QueueMessage[]) => {
      messagesCount++;
      return [
        ...prev,
        {
          id: `${messagesCount}`,
          body: `Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World ${messagesCount}`,
          sentAt: Date.now(),
          size: 300,
          receiveCount: 0,
        },
      ];
    });
  };

  const id = useId();

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="px-2 flex gap-4 justify-end">
        <Button
          icon={PaperAirplaneIcon}
          label="Send Message"
          primary
          onClick={() => setOpen(true)}
        />
      </div>

      <div className="h-full relative">
        <ScrollableArea overflowY>
          <div className="inline-block min-w-full align-middle">
            <table
              className="min-w-full border-separate"
              style={{ borderSpacing: 0 }}
            >
              <thead className="bg-slate-50">
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-[1] border-b border-slate-300 bg-slate-50 bg-opacity-75 py-1.5 pl-5 pr-2 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-[1] border-b border-slate-300 bg-slate-50 bg-opacity-75 px-2 py-1.5 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter w-full"
                  >
                    Message
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-[1] hidden border-b border-slate-300 bg-slate-50 bg-opacity-75 px-2 py-1.5 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-[1] hidden border-b border-slate-300 bg-slate-50 bg-opacity-75 px-2 py-1.5 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Sent At
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-[1] border-b border-slate-300 bg-slate-50 bg-opacity-75 py-1.5 pr-4 pl-2 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {messages.map((message, messageIdx) => (
                  <tr key={message.id}>
                    <td
                      className={classNames(
                        messageIdx !== messages.length - 1
                          ? "border-b border-slate-200"
                          : "",
                        "whitespace-nowrap p-2 text-sm font-medium text-slate-900 sm:pl-6 lg:pl-8",
                      )}
                    >
                      <div className="truncate">
                        <span>{message.id}</span>
                      </div>
                    </td>
                    <td
                      className={classNames(
                        messageIdx !== messages.length - 1
                          ? "border-b border-slate-200"
                          : "",
                        "whitespace-nowrap p-2 text-sm text-slate-500",
                      )}
                    >
                      <div className="max-w-xs truncate">{message.body}</div>
                    </td>
                    <td
                      className={classNames(
                        messageIdx !== messages.length - 1
                          ? "border-b border-slate-200"
                          : "",
                        "whitespace-nowrap p-2 text-sm text-slate-500 hidden lg:table-cell",
                      )}
                    >
                      <div className="truncate">
                        {prettyBytes(message.size)}
                      </div>
                    </td>
                    <td
                      className={classNames(
                        messageIdx !== messages.length - 1
                          ? "border-b border-slate-200"
                          : "",
                        "whitespace-nowrap p-2 text-sm text-slate-500 hidden sm:table-cell",
                      )}
                    >
                      <div className="truncate">
                        {formatDate.format(message.sentAt)}
                      </div>
                    </td>
                    <td
                      className={classNames(
                        messageIdx !== messages.length - 1
                          ? "border-b border-slate-200"
                          : "",
                        "relative whitespace-nowrap p-2 text-right text-sm font-medium",
                      )}
                    >
                      <div className="flex gap-1">
                        <Button icon={EyeIcon} title="View Message" />
                        <Button
                          icon={TrashIcon}
                          title="Delete Message"
                          onClick={() => {
                            setMessages((prev: QueueMessage[]) => {
                              return prev.filter((m) => m.id !== message.id);
                            });
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollableArea>
      </div>

      {createPortal(
        <SlideOver title="Send Message" open={open} onOpenChange={setOpen}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor={id}
                className="block text-sm font-medium text-slate-700"
              >
                Payload (JSON)
              </label>
              <TextArea id={id} />
            </div>

            <div className="flex justify-end">
              <Button primary onClick={() => sendMessage()}>
                Send
              </Button>
            </div>
          </div>
        </SlideOver>,
        document.body,
      )}
    </div>
  );
};
