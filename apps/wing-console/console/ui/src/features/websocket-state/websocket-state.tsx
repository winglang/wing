import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Modal, ModalBody } from "@wingconsole/design-system";
import { useEffect, useState } from "react";

import { useWebSocketState } from "./use-websocket.js";

export const WebSocketState = () => {
  const { webSocketState } = useWebSocketState();

  const [webSocketWasOpen, setWebSocketWasOpen] = useState(false);
  useEffect(() => {
    if (webSocketState === "open") {
      setWebSocketWasOpen(true);
    }
  }, [webSocketState]);

  const showConnectionLost = webSocketState !== "open" && webSocketWasOpen;

  return (
    <div>
      <Modal visible={showConnectionLost}>
        <ModalBody>
          <div className="sm:flex sm:items-start p-4">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationTriangleIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-slate-900 dark:text-slate-200">
                Connection Lost
              </h3>
              <div className="mt-2">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  The connection to the server was lost.
                </p>
              </div>
              <div className="mt-2">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Please, try restarting the Wing Console.
                </p>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
