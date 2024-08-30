import classNames from "classnames";

export interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  dataTestid?: string;
}

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <a
      className={classNames(
        "text-sky-500 hover:text-sky-600 dark:hover:text-sky-400",
        "rounded",
        "outline-none focus:ring ring-sky-500/50",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
};
