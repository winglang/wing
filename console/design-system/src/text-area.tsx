import classNames from "classnames";
import { forwardRef } from "react";

import { useTheme } from "./theme-provider.js";

export interface TextAreaProps {
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  rows?: number;
  disabled?: boolean;
  onInput?: React.FormEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  containerClassName?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, containerClassName, ...props }, ref) => {
    const { theme } = useTheme();
    return (
      <div className={classNames("relative rounded-md", containerClassName)}>
        <textarea
          ref={ref}
          {...props}
          className={classNames(
            theme.borderInput,
            "block w-full rounded-md outline-none transition ease-in-out",
            "px-2 text-xs",
            "shadow-inner",
            className,
            props.disabled && [theme.bg3, theme.text2],
            !props.disabled && [
              theme.bgInput,
              theme.textInput,
              theme.focusInput,
            ],
          )}
        />
      </div>
    );
  },
);
