import classNames from "classnames";
import { forwardRef } from "react";

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
    return (
      <div
        className={classNames(
          "relative rounded-md shadow-sm",
          containerClassName,
        )}
      >
        <textarea
          ref={ref}
          {...props}
          className={classNames(
            "block w-full rounded-md border-slate-300 outline-none focus:ring-2 focus:ring-sky-500/50 focus:ring-sky-500 focus:border-sky-500 transition ease-in-out",
            "px-2 text-xs",
            className,
            { "bg-slate-50": props.disabled },
          )}
        />
      </div>
    );
  },
);
