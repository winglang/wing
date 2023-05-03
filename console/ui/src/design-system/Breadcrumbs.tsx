import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useTheme } from "@wingconsole/design-system";
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
  const { theme } = useTheme();

  const { breadcrumbs, onBreadcrumbClicked } = props;
  const numberBreadcrumbs = breadcrumbs.length;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol
        className={classNames(
          "px-4 py-2 flex items-center text-xs",
          theme.text2,
        )}
      >
        {breadcrumbs.map((breadcrumb, index) => {
          const isLastBreadcrumb = index === numberBreadcrumbs - 1;
          return (
            <li
              key={breadcrumb.id}
              className="group flex items-center justify-between"
            >
              <button
                onClick={() => onBreadcrumbClicked?.(breadcrumb)}
                className={classNames(
                  theme.text2,
                  theme.text4Hover,
                  "flex items-center gap-1 text-sm whitespace-nowrap",
                )}
                aria-current={isLastBreadcrumb ? "page" : undefined}
              >
                <div className={"flex-shrink-0"}>{breadcrumb.icon}</div>
                {breadcrumb.name}
                {!isLastBreadcrumb && (
                  <ChevronRightIcon
                    className={classNames(
                      theme.text2,
                      theme.text4Hover,
                      theme.text4GroupHover,
                      "-ml-0.5 h-5 w-5 flex-shrink-0",
                    )}
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
