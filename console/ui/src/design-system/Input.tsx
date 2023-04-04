import classNames from "classnames";
import { forwardRef } from "react";

import { IconComponent } from "../utils/utils.js";

export interface InputProps {
  id?: string;
  name?: string;
  type: React.HTMLInputTypeAttribute;
  className?: string;
  containerClassName?: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  disabled?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  leftIcon?: IconComponent;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { leftIcon: LeftIcon, className, containerClassName, disabled, ...props },
    ref,
  ) => {
    return (
      <div
        className={classNames("relative rounded shadow-sm", containerClassName)}
      >
        {LeftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            <LeftIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </div>
        )}
        <input
          ref={ref}
          {...props}
          disabled={disabled}
          className={classNames(
            "inline-flex gap-2 items-center px-2.5 py-1.5 border text-xs rounded outline-none focus:ring-2 focus:ring-sky-500/50 transition ease-in-out border-slate-300 focus:border-sky-500",
            LeftIcon && "pl-7",
            disabled && "bg-slate-50 text-slate-500",
            !disabled && "bg-white text-slate-700",
            className,
          )}
        />
      </div>
    );
  },
);
