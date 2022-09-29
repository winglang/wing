import classNames from "classnames";
import { forwardRef } from "react";

export interface InputProps {
  id?: string;
  name?: string;
  type: React.HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  leftIcon?: (props: React.ComponentProps<"svg">) => JSX.Element;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon: LeftIcon, className, ...props }, ref) => {
    return (
      <div className="relative rounded-md shadow-sm">
        {LeftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <LeftIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
          </div>
        )}
        <input
          ref={ref}
          {...props}
          className={classNames(
            "block w-full rounded-md border-slate-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm transition-colors ease-in-out",
            LeftIcon && "pl-10",
            className,
          )}
        />
      </div>
    );
  },
);
