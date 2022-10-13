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
  onInput?: React.FormEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative rounded-md shadow-sm">
        <textarea
          ref={ref}
          {...props}
          className={classNames(
            "block w-full rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:ring-sky-500 focus:border-sky-500 transition-all ease-in-out",
            className,
          )}
        />
      </div>
    );
  },
);
