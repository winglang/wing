import classNames from "classnames";
import { forwardRef } from "react";

import { useTheme } from "./theme-provider.js";

export interface CheckboxProps {
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  checked?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, disabled, ...props }, ref) => {
    const { theme } = useTheme();

    return (
      <input
        ref={ref}
        type="checkbox"
        className={classNames(
          theme.border3,
          "h-4 w-4 rounded text-sky-600 focus:ring-sky-500 transition ease-in-out",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        disabled={disabled}
        {...props}
      />
    );
  },
);
