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
  leftIcon?: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon: LeftIcon, className, ...props }, ref) => {
    return (
      <div className="relative rounded shadow-sm">
        {LeftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            <LeftIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </div>
        )}
        <input
          ref={ref}
          {...props}
          className={classNames(
            "inline-flex gap-2 items-center px-2.5 py-1.5 border text-xs font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition ease-in-out border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:border-sky-500",
            LeftIcon && "pl-7",
            className,
          )}
        />
      </div>
    );
  },
);
