import {
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import classNames from "classnames";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";

import {
  BaseResourceSchema,
  WingSimulatorSchema,
} from "../../electron/main/wingsdk.js";
import { LeftResizableWidget } from "../design-system/LeftResizableWidget.js";
import { RightResizableWidget } from "../design-system/RightResizableWidget.js";
import { ScrollableArea } from "../design-system/ScrollableArea.js";
import { TopResizableWidget } from "../design-system/TopResizableWidget.js";
import { ResourceIcon, SchemaToTreeMenuItems } from "../stories/utils.js";
import { Node, useNodeMap } from "../utils/nodeMap.js";
import { useTreeMenuItems } from "../utils/useTreeMenuItems.js";

interface Attribute {
  key: string;
  value: string;
  type?: "url";
  url?: string;
}

interface AttributeGroup {
  groupName: string;
  attributes: Attribute[];
}

interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}
const Link = ({ className, ...props }: LinkProps) => {
  return (
    <a
      className={classNames(
        "underline font-medium text-slate-300 hover:text-slate-200",
        "rounded",
        "outline-none focus:ring ring-sky-700",
        className,
      )}
      {...props}
    />
  );
};

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}
const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={classNames(
        "px-1.5 py-0.5 shadow-sm rounded bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white transition-all ease-in-out",
        "border border-slate-800",
        "outline-none focus:ring-2 ring-sky-700",
        className,
      )}
      {...props}
    />
  );
};

interface InspectorSectionHeadingProps {
  open?: boolean;
  text: string;
  onClick?: () => void;
}
const InspectorSectionHeading = ({
  open,
  text,
  onClick,
}: InspectorSectionHeadingProps) => {
  const Icon = open ? ChevronDownIcon : ChevronRightIcon;
  return (
    <button
      className={classNames(
        "w-full px-1 py-0.5 flex gap-1 hover:bg-slate-600 group",
        "outline-none focus:ring ring-sky-700 relative",
      )}
      onClick={onClick}
    >
      <Icon
        className="w-4 h-4 text-slate-400 group-hover:text-slate-300"
        aria-hidden="true"
      />
      <div className="text-slate-300 font-medium group-hover:text-slate-200">
        {text}
      </div>
    </button>
  );
};

interface InspectorSectionProps {
  open?: boolean;
  text: string;
  onClick?: () => void;
}
const InspectorSection = ({
  open,
  text,
  onClick,
  children,
}: PropsWithChildren<InspectorSectionProps>) => {
  return (
    <>
      <InspectorSectionHeading text={text} open={open} onClick={onClick} />
      {open && children}
    </>
  );
};

const SELECTED_TREE_ITEM_CSS_ID = "current-tree-item";

export interface UnityLayoutProps {
  schema?: WingSimulatorSchema;
}

export function UnityLayout({ schema }: UnityLayoutProps) {
  const nodeMap = useNodeMap(schema?.root);
  const invokeFunctionId = useId();
  const treeMenu = useTreeMenuItems();
  useEffect(() => {
    treeMenu.setItems(schema ? SchemaToTreeMenuItems(schema) : []);
  }, [schema]);
  useEffect(() => {
    treeMenu.expand("");
    treeMenu.expandAll();
    treeMenu.setCurrent("");
  }, [treeMenu.items]);
  const [currentNode, setCurrentNode] = useState<Node>();
  const [attributeGroups, setAttributeGroups] = useState<AttributeGroup[]>();

  useEffect(() => {
    const node = nodeMap?.find(treeMenu.currentItemId);
    setCurrentNode(node);
    if (!node) {
      setAttributeGroups(undefined);
    } else {
      let attributeGroups: AttributeGroup[] = [
        {
          groupName: "Node",
          attributes: [
            { key: "ID", value: node.id },
            {
              key: "Path",
              value: node.path,
            },
            {
              key: "Source",
              value: "src/demo.w (20:2)",
              type: "url",
              url: "http://",
            },
          ],
        },
      ];

      if (node.type === "wingsdk.cloud.Bucket") {
        attributeGroups = [
          ...attributeGroups,
          {
            groupName: "Bucket Attributes",
            attributes: [
              {
                key: "URL",
                value: "http://localhost:3012",
                type: "url",
                url: "http://localhost:3012",
              },
              { key: "Secure", value: "true" },
            ] as Attribute[],
          },
        ];
      }

      if (node.type === "wingsdk.cloud.Endpoint") {
        attributeGroups = [
          ...attributeGroups,
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
            ] as Attribute[],
          },
        ];
      }

      setAttributeGroups(attributeGroups);
    }
    // }, [nodeMap, treeMenu.currentItemId]);
  }, [treeMenu.currentItemId]);

  useEffect(() => {
    document.querySelector(`.${SELECTED_TREE_ITEM_CSS_ID}`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [treeMenu.currentItemId]);

  const onTreeMenuItemClick = useCallback(
    (path: string) => {
      treeMenu.setCurrent(path);
      // if (treeMenu.currentItemId === path) {
      //   treeMenu.toggle(path);
      // }
    },
    [treeMenu.currentItemId],
  );

  const onTreeMenuItemDoubleClick = (path: string) => {
    treeMenu.toggle(path);
  };

  const [openInspectorSections, setOpenInspectorSections] = useState(["Node"]);
  const toggleInspectorSection = (section: string) => {
    setOpenInspectorSections(([...sections]) => {
      const index = sections.indexOf(section);
      if (index !== -1) {
        sections.splice(index, 1);
        return sections;
      } else {
        sections.push(section);
        return sections;
      }
    });
  };

  return (
    <div className="dark h-full text-slate-300 text-xs pt-px bg-slate-900 select-none">
      <div className="h-full flex items-stretch gap-px">
        <div className="flex-1 flex flex-col gap-px">
          <div className="flex-1 flex items-stretch gap-px">
            <RightResizableWidget className="w-[25%] min-w-[10rem] flex flex-col gap-px bg-slate-800 rounded">
              <div>
                <div className="inline-flex bg-slate-700 px-2 py-1 rounded-t cursor-default">
                  <div>Hierarchy</div>
                </div>
                <div className="bg-slate-700 px-1 py-0.5">
                  <div className="rounded bg-slate-800 border-t border-slate-900">
                    <input
                      type="text"
                      // className="px-1.5 py-0 text-xs italic text-slate-400 bg-transparent w-full placeholder:text-slate-600 rounded-sm border-none"
                      className={classNames(
                        "px-1.5 py-0",
                        "text-xs text-slate-300 w-full placeholder:text-slate-600 rounded",
                        "transition-all ease-in-out",
                        "shadow-sm",
                        "border-t border-x-0 border-b-0 border-slate-900 focus:border-slate-900 bg-slate-800",
                        "outline-none focus:ring-2 ring-sky-700 focus:ring-sky-700",
                      )}
                      placeholder="Filter by text..."
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <ScrollableArea
                  overflowY
                  className="flex flex-col overflow-x-hidden"
                >
                  {schema && (
                    <RootNode
                      root={schema.root}
                      openItemIds={treeMenu.openItemIds}
                      selectedItemId={treeMenu.currentItemId}
                      onItemClick={onTreeMenuItemClick}
                      onItemDoubleClick={onTreeMenuItemDoubleClick}
                    />
                  )}
                </ScrollableArea>
              </div>
            </RightResizableWidget>

            <div className="flex-1 flex flex-col bg-slate-800 overflow-hidden min-w-[12rem]">
              <div className="">
                <div className="inline-flex bg-slate-700 px-2 py-1 rounded-t">
                  <div>Explorer</div>
                </div>
              </div>
              <div className="flex-1 relative">
                <ScrollableArea className="bg-slate-700 overflow-overlay">
                  <div className="p-2 bg-slate-600">
                    <svg
                      className="h-full w-full border-2 border-dashed border-slate-500 text-slate-500"
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

          <TopResizableWidget className="h-[33%] min-h-[2rem] flex flex-col bg-slate-800">
            <div className="flex gap-px">
              <div className="inline-flex bg-slate-700 px-2 py-1 rounded-t cursor-default">
                Logs
              </div>
              <div className="inline-flex bg-slate-700/50 px-2 py-1 rounded-t cursor-default">
                Events
              </div>
            </div>

            <div className="flex-1 relative">
              <ScrollableArea className="bg-slate-700 overflow-overlay">
                <div className="p-2 bg-slate-600">
                  <svg
                    className="h-full w-full border-2 border-dashed border-slate-500 text-slate-500"
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

        <LeftResizableWidget className="w-[33%] min-w-[20rem] flex flex-col bg-slate-800 rounded">
          <div>
            <div className="inline-flex bg-slate-700 px-2 py-1 rounded-t">
              <div>Inspector</div>
            </div>
          </div>
          <div className="flex-1 bg-slate-700 z-10">
            {currentNode && (
              <>
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <div className="flex-shrink-0">
                    <ResourceIcon
                      className="w-6 h-6"
                      resourceType={currentNode.type}
                    />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="text-sm font-medium truncate">
                      {currentNode.id}
                    </div>
                    <div className="truncate min-w-0">
                      <Pill>{currentNode.type}</Pill>
                    </div>
                  </div>
                </div>

                {attributeGroups?.map((attributeGroup) => {
                  return (
                    <div key={attributeGroup.groupName}>
                      <InspectorSection
                        text={attributeGroup.groupName}
                        open={openInspectorSections.includes(
                          attributeGroup.groupName,
                        )}
                        onClick={() =>
                          toggleInspectorSection(attributeGroup.groupName)
                        }
                      >
                        <div className="border-t border-slate-800">
                          <div className="px-2 py-1 grid grid-cols-6 gap-y-1 bg-slate-800/40">
                            {attributeGroup.attributes.map((attribute) => {
                              return (
                                <AttributeView
                                  key={attribute.key}
                                  attribute={attribute}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </InspectorSection>
                    </div>
                  );
                })}

                <InspectorSection
                  text="Relationships"
                  open={openInspectorSections.includes("relationships")}
                  onClick={() => toggleInspectorSection("relationships")}
                >
                  <div className="border-t border-slate-800">
                    <div className="flex flex-col bg-slate-800/40">
                      {currentNode.inbound.length === 0 &&
                        currentNode.outbound.length === 0 && (
                          <div className="px-2 py-1 text-slate-400 italic">
                            This resource has no relationships.
                          </div>
                        )}
                      {currentNode.inbound.map((path) => {
                        const node = nodeMap?.find(path);
                        if (node) {
                          return (
                            <RelationshipItem
                              node={node}
                              relationshipType="inbound"
                              onClick={() => {
                                treeMenu.setCurrent(path);
                                treeMenu.expand(path);
                              }}
                            />
                          );
                        }
                      })}
                      {currentNode.outbound.map((path) => {
                        const node = nodeMap?.find(path);
                        if (node) {
                          return (
                            <RelationshipItem
                              node={node}
                              relationshipType="outbound"
                              onClick={() => {
                                treeMenu.setCurrent(path);
                                treeMenu.expand(path);
                              }}
                            />
                          );
                        }
                      })}
                    </div>
                  </div>
                </InspectorSection>

                {currentNode.type === "wingsdk.cloud.Function" && (
                  <InspectorSection
                    text="Invoke Function"
                    open={openInspectorSections.includes("function")}
                    onClick={() => toggleInspectorSection("function")}
                  >
                    <div className="border-t border-slate-800">
                      <div className="flex flex-col bg-slate-800/40">
                        <div className="px-2 py-1 flex flex-col gap-2">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <label
                                htmlFor={invokeFunctionId}
                                className="text-slate-400"
                              >
                                Request
                              </label>

                              <Button>Invoke</Button>
                            </div>
                            <textarea
                              id={invokeFunctionId}
                              rows={4}
                              className={classNames(
                                "px-1.5 py-1 text-xs text-slate-300 w-full placeholder:text-slate-600 rounded",
                                "transition-all ease-in-out",
                                "shadow-sm",
                                "border-t border-x-0 border-b-0 border-slate-900 focus:border-slate-900 bg-slate-800",
                                "outline-none focus:ring-2 ring-sky-700 focus:ring-sky-700",
                              )}
                              autoComplete="off"
                              autoCapitalize="none"
                              spellCheck="false"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400">Response</span>
                              <Button>Clear</Button>
                            </div>
                            <div className="rounded bg-slate-800 border-t border-slate-900">
                              <pre className="px-1.5 py-1 text-xs text-slate-500 bg-transparent w-full rounded-sm border-none select-text cursor-default">
                                {JSON.stringify(
                                  {
                                    status: 500,
                                    message: "Server Error",
                                  },
                                  undefined,
                                  2,
                                )}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </InspectorSection>
                )}

                <InspectorSection
                  text="Logs"
                  open={openInspectorSections.includes("logs")}
                  onClick={() => toggleInspectorSection("logs")}
                >
                  <div className="border-t border-slate-800">
                    <div className="flex flex-col bg-slate-800/40">
                      <div className="px-2 py-1 text-slate-400 italic">
                        This resource has no logs.
                      </div>
                    </div>
                  </div>
                </InspectorSection>

                <InspectorSection
                  text="Events"
                  open={openInspectorSections.includes("events")}
                  onClick={() => toggleInspectorSection("events")}
                >
                  <div className="border-t border-slate-800">
                    <div className="flex flex-col bg-slate-800/40">
                      <div className="px-2 py-1 text-slate-400 italic">
                        This resource has no events.
                      </div>
                    </div>
                  </div>
                </InspectorSection>
              </>
            )}
          </div>
        </LeftResizableWidget>
      </div>
    </div>
  );
}

function TreeNode({
  node,
  indentLevel,
  selectedItemId,
  openItemIds,
  onItemClick,
  onItemDoubleClick,
}: {
  node: BaseResourceSchema;
  indentLevel: number;
  selectedItemId?: string;
  openItemIds: string[];
  onItemClick?: (path: string) => void;
  onItemDoubleClick?: (path: string) => void;
}): JSX.Element {
  const hasChildren = node.children != undefined;
  const isOpen = openItemIds.includes(node.path ?? "");
  const isSelected = selectedItemId === node.path;
  const ChevronIcon = isOpen ? ChevronDownIcon : ChevronRightIcon;
  return (
    <>
      <div
        key={node.path}
        className={classNames("hover:bg-slate-600 group", {
          "bg-slate-600/75": isSelected,
          [SELECTED_TREE_ITEM_CSS_ID]: isSelected,
        })}
      >
        <button
          className="flex w-full py-px"
          style={{ paddingLeft: `${indentLevel * 0.5}rem` }}
          onClick={() => onItemClick?.(node.path ?? "")}
          onDoubleClick={() => onItemDoubleClick?.(node.path ?? "")}
        >
          <div className="flex-0">
            <ChevronIcon
              className={classNames("w-4 h-4 group-hover:text-slate-300", {
                invisible: !hasChildren,
                "text-slate-300": isSelected,
                "text-slate-400": !isSelected,
              })}
              aria-hidden="true"
            />
          </div>

          <div className="flex-0 relative">
            <ResourceIcon
              // className="w-4 h-4 animate-pulse"
              className="w-4 h-4"
              resourceType={node.type}
              forceDarken={isSelected}
              darkenOnGroupHover
              aria-hidden="true"
            />
            <div className="absolute inset-0 invisible group-hover:visible">
              <ResourceIcon
                className="w-4 h-4 animate-ping"
                resourceType={node.type}
                forceDarken={isSelected}
                darkenOnGroupHover
                aria-hidden="true"
              />
            </div>
          </div>

          <div
            className={classNames("px-1 group-hover:text-slate-100 truncate", {
              "text-slate-100": isSelected,
            })}
          >
            {node.path?.split("/").pop()}
          </div>
        </button>
      </div>

      {isOpen &&
        Object.values(node.children ?? {}).map((child) => (
          <TreeNode
            key={child.path}
            node={child}
            indentLevel={indentLevel + 1}
            selectedItemId={selectedItemId}
            openItemIds={openItemIds}
            onItemClick={onItemClick}
            onItemDoubleClick={onItemDoubleClick}
          />
        ))}
    </>
  );
}

function RootNode({
  root,
  selectedItemId,
  openItemIds,
  onItemClick,
  onItemDoubleClick,
}: {
  root: BaseResourceSchema;
  selectedItemId?: string;
  openItemIds: string[];
  onItemClick?: (path: string) => void;
  onItemDoubleClick?: (path: string) => void;
}) {
  return (
    <div className="flex-1 bg-slate-700">
      <TreeNode
        node={root}
        indentLevel={0}
        selectedItemId={selectedItemId}
        openItemIds={openItemIds}
        onItemClick={onItemClick}
        onItemDoubleClick={onItemDoubleClick}
      />
    </div>
  );
}

function AttributeView({ attribute }: { attribute: Attribute }) {
  return (
    <>
      <div className="text-slate-400">{attribute.key}</div>
      <div className="col-span-5">
        {attribute.type === "url" ? (
          <Link href={attribute.url}>{attribute.value}</Link>
        ) : (
          <div className="max-w-full truncate">{attribute.value}</div>
        )}
      </div>
    </>
  );
}

function RelationshipItem({
  node,
  relationshipType,
  onClick,
}: {
  node: Node;
  relationshipType: "inbound" | "outbound";
  onClick?: () => void;
}) {
  return (
    <button
      className="flex items-center gap-1 hover:text-slate-200 group"
      onClick={onClick}
    >
      <div className="flex-0 flex-shrink-0 w-1/6 flex items-center gap-1.5 text-slate-400 px-1 pl-2 py-1">
        <div className="flex-0 flex-shrink-0">
          {relationshipType === "inbound" ? (
            <ArrowLeftOnRectangleIcon
              className="w-4 h-4 rotate-180"
              aria-hidden="true"
            />
          ) : (
            <ArrowRightOnRectangleIcon className="w-4 h-4" aria-hidden="true" />
          )}
        </div>
        <span className="text-slate-500">
          {relationshipType === "inbound" ? "in" : "out"}
        </span>
      </div>

      <div className="flex items-center gap-1.5 min-w-0 pr-2">
        <div className="flex-shrink-0">
          <ResourceIcon
            resourceType={node.type}
            className="w-4 h-4"
            darkenOnGroupHover
          />
        </div>

        <div className="truncate" title={node.id}>
          {node.id}
        </div>

        <Pill xxs>Invoke</Pill>
      </div>
    </button>
  );
}

function Pill({
  children,
  xxs,
}: PropsWithChildren<{
  xxs?: boolean;
}>) {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded bg-slate-600 px-1.5 text-slate-300 shadow",
        { "text-[0.6rem]": xxs },
      )}
    >
      {children}
    </span>
  );
}
