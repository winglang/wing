import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import classNames from "classnames";
import {
  Fragment,
  useEffect,
  useState,
  type MouseEvent,
  type PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

import { useTheme } from "./theme-provider.js";

interface Item {
  icon?: React.ReactNode;
  label?: string;
  onClick?: (event: MouseEvent) => void;
  disabled?: boolean;
  type?: "button" | "separator";
}

export interface MenuProps {
  title?: string;
  icon?: React.ReactNode;
  items: Item[];
  btnClassName?: string;
  onClick?: (event: MouseEvent) => void;
}

export const Menu = ({
  title,
  icon,
  items = [],
  btnClassName,
  onClick,
  children,
}: PropsWithChildren<MenuProps>) => {
  const { theme } = useTheme();

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    // eslint-disable-next-line unicorn/no-null
    null,
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(
    // eslint-disable-next-line unicorn/no-null
    null,
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: "fixed",
  });

  const [root] = useState(() => document.createElement("div"));
  useEffect(() => {
    document.body.append(root);
    return () => root.remove();
  }, [root]);

  return (
    <div className="relative items-center flex">
      <HeadlessMenu as="div" className="relative inline-block text-left">
        <HeadlessMenu.Button
          ref={setReferenceElement}
          className={classNames(
            btnClassName,
            "flex",
            theme.focusVisible,
            "items-center",
          )}
          onClick={(event) => {
            onClick?.(event);
          }}
        >
          {title && <div className="pl-2">{title}</div>}
          {icon}
        </HeadlessMenu.Button>

        {createPortal(
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              ref={setPopperElement}
              className="z-50"
              style={styles["popper"]}
              {...attributes["popper"]}
            >
              <HeadlessMenu.Items
                className={classNames(
                  "absolute right-0 mt-2 w-56 origin-top-right",
                  "shadow-lg z-20 border",
                  "divide-y divide-gray-100 dark:divide-gray-700",
                  theme.bgInput,
                  theme.borderInput,
                  theme.focusVisible,
                  "rounded-lg",
                  "p-1 text-sm/6",
                )}
              >
                {children}
                <div className="p-0.5">
                  {items.map((item, index) => (
                    <HeadlessMenu.Item key={item.label || index}>
                      {({ active }) => (
                        <div className="flex items-center">
                          {item.type !== "separator" && (
                            <button
                              key={item.label}
                              disabled={item.disabled}
                              onClick={item.onClick}
                              className={classNames(
                                active && theme.bg3,
                                "text-sm",
                                theme.textInput,
                                item.disabled &&
                                  "cursor-not-allowed opacity-50",
                                "group flex w-full items-center gap-2 rounded py-1.5 px-3 data-[focus]:bg-white/10",
                              )}
                            >
                              {item.icon && (
                                <span className={classNames(theme.text2)}>
                                  {item.icon}
                                </span>
                              )}
                              <div className="flex grow">{item.label}</div>
                            </button>
                          )}
                          {item.type === "separator" && (
                            <div className="h-[1px] bg-gray-100 my-0.5 w-full " />
                          )}
                        </div>
                      )}
                    </HeadlessMenu.Item>
                  ))}
                </div>
              </HeadlessMenu.Items>
            </div>
          </Transition>,
          root,
        )}
      </HeadlessMenu>
    </div>
  );
};
