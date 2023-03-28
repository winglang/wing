import classNames from "classnames";
import { PropsWithChildren, forwardRef } from "react";

interface ButtonProps {
  id?: string;
  primary?: boolean;
  label?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  icon?: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  small?: boolean;
  transparent?: boolean;
}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(
  (
    {
      id,
      primary = false,
      disabled = false,
      title,
      label,
      type = "button",
      className,
      onClick,
      icon: Icon,
      children,
      small = false,
      transparent = false,
    },
    ref,
  ) => {
    return (
      <button
        id={id}
        ref={ref}
        type={type}
        className={classNames(
          "inline-flex gap-2 items-center  text-xs font-medium outline-none  transition ease-in-out",
          {
            "px-2.5": label || children,
            "py-1.5": !small,
            "cursor-not-allowed opacity-50": disabled,
            "border-transparent text-white bg-sky-600 hover:bg-sky-700 focus:ring-offset-2":
              primary && !transparent,
            "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:border-sky-500":
              !primary && !transparent,
            "border rounded shadow-sm focus:ring-2 focus:ring-sky-500/50":
              !transparent,
            "text-slate-700 hover:text-slate-900": transparent,
          },
          className,
        )}
        title={title}
        disabled={disabled}
        onClick={onClick}
      >
        {Icon && <Icon className={classNames(label && "-ml-0.5", "h-4 w-4")} />}
        {label}
        {children}
      </button>
    );
  },
);
