import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import type { BaseResourceSchema } from "@monadahq/wingsdk/lib/sim";
import { useCallback, useId, useState } from "react";

import { Button } from "../design-system/Button.js";
import { useNotifications } from "../design-system/Notification.js";
import { TextArea } from "../design-system/TextArea.js";
import { trpc } from "../utils/trpc.js";

export interface QueueInteractionViewProps {
  node: BaseResourceSchema;
}

export const QueueInteractionView = ({ node }: QueueInteractionViewProps) => {
  const pushMessage = trpc.useMutation(["queue.push"]);
  const [message, setMessage] = useState("");
  const { showNotification } = useNotifications();

  const sendMessage = useCallback(async () => {
    if (!message || message === "") {
      return;
    }
    await pushMessage.mutateAsync({
      resourcePath: node.path ?? "",
      message: message,
    });
    showNotification("message sent", { body: message, type: "success" });
    setMessage("");
  }, [message, pushMessage]);

  const id = useId();

  return (
    <div className="h-full flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <label
            htmlFor={id}
            className="block text-sm font-medium text-slate-700"
          >
            New Message
          </label>
          <TextArea
            className={"flex flex-col gap-4"}
            id={id}
            value={message}
            onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
          />
        </div>
        <div className="flex gap-4 justify-end">
          <Button
            icon={PaperAirplaneIcon}
            label="Send Message"
            primary
            onClick={() => sendMessage()}
          />
        </div>
      </div>
    </div>
  );
};
