import {
  CubeIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowPathRoundedSquareIcon,
  CubeTransparentIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";
import type { IconComponent } from "@wingconsole/design-system";
import {
  useTheme,
  InspectorSection,
  Pill,
  ResourceIcon,
  getResourceIconComponent,
  Attribute,
  ScrollableArea,
  Button,
} from "@wingconsole/design-system";
import type { NodeDisplay } from "@wingconsole/server";
import type {
  UIButton,
  UIComponent,
  UIField,
  UISection,
  UIFileBrowser,
} from "@winglang/sdk/lib/core/tree.js";
import classNames from "classnames";
import { memo, useCallback, useId, useMemo, useState } from "react";

import { QueueMetadataView } from "../features/queue-metadata-view.js";
import { ResourceInteractionView } from "../features/resource-interaction-view.js";
import { trpc } from "../services/trpc.js";

import { BucketMetadata } from "./bucket-metadata.js";
import { CounterMetadata } from "./counter-metadata.js";
import { CustomResourceFileBrowser } from "./custom-resource-file-browser.js";
import { FunctionMetadata } from "./function-metadata.js";
import { ScheduleMetadata } from "./schedule-metadata.js";

interface CustomResourceUiFieldItemProps {
  label: string;
  handlerPath: string;
}

const CustomResourceUiFieldItem = ({
  label,
  handlerPath,
}: CustomResourceUiFieldItemProps) => {
  const field = trpc["app.getResourceUiField"].useQuery(
    {
      resourcePath: handlerPath,
    },
    { enabled: !!handlerPath },
  );
  return <Attribute name={label} value={field.data?.value ?? ""} />;
};

interface CustomResourceUiButtomItemProps {
  label: string;
  handlerPath: string;
}

const CustomResourceUiButtonItem = ({
  label,
  handlerPath,
}: CustomResourceUiButtomItemProps) => {
  const { theme } = useTheme();
  const { mutate: invokeMutation } =
    trpc["app.invokeResourceUiButton"].useMutation();
  const invoke = useCallback(() => {
    invokeMutation({
      resourcePath: handlerPath,
    });
  }, [handlerPath, invokeMutation]);

  const id = useId();
  return (
    <div className="pl-4 flex flex-row items-center">
      <label
        htmlFor={id}
        className={classNames("min-w-[100px] invisible", theme.text2)}
      >
        {label}
      </label>
      <Button id={id} title={label} label={label} onClick={invoke} />
    </div>
  );
};

interface CustomResourceUiItemProps {
  kind: string;
  label: string;
  handlerPath: string;
  others?: any;
}

const getUiComponent = (item: UIComponent) => {
  if (item.kind === "field") {
    return item as UIField;
  }
  if (item.kind === "button") {
    return item as UIButton;
  }
  if (item.kind === "section") {
    return item as UISection;
  }
  if (item.kind === "file-browser") {
    return item as UIFileBrowser;
  }
  return item;
};

const CustomResourceUiItem = ({ item }: { item: UIComponent }) => {
  const uiComponent = getUiComponent(item);
  return (
    <>
      {uiComponent.kind === "field" && (
        <CustomResourceUiFieldItem
          label={uiComponent.label}
          handlerPath={uiComponent.handler}
        />
      )}
      {uiComponent.kind === "button" && (
        <CustomResourceUiButtonItem
          label={uiComponent.label}
          handlerPath={uiComponent.handler}
        />
      )}
      {uiComponent.kind === "file-browser" && (
        <CustomResourceFileBrowser
          label={uiComponent.label}
          putHandler={uiComponent.putHandler}
          getHandler={uiComponent.getHandler}
          listHandler={uiComponent.listHandler}
          deleteHandler={uiComponent.deleteHandler}
        />
      )}
    </>
  );
};

interface AttributeGroup {
  groupName: string;
  actionName?: string;
  icon?: IconComponent;
}

interface ConnectionsGroup {
  groupName: string;
  type: "inbound" | "outbound";
  connections: {
    id: string;
    path: string;
    icon: React.ReactNode;
  }[];
}

interface Relationship {
  id: string;
  path: string;
  type: string;
  display?: NodeDisplay;
}

export interface MetadataNode {
  id: string;
  path: string;
  type: string;
  display?: NodeDisplay;
  props?:
    | {
        [key: string]: any;
      }
    | undefined;
}

export interface MetadataProps {
  node: MetadataNode;
  inbound?: Relationship[];
  outbound?: Relationship[];
  onConnectionNodeClick?: (path: string) => void;
}

export const ResourceMetadata = memo(
  ({ node, inbound, outbound, onConnectionNodeClick }: MetadataProps) => {
    const { theme } = useTheme();
    const [openInspectorSections, setOpenInspectorSections] = useState(() => [
      "resourceUI",
      "interact",
      "interact-actions",
    ]);
    const { resourceGroup, connectionsGroups } = useMemo(() => {
      const connectionsGroupsArray: ConnectionsGroup[] = [];
      let resourceGroup: AttributeGroup | undefined;
      if (node.props) {
        const icon = getResourceIconComponent(node.type, {
          resourceId: node.id,
        });
        switch (node.type) {
          case "@winglang/sdk.cloud.Function": {
            resourceGroup = {
              groupName: "Function",
              actionName: "Invoke",
              icon,
            };
            break;
          }
          case "@winglang/sdk.cloud.Queue": {
            resourceGroup = {
              groupName: "Queue",
              actionName: "Push Message",
              icon,
            };

            break;
          }
          case "@winglang/sdk.cloud.Bucket": {
            resourceGroup = {
              groupName: "Bucket",
              actionName: "Files",
              icon,
            };

            break;
          }
          case "@winglang/sdk.cloud.Counter": {
            resourceGroup = {
              groupName: "Counter",
              icon,
            };

            break;
          }
          case "@winglang/sdk.cloud.Topic": {
            resourceGroup = {
              groupName: "Topic",
              actionName: "Publish Message",
              icon,
            };

            break;
          }
          case "@winglang/sdk.cloud.Api": {
            resourceGroup = {
              groupName: "Api",
              icon,
            };

            break;
          }
          case "@winglang/sdk.ex.Table": {
            resourceGroup = {
              groupName: "Table",
              icon,
            };

            break;
          }
          case "@winglang/sdk.cloud.Schedule": {
            resourceGroup = {
              groupName: "Schedule",
              icon,
            };

            break;
          }
          case "@winglang/sdk.ex.Redis": {
            resourceGroup = {
              groupName: "Redis",
              icon,
            };

            break;
          }
        }
      }

      if (inbound && inbound.length > 0) {
        connectionsGroupsArray.push({
          groupName: "Inbound",
          type: "inbound",
          connections: inbound.map((relationship) => ({
            id: relationship.id,
            path: relationship.path,
            icon: (
              <ResourceIcon
                resourceType={relationship.type}
                resourcePath={relationship.path}
                className="w-4 h-4"
                color={relationship.display?.color}
              />
            ),
          })),
        });
      }
      if (outbound && outbound.length > 0) {
        connectionsGroupsArray.push({
          groupName: "Outbound",
          type: "outbound",
          connections: outbound.map((relationship) => ({
            id: relationship.id,
            path: relationship.path,
            icon: (
              <ResourceIcon
                resourceType={relationship.type}
                resourcePath={relationship.path}
                className="w-4 h-4"
                color={relationship.display?.color}
              />
            ),
          })),
        });
      }
      return {
        resourceGroup,
        connectionsGroups: connectionsGroupsArray,
      };
    }, [node, inbound, outbound]);

    const nodeLabel = useMemo(() => {
      const cloudResourceTypeName = node.type.split(".").at(-1) || "";
      const compilerNamed =
        !!node.display?.title && node.display?.title !== cloudResourceTypeName;
      return compilerNamed ? node.display?.title : node.id;
    }, [node]);

    const toggleInspectorSection = useCallback((section: string) => {
      setOpenInspectorSections(([...sections]) => {
        const index = sections.indexOf(section);
        if (index === -1) {
          sections.push(section);
          return sections;
        } else {
          sections.splice(index, 1);
          return sections;
        }
      });
    }, []);

    const resourceUI = trpc["app.getResourceUI"].useQuery({
      resourcePath: node.path,
    });

    return (
      <ScrollableArea
        overflowY
        className={classNames("h-full text-sm", theme.bg3, theme.text1)}
        dataTestid={`resource-metadata:${node.path}`}
      >
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex-shrink-0">
            <ResourceIcon
              className="w-6 h-6"
              resourceType={node.type}
              resourcePath={node.path}
              color={node.display?.color}
            />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="text-sm font-medium truncate">{nodeLabel}</div>
            <div className="flex">
              <Pill>{node.type}</Pill>
            </div>
          </div>
        </div>
        {resourceUI.data && resourceUI.data.length > 0 && (
          <InspectorSection
            icon={CubeIcon}
            text={nodeLabel ?? "Properties"}
            open={openInspectorSections.includes("resourceUI")}
            onClick={() => toggleInspectorSection("resourceUI")}
            headingClassName="pl-2"
          >
            <div className={classNames("border-t", theme.border4)}>
              <div
                className={classNames(
                  "px-2 py-1.5 flex flex-col gap-y-1 gap-x-4",
                  theme.bg3,
                  theme.text1,
                )}
              >
                {resourceUI.data.map((item, index) => (
                  <CustomResourceUiItem key={index} item={item} />
                ))}
              </div>
            </div>
          </InspectorSection>
        )}

        {(node.type.startsWith("@winglang/sdk.cloud") ||
          node.type.startsWith("@winglang/sdk.redis") ||
          node.type.startsWith("@winglang/sdk.ex")) && (
          <>
            <InspectorSection
              text={resourceGroup?.groupName || "Interact"}
              icon={resourceGroup?.icon || CursorArrowRaysIcon}
              open={openInspectorSections.includes("interact")}
              onClick={() => toggleInspectorSection("interact")}
              headingClassName="pl-2"
            >
              <div
                className={classNames(
                  "border-t",
                  theme.border4,
                  theme.bg3,
                  theme.text1,
                )}
              >
                {resourceGroup?.groupName && (
                  <>
                    {node.type === "@winglang/sdk.cloud.Function" && (
                      <FunctionMetadata node={node} />
                    )}
                    {node.type === "@winglang/sdk.cloud.Queue" && (
                      <QueueMetadataView node={node} />
                    )}
                    {node.type === "@winglang/sdk.cloud.Bucket" && (
                      <BucketMetadata node={node} />
                    )}
                    {node.type === "@winglang/sdk.cloud.Counter" && (
                      <CounterMetadata node={node} />
                    )}
                    {node.type === "@winglang/sdk.cloud.Schedule" && (
                      <ScheduleMetadata node={node} />
                    )}
                    {resourceGroup?.actionName && (
                      <InspectorSection
                        text={resourceGroup.actionName}
                        open={openInspectorSections.includes(
                          "interact-actions",
                        )}
                        onClick={() =>
                          toggleInspectorSection("interact-actions")
                        }
                        subection
                        headingClassName="pl-2"
                      >
                        <div className="pl-6 pr-2 pb-2 h-full relative">
                          <ResourceInteractionView
                            key={node.path}
                            resourceType={node.type}
                            resourcePath={node.path}
                          />
                        </div>
                      </InspectorSection>
                    )}
                  </>
                )}
                {(!resourceGroup?.groupName || !resourceGroup?.actionName) && (
                  <div className="pl-6 pr-2 py-1 relative">
                    <ResourceInteractionView
                      key={node.path}
                      resourceType={node.type}
                      resourcePath={node.path}
                    />
                  </div>
                )}
              </div>
            </InspectorSection>
          </>
        )}

        {node && (
          <>
            <InspectorSection
              text="Node"
              icon={CubeTransparentIcon}
              open={openInspectorSections.includes("node")}
              onClick={() => toggleInspectorSection("node")}
              headingClassName="pl-2"
            >
              <div className={classNames("border-t", theme.border4)}>
                <div
                  className={classNames(
                    "px-2 py-1.5 flex flex-col gap-y-1 gap-x-4",
                    theme.bg3,
                    theme.text1,
                  )}
                >
                  <Attribute name="ID" value={node.id} />
                  <Attribute name="Path" value={node.path} />
                  <Attribute name="Type" value={node.type} />
                  {node.display?.description && (
                    <Attribute
                      name="Description"
                      value={node.display.description}
                    />
                  )}
                </div>
              </div>
            </InspectorSection>

            {connectionsGroups && connectionsGroups.length > 0 && (
              <InspectorSection
                text="Relationships"
                open={openInspectorSections.includes("relationships")}
                icon={ArrowPathRoundedSquareIcon}
                onClick={() => toggleInspectorSection("relationships")}
                headingClassName="pl-2"
              >
                <div className={classNames("border-t", theme.border4)}>
                  {connectionsGroups.map((connectionGroup) => (
                    <div key={connectionGroup.groupName}>
                      <div
                        className={classNames(
                          "relative",
                          theme.bg3,
                          theme.text1,
                        )}
                      >
                        {connectionGroup.connections.map(
                          (connection, index) => (
                            <button
                              key={`${connection.path}_${index}`}
                              className={classNames(
                                theme.bg3,
                                theme.bg3Hover,
                                theme.text1,
                                "w-full flex-shrink-0 max-w-full truncate shadow-sm text-sm pl-4 pr-2 py-1 flex items-center gap-1 min-w-0",
                              )}
                              title={connection.path}
                              onClick={() =>
                                onConnectionNodeClick?.(connection.path)
                              }
                            >
                              <div
                                className={classNames(
                                  "flex-0 flex-shrink-0 flex items-center gap-2 min-w-[100px]",
                                  theme.text1,
                                )}
                              >
                                <div className="pl-2 flex-0 flex-shrink-0">
                                  {connectionGroup.type === "inbound" ? (
                                    <ArrowLeftOnRectangleIcon
                                      className="w-4 h-4 rotate-180 text-green-500"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <ArrowRightOnRectangleIcon
                                      className="w-4 h-4 text-red-500"
                                      aria-hidden="true"
                                    />
                                  )}
                                </div>
                                <span
                                  className={classNames(
                                    "uppercase text-xs",
                                    theme.text1,
                                  )}
                                >
                                  {connectionGroup.type === "inbound"
                                    ? "In"
                                    : "Out"}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 ml-2 5 min-w-0">
                                <div className="flex-shrink-0 -ml-1">
                                  {connection.icon}
                                </div>
                                <div className="truncate">{connection.id}</div>
                              </div>
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </InspectorSection>
            )}

            <div className={classNames(theme.border3, "border-t")}></div>
          </>
        )}
      </ScrollableArea>
    );
  },
);
