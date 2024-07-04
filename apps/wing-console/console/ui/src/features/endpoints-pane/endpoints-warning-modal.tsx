import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";

export interface EndpointsWarningModalProps {
  visible: boolean;
  onExpose: () => void;
  onCancel: () => void;
}

export const EndpointsWarningModal = ({
  visible = true,
  onExpose,
  onCancel,
}: EndpointsWarningModalProps) => {
  const { theme } = useTheme();

  return (
    <Modal visible={visible}>
      <ModalBody>
        <div className="sm:flex sm:items-start">
          <div
            className={classNames(
              "mx-auto flex size-12 flex-shrink-0 items-center justify-center rounded-full",
              "text-yellow-600 dark:text-yellow-300",
              "bg-yellow-100 dark:bg-yellow-800",
            )}
          >
            <ExclamationTriangleIcon className="size-7" />
          </div>
          <div
            className={classNames(
              "mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left",
              "text-md",
            )}
          >
            <h3
              className={classNames(
                "text-lg font-semibold leading-6",
                "text-gray-900 dark:text-slate-100",
              )}
            >
              Expose endpoint · Security warning
            </h3>
            <div
              className={classNames(
                "mt-2",
                "text-gray-500 dark:text-slate-400 text-base",
              )}
            >
              <p>
                Exposing an endpoint will make it accessible from the internet.
              </p>
              <p>Please, ensure you understand the risks before proceeding.</p>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onExpose} primary>
          Expose
        </Button>
      </ModalFooter>
    </Modal>
  );
};
