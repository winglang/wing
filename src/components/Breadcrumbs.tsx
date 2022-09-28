import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

export interface Breadcrumb {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
  onBreadcrumbClicked?: (breadcrumb: Breadcrumb) => void;
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { breadcrumbs, onBreadcrumbClicked } = props;
  const numBreadcrumbs = breadcrumbs.length;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="p-2 flex items-center text-xs text-slate-500">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLastBreadcrumb = index === numBreadcrumbs - 1;
          return (
            <li
              key={breadcrumb.id}
              className="group flex items-center justify-between"
            >
              <button
                onClick={() => onBreadcrumbClicked?.(breadcrumb)}
                className={classNames(
                  "flex items-center gap-1 text-sm text-gray-500 whitespace-nowrap hover:text-slate-800",
                )}
                aria-current={isLastBreadcrumb ? "page" : undefined}
              >
                <div className={"flex-shrink-0"}>{breadcrumb.icon}</div>
                {breadcrumb.name}
                {!isLastBreadcrumb && (
                  <ChevronRightIcon
                    className="-ml-0.5 h-5 w-5 flex-shrink-0 text-slate-500 group-hover:text-slate-600"
                    aria-hidden="true"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
