import {
  ArrowLongRightIcon,
  HorizontalLineIcon,
  useTheme,
  ResourceIcon,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { Fragment } from "react";

import { ResourceValue } from "../components/map-resource-value/ResourceValue.js";

const RelationshipButton = ({
  node,
  justifyEnd,
  onClick,
}: {
  node: NewRelationship;
  justifyEnd?: boolean;
  onClick?: (path: string) => void;
}) => {
  const { theme } = useTheme();
  return (
    <div className="py-1 flex min-w-0 items-center">
      <button
        className={classNames(
          theme.bg4,
          theme.text2,
          "w-full px-2 py-1.5 flex items-center text-sm min-w-0 rounded shadow hover:shadow-md",
          { "justify-end": justifyEnd },
        )}
        title={node.path}
        onClick={() => onClick?.(node.path)}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex-shrink-0">{node.icon}</div>
          <div className="truncate text-xs">{node.id}</div>
        </div>
      </button>
    </div>
  );
};

const ResourceButton = ({
  node,
  onClick,
  children,
}: {
  node: ResourceNode;
  onClick?: (path: string) => void;
  children?: React.ReactNode;
}) => {
  const { theme } = useTheme();
  return (
    // TODO: Fix a11y
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={classNames(
        theme.bg4,
        theme.text2,
        "h-full w-full p-1 rounded shadow sm:rounded-lg hover:shadow-md group flex flex-col gap-2 cursor-pointer",
      )}
      title={node.path}
      onClick={() => onClick?.(node.path)}
    >
      <div
        className={classNames(
          theme.text1,
          "flex text-xs space-x-2 pt-2 px-2 w-full",
        )}
      >
        <div className="flex items-center flex-shrink-0">
          <ResourceIcon
            resourceType={node.type}
            resourcePath={node.path}
            className="w-4 h-4 inline"
          />
        </div>
        <div className="text-left truncate" title={node.id}>
          {node.id}
        </div>
      </div>
      <div
        className={classNames(
          theme.bg3,
          "rounded-md px-2 py-2 sm:flex sm:items-start sm:justify-between flex-1 w-full",
        )}
      >
        <dl className="mt-3 sm:mt-0 text-xs text-left w-full">
          <div className="grid grid-cols-5 gap-1 w-full">
            <dt className={classNames("truncate", theme.text2)}>Type</dt>
            <dd className="truncate col-span-4" title={node.type}>
              {node.type}
            </dd>
            {children}
          </div>
        </dl>
      </div>
    </div>
  );
};

export interface NewRelationship {
  icon: React.ReactNode;
  id: string;
  path: string;
  relationshipName?: string;
}

export interface ResourceNode {
  icon: React.ReactNode;
  id: string;
  path: string;
  type?: string;
  title?: string;
}

export interface DetailedNodeProps {
  node: ResourceNode;
  inbound: NewRelationship[];
  outbound: NewRelationship[];
  onClick?: (path: string) => void;
}

export const DetailedNode = ({
  node,
  inbound,
  outbound,
  onClick,
}: DetailedNodeProps) => {
  const { theme } = useTheme();

  const inboundCount = inbound.length;
  const relationshipCount = inboundCount + outbound.length;
  return (
    <div
      className={classNames(theme.text2, "grid grid-cols-6 gap-y-1 text-sm")}
    >
      <div
        style={{
          gridRow: `1 / span ${relationshipCount}`,
          gridColumnStart: "3",
          gridColumnEnd: "5",
        }}
      >
        <ResourceButton node={node} onClick={() => onClick?.(node.path)}>
          <ResourceValue node={node} />
        </ResourceButton>
      </div>

      {inbound.map((node, nodeIndex) => (
        <Fragment key={`${node.path}_${node.relationshipName}`}>
          <div
            className="flex justify-end"
            style={{ gridColumnStart: "1", gridRowStart: `${1 + nodeIndex}` }}
          >
            <RelationshipButton node={node} justifyEnd onClick={onClick} />
          </div>

          <div
            className="flex items-center relative"
            style={{ gridColumnStart: "2", gridRowStart: `${1 + nodeIndex}` }}
          >
            <div className={classNames(theme.text2, "w-full flex px-2")}>
              <HorizontalLineIcon
                className="w-full h-4"
                preserveAspectRatio="none"
              />
              <ArrowLongRightIcon className="w-4 h-4 flex-shrink-0" />
            </div>

            {node.relationshipName && (
              <div className="absolute inset-0 flex items-center justify-around px-4">
                <div
                  className={classNames(
                    theme.bg3,
                    "text-xs inline-block px-1 truncate",
                  )}
                  title={node.relationshipName}
                >
                  {node.relationshipName}
                </div>
              </div>
            )}
          </div>
        </Fragment>
      ))}

      {outbound.map((node, nodeIndex) => (
        <Fragment key={`${node.path}_${node.relationshipName}`}>
          <div
            className="flex items-center relative"
            style={{
              gridColumnStart: "5",
              gridRowStart: `${inboundCount + 1 + nodeIndex}`,
            }}
          >
            <div className={classNames(theme.text2, "w-full flex px-2")}>
              <HorizontalLineIcon
                className="w-full h-4"
                preserveAspectRatio="none"
              />
              <ArrowLongRightIcon className="w-4 h-4 flex-shrink-0" />
            </div>

            {node.relationshipName && (
              <div className="absolute inset-0 flex items-center justify-around px-4">
                <div
                  className={classNames(
                    theme.bg3,
                    "text-xs inline-block px-1 truncate",
                  )}
                  title={node.relationshipName}
                >
                  {node.relationshipName}
                </div>
              </div>
            )}
          </div>

          <div
            className="flex"
            style={{
              gridColumnStart: "6",
              gridRowStart: `${inboundCount + 1 + nodeIndex}`,
            }}
          >
            <RelationshipButton node={node} onClick={onClick} />
          </div>
        </Fragment>
      ))}
    </div>
  );
};
