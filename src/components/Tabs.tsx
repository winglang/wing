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
export const Tabs1 = (props: TabsProps) => {
  const { tabs } = props;
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue={tabs?.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => tab.onClick(tab.id)}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

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
                {tab?.icon && <div className="mr-1.5">{tab.icon}</div>}
                {tab?.name}
                <button
                  type="button"
                  className={classNames(
                    "ml-1 -mr-1.5 p-1 rounded",
                    tab.current ? "hover:bg-slate-200" : "hover:bg-slate-300",
                    { "invisible group-hover:visible": !tab.current },
                  )}
                  onClick={(event) => {
                    event.stopPropagation();
                    tab?.onCloseClick?.(tab.id);
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
