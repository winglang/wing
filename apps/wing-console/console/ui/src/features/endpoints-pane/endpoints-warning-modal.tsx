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
            <ExclamationTriangleIcon className="size-6" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-slate-900 dark:text-slate-200">
              Expose endpoint
            </h3>
            <div className="mt-2">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Exposing an endpoint will make it accessible from the internet.
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Please, ensure you understand the risks before proceeding.
              </p>
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
