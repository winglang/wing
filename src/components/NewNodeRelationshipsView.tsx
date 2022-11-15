import classNames from "classnames";

import {
  ArrowLongRightIcon,
  HorizontalLineIcon,
} from "../design-system/icons/index.js";

const RelationshipButton = ({
  node,
  justifyEnd,
  onClick,
}: {
  node: {
    icon: React.ReactNode;
    id: string;
    path: string;
  };
  justifyEnd?: boolean;
  onClick?: (path: string) => void;
}) => {
  return (
    <div className="py-1 flex min-w-0">
      <button
        className={classNames(
          "w-full bg-white px-2 py-1.5 flex items-center text-sm min-w-0 hover:bg-slate-50 text-slate-600 hover:text-slate-700",
          { "justify-end": justifyEnd },
        )}
        title={node.path}
        onClick={() => onClick?.(node.path)}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex-shrink-0">{node.icon}</div>
          <div className="truncate">{node.id}</div>
        </div>
      </button>
    </div>
  );
};
export interface NewRelationship {
  icon: React.ReactNode;
  id: string;
  path: string;
  relationshipName?: string;
}

export interface NewNodeRelationshipsViewProps {
  node: {
    icon: React.ReactNode;
    id: string;
    path: string;
  };
  inbound: NewRelationship[];
  outbound: NewRelationship[];
  onClick?: (path: string) => void;
}

export const NewNodeRelationshipsView = ({
  node,
  inbound,
  outbound,
  onClick,
}: NewNodeRelationshipsViewProps) => {
  const inboundCount = inbound.length;
  const relationshipCount = inboundCount + outbound.length;
  return (
    <div className="grid grid-cols-5 gap-y-1 bg-white text-slate-600 text-sm">
      <div
        style={{ gridRow: `1 / span ${relationshipCount}`, gridColumn: "3" }}
      >
        <button
          className="h-full w-full bg-slate-100 p-1 rounded hover:bg-slate-200 group"
          title={node.path}
          onClick={() => onClick?.(node.path)}
        >
          <div
            className="h-full bg-slate-50 border group-hover:bg-slate-100 border-slate-200 px-2 py-1.5 flex justify-around items-center shadow-sm"
            title={node.path}
          >
            <div className="flex items-center gap-2 text-slate-700 min-w-0">
              <div className="flex-shrink-0">{node.icon}</div>
              <div className="truncate">{node.id}</div>
            </div>
          </div>
        </button>
      </div>

      {inbound.map((node, nodeIndex) => (
        <>
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
                <div className="text-xs bg-white inline-block px-1 truncate">
                  {node.relationshipName}
                </div>
              </div>
            )}
          </div>
        </>
      ))}

      {outbound.map((node, nodeIndex) => (
        <>
          <div
            className="flex items-center relative"
            style={{
              gridColumnStart: "4",
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
                <div className="text-xs bg-white inline-block px-1 truncate">
                  {node.relationshipName}
                </div>
              </div>
            )}
          </div>

          <div
            className="flex"
            style={{
              gridColumnStart: "5",
              gridRowStart: `${inboundCount + 1 + nodeIndex}`,
            }}
          >
            <RelationshipButton node={node} onClick={onClick} />
          </div>
        </>
      ))}
    </div>
  );
};
