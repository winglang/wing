import classNames from "classnames";
import { Fragment } from "react";

import {
  ArrowLongRightIcon,
  HorizontalLineIcon,
} from "../design-system/icons/index.js";
import { ResourceIcon } from "../stories/utils.js";

import { BucketResourceDetails } from "./ResourceDetails/BucketResourceDetails.js";
import { CounterResourceDetails } from "./ResourceDetails/CounterResourceDetails.js";
import { FunctionResourceDetails } from "./ResourceDetails/FunctionResourceDetails.js";

const RelationshipButton = ({
  node,
  justifyEnd,
  onClick,
}: {
  node: NewRelationship;
  justifyEnd?: boolean;
  onClick?: (path: string) => void;
}) => {
  return (
    <div className="py-1 flex min-w-0 items-center">
      <button
        className={classNames(
          "w-full px-2 py-1.5 flex items-center text-sm min-w-0 rounded bg-white shadow hover:shadow-md text-slate-600",
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
  return (
    <button
      className="h-full w-full p-1 rounded bg-white shadow sm:rounded-lg hover:shadow-md group flex flex-col gap-2"
      title={node.path}
      onClick={() => onClick?.(node.path)}
    >
      <div className="flex text-xs text-slate-900 space-x-2 pt-2 px-2 w-full">
        <div className="flex items-center flex-shrink-0">
          <ResourceIcon resourceType={node.type} className="w-4 h-4 inline" />
        </div>
        <div className="text-left truncate" title={node.id}>
          {node.id}
        </div>
      </div>
      <div className="rounded-md bg-slate-50 px-2 py-2 sm:flex sm:items-start sm:justify-between flex-1 w-full">
        <dl className="mt-3 sm:mt-0 text-xs text-left w-full">
          <div className="grid grid-cols-5 gap-1 w-full">
            <dt className="truncate text-slate-500">Type</dt>
            <dd className="truncate col-span-4" title={node.type}>
              {node.type}
            </dd>
            {children}
          </div>
        </dl>
      </div>
    </button>
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

export interface ExpandedNodeProps {
  node: ResourceNode;
  inbound: NewRelationship[];
  outbound: NewRelationship[];
  onClick?: (path: string) => void;
}

export const ExpandedNode = ({
  node,
  inbound,
  outbound,
  onClick,
}: ExpandedNodeProps) => {
  const inboundCount = inbound.length;
  const relationshipCount = inboundCount + outbound.length;
  return (
    <div className="grid grid-cols-6 gap-y-1 text-slate-600 text-sm">
      <div
        style={{
          gridRow: `1 / span ${relationshipCount}`,
          gridColumnStart: "3",
          gridColumnEnd: "5",
        }}
      >
        <ResourceButton node={node} onClick={() => onClick?.(node.path)}>
          {node.type === "wingsdk.cloud.Counter" && (
            <CounterResourceDetails resource={node} />
          )}
          {node.type === "wingsdk.cloud.Bucket" && (
            <BucketResourceDetails resource={node} />
          )}
          {node.type === "wingsdk.cloud.Function" && (
            <FunctionResourceDetails resource={node} />
          )}
        </ResourceButton>
      </div>

      {inbound.map((node, nodeIndex) => (
        <Fragment key={node.path}>
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
            <div className="w-full flex text-slate-400 px-2">
              <HorizontalLineIcon
                className="w-full h-4"
                preserveAspectRatio="none"
              />
              <ArrowLongRightIcon className="w-4 h-4 flex-shrink-0" />
            </div>

            {node.relationshipName && (
              <div className="absolute inset-0 flex items-center justify-around px-4">
                <div
                  className="text-xs bg-slate-50 inline-block px-1 truncate"
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
        <Fragment key={node.path}>
          <div
            className="flex items-center relative"
            style={{
              gridColumnStart: "5",
              gridRowStart: `${inboundCount + 1 + nodeIndex}`,
            }}
          >
            <div className="w-full flex text-slate-400 px-2">
              <HorizontalLineIcon
                className="w-full h-4"
                preserveAspectRatio="none"
              />
              <ArrowLongRightIcon className="w-4 h-4 flex-shrink-0" />
            </div>

            {node.relationshipName && (
              <div className="absolute inset-0 flex items-center justify-around px-4">
                <div
                  className="text-xs bg-slate-50 inline-block px-1 truncate"
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
