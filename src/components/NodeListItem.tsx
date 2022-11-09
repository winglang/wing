import classNames from "classnames";

export interface NodeListItemProps {
  title?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export const NodeListItem = ({
  title,
  disabled,
  onClick,
  children,
  className,
}: React.PropsWithChildren<NodeListItemProps>) => {
  return (
    <button
      className={classNames(
        `flex-shrink-0 max-w-full truncate bg-slate-50 border border-slate-300/75 shadow-sm text-xs px-2.5 py-1 flex items-center gap-1.5 min-w-0 ${className}`,
        {
          "cursor-not-allowed": disabled,
          "cursor-pointer hover:bg-slate-100": !disabled,
        },
      )}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
