import classNames from "classnames";

export interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <a
      className={classNames(
        "underline font-medium text-sky-500 hover:text-sky-600",
        "rounded",
        "outline-none focus:ring ring-sky-600",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
};
