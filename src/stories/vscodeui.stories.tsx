import {
  ArrowLongDownIcon,
  ArrowLongRightIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import classNames from "classnames";
import React, { useState, useEffect } from "react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TreeMenu, TreeMenuItem } from "@/components/TreeMenu";
import {
  breadcrumbs,
  logs,
  meta,
  relationships,
  treeMenuItems,
} from "@/stories/mockData";
import { flattenTreeMenuItems } from "@/stories/utils";

interface VscodeuiProps {}

const flattenedTreeMenu = flattenTreeMenuItems(treeMenuItems);
function findItem(label: string) {
  return flattenedTreeMenu.find((item) => item.label === label);
}

function Tabs() {
  const tabs = [
    { name: "Test", href: "#", current: false },
    { name: "Monitor", href: "#", current: true },
    // { name: "Team Members", href: "#", current: true },
    // { name: "Billing", href: "#", current: false },
  ];

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
          defaultValue={tabs.find((tab) => tab.current)?.name}
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
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <div className="sm:hidden">
  //       <label htmlFor="tabs" className="sr-only">
  //         Select a tab
  //       </label>
  //       {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
  //       <select
  //         id="tabs"
  //         name="tabs"
  //         className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-slate-300 rounded-md"
  //         defaultValue={tabs.find((tab) => tab.current)?.name}
  //       >
  //         {tabs.map((tab) => (
  //           <option key={tab.name}>{tab.name}</option>
  //         ))}
  //       </select>
  //     </div>
  //     <div className="hidden sm:block">
  //       <nav className="flex space-x-4" aria-label="Tabs">
  //         {tabs.map((tab) => (
  //           <a
  //             key={tab.name}
  //             href={tab.href}
  //             className={classNames(
  //               tab.current
  //                 ? "bg-slate-100 text-slate-700"
  //                 : "text-slate-500 hover:text-slate-700",
  //               "px-3 py-2 font-medium text-sm rounded-md",
  //             )}
  //             aria-current={tab.current ? "page" : undefined}
  //           >
  //             {tab.name}
  //           </a>
  //         ))}
  //       </nav>
  //     </div>
  //   </div>
  // );
}

function Vscodeui(props: VscodeuiProps) {
  const [openedTabs, setOpenedTabs] = useState(["image-scrapper", "endpoint"]);
  const [selectedTab, setSelectedTab] = useState(6);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>("6");
  const [openMenuItemIds, setOpenMenuItemIds] = useState<string[]>(["4", "5"]);

  useEffect(() => {
    if (selectedTab >= openedTabs.length) {
      setSelectedTab(openedTabs.length - 1);
    } else {
      setSelectedItemId(openedTabs[selectedTab]);
    }
  }, []);

  const enrichTreeMenuItems = (tree: TreeMenuItem[]): TreeMenuItem[] => {
    return tree.map((item) => {
      return {
        ...item,
        children: item.children ? enrichTreeMenuItems(item.children) : [],
        onTreeItemClick: (item) => {
          setOpenMenuItemIds(([...openedMenuItems]) => {
            const index = openedMenuItems.indexOf(item.id);
            if (index !== -1) {
              openedMenuItems.splice(index, 1);
              return openedMenuItems;
            }

            openedMenuItems.push(item.id);
            return openedMenuItems;
          });
          setSelectedItemId(item.id);
        },
      };
    });
  };

  return (
    <div className="fixed inset-0 flex flex-col p-8">
      <div className="flex-1 flex flex-col rounded-xl bg-slate-300 shadow-xl">
        <div className="h-8 flex items-center px-2 gap-2">
          <div className="rounded-full w-3 h-3 bg-red-500"></div>
          <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
          <div className="rounded-full w-3 h-3 bg-green-500"></div>
        </div>
        <div className="flex-1 flex text-sm text-slate-800 border border-t-0 border-slate-200 rounded-b-xl overflow-hidden">
          <TreeMenu
            title={"Wing Console"}
            selectedItemId={selectedItemId}
            items={enrichTreeMenuItems(treeMenuItems)}
            openMenuItemIds={openMenuItemIds}
          />
          <div className="flex-1 flex flex-col bg-slate-100">
            {openedTabs.length > 0 && (
              <div className="flex h-8">
                {openedTabs.map((openedTab, tabIndex) => {
                  const item = findItem(openedTab);
                  if (!item) {
                    return;
                  }

                  const isSelected = item.id === selectedItemId;

                  return (
                    <div
                      key={item.id}
                      className={classNames(
                        "relative flex items-center px-3 cursor-pointer group",
                        isSelected ? "bg-white" : "bg-slate-200",
                      )}
                      onClick={() => {
                        setSelectedTab(tabIndex);
                      }}
                    >
                      {item?.icon && <div className="mr-1.5">{item.icon}</div>}
                      {item?.label}
                      <button
                        type="button"
                        className={classNames(
                          "ml-1 -mr-1.5 p-1 rounded",
                          isSelected
                            ? "hover:bg-slate-200"
                            : "hover:bg-slate-300",
                          { "invisible group-hover:visible": !isSelected },
                        )}
                        onClick={(event) => {
                          event.stopPropagation();

                          // eslint-disable-next-line @typescript-eslint/no-shadow
                          setOpenedTabs(([...openedTabs]) => {
                            openedTabs.splice(openedTabs.indexOf(item.id), 1);
                            console.log({ item, openedTabs });
                            return openedTabs;
                          });
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
                {/* <div className="flex items-center bg-slate-200 px-3 cursor-pointer">
                <CubeIcon
                  className="w-4 h-4 text-slate-400 mr-1.5"
                  aria-hidden="true"
                />
                image-scrapper
              </div>

              <div className="flex items-center bg-white px-3 cursor-pointer">
                <CubeIcon
                  className="w-4 h-4 text-violet-500 mr-1.5"
                  aria-hidden="true"
                />
                endpoint
                <div className="ml-2 -mr-1 hover:bg-slate-100 p-1 rounded">
                  <XMarkIcon
                    className="w-4 h-4 text-slate-600"
                    aria-hidden="true"
                  />
                </div>
              </div> */}
              </div>
            )}

            <div className="flex-1 bg-white px-3 py-1.5">
              {selectedItemId && (
                <>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                  </div>

                  <div className="py-1.5 flex gap-2">
                    <div className="flex-1 bg-slate-100 p-4 flex gap-2">
                      <div className="flex-1 flex flex-col justify-around items-end pb-3.5">
                        <div className="flex flex-col gap-0.5 items-center">
                          <span className="text-xs font-medium text-slate-600">
                            callers
                          </span>
                          {relationships.callers.length === 0 && (
                            <div className="bg-slate-50 border border-slate-200 shadow text-xs px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:bg-slate-100">
                              <span className="px-2 italic text-slate-500">
                                no callers
                              </span>
                            </div>
                          )}
                          {relationships.callers.map((resource) => (
                            <div
                              key={resource.name}
                              className="bg-slate-50 border border-slate-200 shadow text-xs px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:bg-slate-100"
                            >
                              {resource.icon}
                              {resource.name}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-xs font-medium text-slate-600">
                            parent
                          </span>
                          <div className="bg-slate-50 border border-slate-200 shadow text-xs px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:bg-slate-100">
                            {relationships.parent && (
                              <>
                                {relationships.parent.icon}
                                {relationships.parent.name}
                              </>
                            )}
                            {!relationships.parent && (
                              <span className="px-2 italic">no parent</span>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-around">
                          <ArrowLongDownIcon
                            className="w-4 h-4 text-slate-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex justify-around">
                          <div className="flex items-center gap-2 cursor-default">
                            <ArrowLongRightIcon
                              className="w-4 h-4 text-slate-600"
                              aria-hidden="true"
                            />
                            <div className="bg-white border flex items-center gap-2 px-6 py-3 shadow">
                              {relationships.self.icon}
                              {relationships.self.name}
                            </div>
                            <ArrowLongRightIcon
                              className="w-4 h-4 text-slate-600"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                        <div className="flex justify-around">
                          <ArrowLongDownIcon
                            className="w-4 h-4 text-slate-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex flex-col gap-0.5 items-center">
                          <span className="text-xs font-medium text-slate-600">
                            children
                          </span>

                          {relationships.children.length === 0 && (
                            <div className="bg-slate-50 border border-slate-200 shadow text-xs px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:bg-slate-100">
                              <span className="px-2 italic text-slate-500">
                                no children
                              </span>
                            </div>
                          )}
                          {relationships.children.map((resource) => (
                            <div
                              key={resource.name}
                              className="bg-slate-50 border border-slate-200 shadow text-xs px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:bg-slate-100"
                            >
                              {resource.icon}
                              {resource.name}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-around items-start pb-3.5">
                        <div className="flex flex-col gap-0.5 items-center">
                          <span className="text-xs font-medium text-slate-600">
                            callees
                          </span>

                          {relationships.callees.length === 0 && (
                            <div className="bg-slate-50 border border-slate-200 shadow text-xs px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:bg-slate-100">
                              <span className="px-2 italic text-slate-500">
                                no callees
                              </span>
                            </div>
                          )}
                          {relationships.callees.map((resource) => (
                            <div
                              key={resource.name}
                              className="bg-slate-50 border border-slate-200 shadow text-xs px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:bg-slate-100"
                            >
                              {resource.icon}
                              {resource.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <dl className="px-4 flex-1 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="font-medium text-slate-500">Name</dt>
                        <dd className="mt-1 text-sm text-slate-900">
                          {meta.name}
                        </dd>
                      </div>

                      <div className="sm:col-span-1">
                        <dt className="font-medium text-slate-500">
                          Description
                        </dt>
                        <dd className="mt-1 text-sm text-slate-900">-</dd>
                      </div>

                      <div className="sm:col-span-1">
                        <dt className="font-medium text-slate-500">URL</dt>
                        <dd className="mt-1 text-sm text-slate-900">
                          http://localhost:3001
                        </dd>
                      </div>

                      <div className="sm:col-span-1">
                        <dt className="font-medium text-slate-500">Source</dt>
                        <dd className="mt-1 text-sm text-slate-900">
                          <button className="font-medium text-indigo-600 hover:text-indigo-500">
                            {meta.source.fileName} ({meta.source.line}:
                            {meta.source.column})
                          </button>
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="pt-4">
                    <Tabs />

                    <div className="py-2 flex flex-col gap-2">
                      <div className="bg-green-50 p-4 py-1 flex justify-end items-center italic text-green-400">
                        controls
                      </div>
                      <div className="bg-slate-50 p-4 flex justify-around items-center">
                        <div className="text-slate-400 italic">graph</div>
                      </div>

                      <table className="w-full border">
                        <thead>
                          <tr className="uppercase text-sm font-medium text-slate-700 border-b">
                            <th>
                              <div className="px-2 py-1 flex items-center gap-1.5">
                                <ArrowLongDownIcon
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                />
                                Date
                              </div>
                            </th>
                            <th className="border-b">
                              <div className="px-2 py-1 flex items-center gap-1.5">
                                Content
                              </div>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {logs.map((entry) => (
                            <tr key={entry.timestamp}>
                              <td className="px-2 py-1">{entry.timestamp}</td>
                              <td className="px-2 py-1">{entry.content}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default {
  title: "Playground/VscodeLikeUi",
  component: Vscodeui,
} as ComponentMeta<typeof Vscodeui>;

const Template: ComponentStory<typeof Vscodeui> = (args) => (
  <Vscodeui {...args} />
);
export const Primary = Template.bind({});
