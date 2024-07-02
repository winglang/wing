import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Link,
  Loader,
  Modal,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";
import React from "react";

export interface EndpointsWarningModalProps {
  visible: boolean;
  onContinue: () => void;
  onCancel: () => void;
}

export const EndpointsWarningModal = ({
  visible = true,
  onContinue,
  onCancel,
}: EndpointsWarningModalProps) => {
  const { theme } = useTheme();

  return (
    <Modal visible={visible}>
      <div
        className="flex flex-col gap-6 max-w-lg items-center p-6"
        data-testid="endpoints-warning-modal"
      >
        <h3
          className={classNames(
            theme.text1,
            "text-lg font-semibold leading-7",
            "flex items-center gap-1",
          )}
        >
          <ExclamationTriangleIcon className="size-6" />
          Security Warning
        </h3>

        <div
          className={classNames(theme.text2, "text-sm text-center space-y-4")}
        >
          <p>
            Opening a tunnel will expose your local resource to the internet.
          </p>
          <p className="font-bold">
            This can expose your system to security risks.
          </p>
          <p>
            Please ensure you understand the risks before proceeding. Do you
            acknowledge and accept these security implications?
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={onCancel} transparent>
            Cancel
          </Button>
          <Button onClick={onContinue}>I Understand, Continue</Button>
        </div>
      </div>
    </Modal>
  );
};
