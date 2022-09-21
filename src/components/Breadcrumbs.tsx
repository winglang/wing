import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

export interface Breadcrumb {
  id: string;
  name: string;
  current: boolean;
  onClick: (id: string) => void;
  icon?: React.ReactNode;
}
export interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { breadcrumbs } = props;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center text-xs text-slate-500">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.id}>
            <div className="flex items-center justify-between">
              <div className={"flex-shrink-0"}>{breadcrumb.icon}</div>
              <button
                onClick={() => breadcrumb.onClick(breadcrumb.id)}
                className={classNames(
                  "ml-1 text-sm font-small text-gray-500 cursor-pointer hover:text-slate-800",
                  {
                    ["font-bold"]: breadcrumb.current,
                  },
                )}
                aria-current={breadcrumb.current ? "page" : undefined}
              >
                {breadcrumb.name}
              </button>
              {index < breadcrumbs.length - 1 && (
                <ChevronRightIcon
                  className="h-5 w-5 flex-shrink-0 text-slate-500"
                  aria-hidden="true"
                />
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
