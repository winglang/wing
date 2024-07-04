import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button, Modal, useTheme } from "@wingconsole/design-system";
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
      <div className="-m-6">
        <div className={classNames("sm:flex sm:items-start", "px-6 pt-6 pb-4")}>
          <div
            className={classNames(
              "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10",
              theme.bg3,
              theme.text1,
            )}
          >
            <ExclamationTriangleIcon className="size-6" />
          </div>
          <div
            className={classNames(
              "mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left",
              "text-md",
            )}
          >
            <h3
              className={classNames(
                "text-base font-semibold leading-6",
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

        <div
          className={classNames(
            "px-4 py-3",
            "mt-4",
            "bg-slate-50 dark:bg-slate-700",
            "flex items-center justify-end gap-4",
          )}
        >
          <Button
            onClick={onCancel}
            transparent
            className={"hover:bg-slate-100"}
          >
            Cancel
          </Button>
          <Button onClick={onExpose}>Expose</Button>
        </div>
      </div>
    </Modal>
  );
};
