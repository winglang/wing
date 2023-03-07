import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { useCallback, useContext, useId, useState } from "react";

import { AppContext } from "../../AppContext.js";
import { Button } from "../../design-system/Button.js";
import { useNotifications } from "../../design-system/Notification.js";
import { TextArea } from "../../design-system/TextArea.js";
import { trpc } from "../../utils/trpc.js";

export interface QueueViewProps {
  resourcePath: string;
}

export const QueueView = ({ resourcePath }: QueueViewProps) => {
  const { appMode } = useContext(AppContext);
  const pushMessage = trpc["queue.push"].useMutation();

  const [message, setMessage] = useState("");
  const { showNotification } = useNotifications();

  const sendMessage = useCallback(async () => {
    if (appMode === "webapp") {
      return;
    }
    if (!message || message === "") {
      return;
    }
    await pushMessage.mutateAsync({
      resourcePath,
      message: message,
    });
    showNotification("message sent", { body: message, type: "success" });
  }, [message, pushMessage]);

  const id = useId();

  return (
    <div className="h-full flex-1 flex flex-col text-sm">
      <div className="flex flex-col gap-2">
        <TextArea
          id={id}
          value={message}
          onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
        />
        <div className="flex gap-2 justify-end">
          <Button
            label="Send"
            disabled={appMode === "webapp"}
            onClick={() => sendMessage()}
          />
        </div>
      </div>
    </div>
  );
};
