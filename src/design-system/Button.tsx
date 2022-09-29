import classNames from "classnames";

interface ButtonProps {
  primary?: boolean;
  label: string;
  disabled?: boolean;
  icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
  onClick?: () => void;
}

export const Button = ({
  primary = false,
  disabled = false,
  label,
  onClick,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(
        "inline-flex items-center px-2.5 py-1.5 border text-xs font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all ease-in-out",
        {
          "cursor-not-allowed opacity-50": disabled,
          "border-transparent text-white bg-sky-600 hover:bg-sky-700 focus:ring-offset-2":
            primary,
          "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:border-sky-500":
            !primary,
        },
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon className="-ml-0.5 mr-2 h-4 w-4" />}
      {label}
    </button>
  );
};
