import classNames from "classnames";
import { PropsWithChildren } from "react";

interface ButtonProps {
  primary?: boolean;
  label?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Button = ({
  primary = false,
  disabled = false,
  title,
  label,
  type = "button",
  className,
  onClick,
  icon: Icon,
  children,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      type={type}
      className={classNames(
        "inline-flex gap-2 items-center px-2.5 py-1.5 border text-xs font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition ease-in-out",
        className,
        {
          "cursor-not-allowed opacity-50": disabled,
          "border-transparent text-white bg-sky-600 hover:bg-sky-700 focus:ring-offset-2":
            primary,
          "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:border-sky-500":
            !primary,
        },
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
};
