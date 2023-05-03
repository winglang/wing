import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { useContext, useId, useState } from "react";

import { AppContext } from "../../AppContext.js";
import { Button } from "../../design-system/Button.js";
import { Modal } from "../../design-system/Modal.js";
import { TextArea } from "../../design-system/TextArea.js";
import { trpc } from "../../utils/trpc.js";
import { JsonResponseInput } from "../JsonResponseInput.js";

export interface FunctionViewProps {
  resourcePath: string;
}

export const FunctionView = ({ resourcePath }: FunctionViewProps) => {
  const { theme } = useTheme();

  const { appMode } = useContext(AppContext);
  const [response, setResponse] = useState("");
  const payloadId = useId();
  const responseId = useId();

  const invoke = trpc["function.invoke"].useMutation({
    onSuccess: (data) => {
      setResponse(JSON.stringify(data, undefined, 2));
    },
  });

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex-col space-y-1">
        <div className="flex flex-row">
          <div
            className={classNames(
              theme.text1,
              "max-w-full min-w-0 grow space-x-2 items-end flex",
            )}
          >
            <Button
              label="Invoke"
              className="px-0.5"
              aria-disabled={appMode === "webapp"}
              onClick={() => invoke.mutate({ resourcePath, message: "" })}
            />
            <Button
              label="Invoke with..."
              className="px-0.5 truncate"
              aria-disabled={appMode === "webapp"}
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor={responseId}
            className={classNames("text-sm", theme.text2)}
          >
            Response
          </label>
          <JsonResponseInput
            value={response}
            loading={invoke.isLoading}
            placeholder="No response"
            className="max-h-[20rem]"
          />
        </div>
      </div>

      <Modal visible={showModal} setVisible={setShowModal}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setShowModal(false);
            invoke.mutate({ resourcePath, message });
          }}
        >
          <div className="mt-2 space-y-2">
            <h3
              className={classNames(
                "text-base font-semibold leading-6",
                theme.text1,
              )}
            >
              Invoke {resourcePath.split("/").pop()}
            </h3>

            <label
              className={classNames("block text-sm font-medium", theme.text1)}
              htmlFor={payloadId}
            >
              Payload (JSON)
            </label>
            <TextArea
              id={payloadId}
              value={message}
              rows={5}
              onInput={(event) => setMessage(event.currentTarget.value)}
              className="font-mono min-h-[40px] resize-none"
            />
            <p className={classNames("text-sm", theme.text2)}>
              This payload will be sent to the function when you invoke it.
            </p>
          </div>
          <div className="mt-2 space-x-2 justify-end flex">
            <Button label="Cancel" onClick={() => setShowModal(false)} />
            <Button primary label="Invoke" type="submit" />
          </div>
        </form>
      </Modal>
    </>
  );
};
