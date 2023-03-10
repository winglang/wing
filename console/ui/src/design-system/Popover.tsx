import { Popover as HeadlessPopover, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, ReactElement, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

import { Button } from "./Button.js";

export interface PopoverProps {
  label: string;
  title?: string;
  disabled?: boolean;
  overlay?: boolean;
  children?: ReactNode | ((props: { close: () => void }) => ReactNode);
}

export const Popover = ({
  label,
  title,
  disabled = false,
  overlay = true,
  children,
}: PopoverProps) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    // eslint-disable-next-line unicorn/no-null
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(
    // eslint-disable-next-line unicorn/no-null
    null,
  );
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(
    // eslint-disable-next-line unicorn/no-null
    null,
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: "fixed",
    modifiers: [
      {
        name: "arrow",
        options: {
          element: arrowElement,
        },
      },
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
    placement: "top-start",
  });

  const [root] = useState(() => document.createElement("div"));
  useEffect(() => {
    document.body.append(root);
    return () => root.remove();
  }, []);

  return (
    <HeadlessPopover>
      <div className="relative inline-block">
        <div ref={setReferenceElement}>
          <HeadlessPopover.Button
            as={Button}
            disabled={disabled}
            label={label}
            className="relative"
          />

          {overlay && (
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HeadlessPopover.Overlay className="fixed inset-0 bg-white opacity-10 z-20" />
            </Transition>
          )}
        </div>

        {createPortal(
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HeadlessPopover.Panel
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className={classNames(
                "z-30 bg-white",
                "transition-opacity duration-300 border border-slate-300 rounded-md shadow-md",
              )}
              focus
            >
              {({ close }) => (
                <>
                  {title && (
                    <div className="py-1.5 px-3 bg-slate-100 border-b border-slate-300 rounded-t-md">
                      <span className="text-sm font-medium truncate text-slate-700">
                        {title}
                      </span>
                    </div>
                  )}
                  <div
                    className={classNames(
                      {
                        "pt-1.5 pb-4 px-3": title,
                        "p-4": !title,
                      },
                      "text-sm text-slate-700",
                    )}
                  >
                    {children instanceof Function
                      ? children({ close })
                      : children}
                  </div>
                  <div ref={setArrowElement} style={styles.arrow}>
                    <div
                      className={classNames(
                        "w-3 h-3 rotate-45 absolute",
                        "border-r border-b border-slate-300 bg-white",
                        "-bottom-[6px]",
                      )}
                    />
                  </div>
                </>
              )}
            </HeadlessPopover.Panel>
          </Transition>,
          root,
        )}
      </div>
    </HeadlessPopover>
  );
};
