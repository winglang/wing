import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, ReactNode } from "react";

import { useTheme } from "./theme-provider.js";

export interface ModalProps {
  visible: boolean;
  setVisible?: (visible: boolean) => void;
  className?: string;
  children?: ReactNode;
}

export const Modal = ({
  visible,
  setVisible,
  className,
  children,
}: ModalProps) => {
  const { theme } = useTheme();

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setVisible?.(false)}
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
            className={classNames("fixed inset-0 transition-all backdrop-blur")}
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex justify-center text-center pt-24">
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
                  "my-8 p-6",
                  theme.bg3,
                  "border",
                  theme.border3,
                  className,
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
};
