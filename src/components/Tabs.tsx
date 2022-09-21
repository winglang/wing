import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

export interface Tab {
  id: string;
  name: string;
  icon?: React.ReactNode;
  current: boolean;
  onClick: (id: string) => void;
  onCloseClick?: (id: string) => void;
}

export interface TabsProps {
  tabs: Tab[];
}

export const Tabs = (props: TabsProps) => {
  const { tabs } = props;
  return (
    <div className="flex-1 flex flex-col text-center align-middle bg-slate-100">
      {tabs.length > 0 && (
        <div className="flex h-8 text-sm">
          {tabs.map((tab) => {
            return (
              <div
                key={tab.id}
                className={classNames(
                  "relative flex items-center px-3 cursor-pointer group",
                  tab.current ? "bg-white" : "bg-slate-200",
                )}
                onClick={() => tab.onClick(tab.id)}
              >
                {tab.icon && <div className="mr-1.5">{tab.icon}</div>}
                {tab.name}
                <button
                  type="button"
                  className={classNames(
                    "ml-1 -mr-1.5 p-1 rounded",
                    tab.current ? "hover:bg-slate-200" : "hover:bg-slate-300",
                    { "invisible group-hover:visible": !tab.current },
                  )}
                  onClick={(event) => {
                    event.stopPropagation();
                    tab.onCloseClick?.(tab.id);
                  }}
                >
                  <XMarkIcon
                    className="w-4 h-4 text-slate-600"
                    aria-hidden="true"
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
