import classNames from "classnames";
import { forwardRef } from "react";

import { IconComponent } from "./resource-icon.js";
import { useTheme } from "./theme-provider.js";

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
    const { theme } = useTheme();
    return (
      <div className={classNames("relative rounded", containerClassName)}>
        {LeftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            <LeftIcon
              className={classNames("h-4 w-4", theme.text2)}
              aria-hidden="true"
            />
          </div>
        )}
        <input
          ref={ref}
          {...props}
          disabled={disabled}
          className={classNames(
            theme.borderInput,
            "inline-flex gap-2 items-center px-2.5 py-1.5 border text-xs rounded",
            "outline-none",
            "shadow-inner",
            LeftIcon && "pl-7",
            disabled && [theme.bg3, theme.text2],
            !disabled && [theme.bgInput, theme.textInput, theme.focusInput],
            className,
          )}
        />
      </div>
    );
  },
);
