import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { Fragment, ReactNode } from "react";

export interface ModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children?: ReactNode;
}

export function Modal({ visible, setVisible, children }: ModalProps) {
  const { theme } = useTheme();

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setVisible(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={classNames(
              "fixed inset-0 bg-opacity-40 dark:bg-opacity-70 transition-opacity",
              theme.bg1,
            )}
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center text-center items-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-0 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-0 scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  "relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all",
                  "w-full my-8 p-6",
                  "max-w-lg",
                  theme.bg3,
                  "border",
                  theme.border3,
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
