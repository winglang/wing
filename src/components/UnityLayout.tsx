import {
  CubeIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import {
  ConstructSchema,
  ResourceSchema,
  WingLocalSchema,
} from "@monadahq/wing-local-schema";
import classNames from "classnames";

import { LeftResizableWidget } from "@/components/LeftResizableWidget";
import { RightResizableWidget } from "@/components/RightResizableWidget";
import { ScrollableArea } from "@/components/ScrollableArea";
import { TopResizableWidget } from "@/components/TopResizableWidget";
import { NodeMap } from "@/utils/nodeMap";

import { ResourceIcon } from "../stories/utils";

const mock = {
  attributeGroups: [
    {
      groupName: "Node Attributes",
      attributes: [
        { key: "ID", value: "scrape-images-d5755084" },
        {
          key: "Path",
          value:
            "App/Custom::CDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C/scrape-images-d5755084",
        },
        {
          key: "Source",
          value: "src/demo.w (20:2)",
          type: "url",
          url: "http://",
        },
      ],
    },
    {
      groupName: "Endpoint Attributes",
      attributes: [
        {
          key: "URL",
          value: "http://localhost:3012",
          type: "url",
          url: "http://localhost:3012",
        },
        { key: "Secure", value: "true" },
      ],
    },
  ],
};

export interface UnityLayoutProps {
  schema?: WingLocalSchema;
  nodeMap?: NodeMap;
}

export function UnityLayout({ schema, nodeMap }: UnityLayoutProps) {
  return (
    <div className="dark h-full text-gray-300 text-xs pt-8 bg-gray-900 select-none">
      <div className="h-full flex items-stretch gap-px">
        <div className="flex-1 flex flex-col gap-px">
          <div className="flex-1 flex items-stretch gap-px">
            <RightResizableWidget className="w-[25%] min-w-[62px] flex flex-col gap-px bg-gray-800 rounded">
              <div>
                <div className="inline-flex bg-gray-700 px-2 py-1 rounded-t cursor-default">
                  <div>Hierarchy</div>
                </div>
                <div className="bg-gray-700 px-1 py-0.5">
                  <div className="rounded bg-gray-800 border-t border-gray-900">
                    {/* <div className="px-1.5 text-xs italic text-gray-500">
          Filter by text...
        </div> */}
                    <input
                      type="text"
                      className="px-1.5 py-0 text-xs italic text-gray-400 bg-transparent w-full placeholder:text-gray-600 rounded-sm border-none"
                      placeholder="Filter by text..."
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <ScrollableArea className="flex flex-col overflow-y-overlay">
                  {schema && renderRootNode(schema.root)}
                </ScrollableArea>
              </div>
            </RightResizableWidget>

            <div className="flex-1 flex flex-col bg-gray-800 overflow-hidden min-w-[12rem]">
              <div className="">
                <div className="inline-flex bg-gray-700 px-2 py-1 rounded-t">
                  <div>Explorer</div>
                </div>
              </div>
              <div className="flex-1 relative">
                <ScrollableArea className="bg-gray-700 overflow-overlay">
                  <div className="p-2 bg-gray-600">
                    <svg
                      className="h-full w-full border-2 border-dashed border-gray-500 text-gray-500"
                      preserveAspectRatio="none"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 200 200"
                      aria-hidden="true"
                    >
                      <path
                        vectorEffect="non-scaling-stroke"
                        strokeWidth="2"
                        d="M0 0l200 200M0 200L200 0"
                      ></path>
                    </svg>
                  </div>
                </ScrollableArea>
              </div>
            </div>
          </div>

          <TopResizableWidget className="h-[33%] min-h-[13rem] flex flex-col bg-gray-800">
            <div className="flex gap-px">
              <div className="inline-flex bg-gray-700 px-2 py-1 rounded-t cursor-default">
                Logs
              </div>
              <div className="inline-flex bg-gray-700/50 px-2 py-1 rounded-t cursor-default">
                Events
              </div>
            </div>

            <div className="flex-1 relative">
              <ScrollableArea className="bg-gray-700 overflow-overlay">
                <div className="p-2 bg-gray-600">
                  <svg
                    className="h-full w-full border-2 border-dashed border-gray-500 text-gray-500"
                    preserveAspectRatio="none"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 200 200"
                    aria-hidden="true"
                  >
                    <path
                      vectorEffect="non-scaling-stroke"
                      strokeWidth="2"
                      d="M0 0l200 200M0 200L200 0"
                    ></path>
                  </svg>
                </div>
              </ScrollableArea>
            </div>
          </TopResizableWidget>
        </div>

        <LeftResizableWidget className="w-[33%] min-w-[24rem] flex flex-col bg-gray-800 rounded">
          <div>
            <div className="inline-flex bg-gray-700 px-2 py-1 rounded-t">
              <div>Inspector</div>
            </div>
          </div>
          <div className="flex-1 bg-gray-700">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <CubeIcon className="w-6 h-6 text-blue-400" aria-hidden="true" />
              <div className="flex flex-col">
                <div className="text-sm font-medium">
                  scrape-images-d5755084
                </div>
                <div>
                  <div className="inline text-xs rounded px-1.5 bg-gray-600 text-gray-300 cursor-default">
                    cloud.Function
                  </div>
                </div>
              </div>
            </div>

            {mock.attributeGroups.map((attributeGroup) => {
              return (
                <>
                  <button className="w-full px-2 py-0.5 flex gap-1 hover:bg-gray-600 group">
                    <ChevronDownIcon
                      className="-ml-1 w-4 h-4 text-gray-400 group-hover:text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="text-gray-300 font-medium group-hover:text-gray-200">
                      {attributeGroup.groupName}
                    </div>
                  </button>

                  <div className="border-t border-gray-800">
                    <div className="px-2 py-1 grid grid-cols-6 gap-y-1 bg-gray-800/40">
                      {attributeGroup.attributes.map((attribute) => {
                        return (
                          <>
                            <div
                              key={`key-${attribute.key}`}
                              className="text-gray-400"
                            >
                              {attribute.key}
                            </div>
                            <div
                              key={`type-${attribute.key}`}
                              className="col-span-5"
                            >
                              {attribute.type === "url" ? (
                                <a
                                  className="underline font-medium"
                                  href={attribute.url}
                                >
                                  {attribute.value}
                                </a>
                              ) : (
                                // <div className="inline-block rounded border-t border-gray-900 bg-gray-800 px-1.5 pb-px max-w-full truncate">
                                //   {attribute.value}
                                // </div>
                                <div className="max-w-full truncate">
                                  {attribute.value}
                                </div>
                              )}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })}

            <button className="w-full px-2 py-0.5 flex gap-1 hover:bg-gray-600 group">
              <ChevronDownIcon
                className="-ml-1 w-4 h-4 text-gray-400 group-hover:text-gray-300"
                aria-hidden="true"
              />
              <div className="text-gray-300 font-medium group-hover:text-gray-200">
                Callers
              </div>
            </button>
            <div className="border-t border-gray-800">
              <div className="flex flex-col bg-gray-800/40">
                <button className="px-1 py-1 flex items-center hover:text-gray-200 group">
                  <div className="flex-0 pl-2">
                    <ChevronRightIcon
                      className={classNames("w-4 h-4")}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex-shrink-0">
                    <ResourceIcon
                      resourceType="cloud.Bucket"
                      className="w-3.5 h-3.5"
                      darkenOnGroupHover
                    />
                  </div>

                  <div
                    className="px-1 truncate"
                    title="construct-hub-dev/ConstructHub/Monitoring/Watchful/constructhubdevConstructHubDenyListPrunePruneHandlerF5B01A79/ErrorsAlarm/Resource"
                  >
                    {/* construct-hub-dev/ConstructHub/Monitoring/Watchful/constructhubdevConstructHubDenyListPrunePruneHandlerF5B01A79/ErrorsAlarm/Resource */}
                    Resource
                  </div>
                </button>
                <button className="px-1 py-1 flex items-center hover:text-gray-200 group">
                  <div className="flex-0 pl-2">
                    <ChevronRightIcon
                      className={classNames("w-4 h-4")}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex-shrink-0">
                    <ResourceIcon
                      resourceType="cloud.Function"
                      className="w-3.5 h-3.5"
                      darkenOnGroupHover
                    />
                  </div>

                  <div
                    className="px-1 truncate"
                    title="construct-hub-dev/ConstructHub/DenyList/Prune/PruneHandler/Resource"
                  >
                    {/* construct-hub-dev/ConstructHub/DenyList/Prune/PruneHandler/Resource */}
                    Resource
                  </div>
                </button>
              </div>
            </div>

            <button className="w-full px-2 py-0.5 flex gap-1 hover:bg-gray-600 group">
              <ChevronRightIcon
                className="-ml-1 w-4 h-4 text-gray-400 group-hover:text-gray-300"
                aria-hidden="true"
              />
              <div className="text-gray-300 font-medium group-hover:text-gray-200">
                Callees
              </div>
            </button>

            <button className="w-full px-2 py-0.5 flex gap-1 hover:bg-gray-600 group">
              <ChevronRightIcon
                className="-ml-1 w-4 h-4 text-gray-400 group-hover:text-gray-300"
                aria-hidden="true"
              />
              <div className="text-gray-300 font-medium group-hover:text-gray-200">
                Test Function
              </div>
            </button>

            <button className="w-full px-2 py-0.5 flex gap-1 hover:bg-gray-600 group">
              <ChevronRightIcon
                className="-ml-1 w-4 h-4 text-gray-400 group-hover:text-gray-300"
                aria-hidden="true"
              />
              <div className="text-gray-300 font-medium group-hover:text-gray-200">
                Logs
              </div>
            </button>

            <button className="w-full px-2 py-0.5 flex gap-1 hover:bg-gray-600 group">
              <ChevronRightIcon
                className="-ml-1 w-4 h-4 text-gray-400 group-hover:text-gray-300"
                aria-hidden="true"
              />
              <div className="text-gray-300 font-medium group-hover:text-gray-200">
                Events
              </div>
            </button>
          </div>
        </LeftResizableWidget>
      </div>
    </div>
  );
}

function renderTreeNode(
  node: ResourceSchema,
  indentLevel: number,
): JSX.Element {
  const hasChildren =
    node.type === "constructs.Construct" && node.children != undefined;
  return (
    <>
      <div className="hover:bg-gray-600 group">
        <button
          className="flex w-full py-px"
          style={{ paddingLeft: `${indentLevel * 0.5}rem` }}
        >
          <div className="flex-0">
            <ChevronDownIcon
              className={classNames(
                "w-4 h-4 text-gray-400 group-hover:text-gray-300",
                {
                  invisible: !hasChildren,
                },
              )}
              aria-hidden="true"
            />
          </div>

          <div className="flex-0">
            <ResourceIcon
              className="w-4 h-4"
              resourceType={node.type}
              darkenOnGroupHover
              aria-hidden="true"
            />
          </div>

          <div className="px-1 group-hover:text-gray-100 truncate">
            {node.id}
          </div>
        </button>
      </div>

      {node.type === "constructs.Construct" &&
        Object.values(node.children ?? {}).map((child) =>
          renderTreeNode(child, indentLevel + 1),
        )}
    </>
  );
}

function renderRootNode(root: ConstructSchema) {
  return (
    <>
      <button className="border-b border-gray-800 bg-gray-600 hover:bg-gray-500 group">
        <div className="flex font-medium py-0.5">
          <div className="flex-0">
            <ChevronDownIcon
              className="w-4 h-4 text-gray-400 group-hover:text-gray-300"
              aria-hidden="true"
            />
          </div>
          {/* <CpuChipIcon
            className="w-4 h-4 text-gray-300 group-hover:text-gray-200"
            aria-hidden="true"
          /> */}
          <div className="px-1 group-hover:text-gray-100 truncate">
            {root.id}
          </div>
        </div>
      </button>

      <div className="flex-1 bg-gray-700">
        {Object.values(root.children ?? {}).map((child) =>
          renderTreeNode(child, 1),
        )}
      </div>
    </>
  );
}
