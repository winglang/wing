import { ScrollableArea } from "../design-system/ScrollableArea";

import { Relationships } from "./NodeRelationshipsView";

export interface NewRelationship {
  icon: React.ReactNode;
  id: string;
  path: string;
  relationshipName: string;
}

export interface NewNodeRelationshipsViewProps {
  node: {
    icon: React.ReactNode;
    id: string;
    path: string;
  };
  inbound: NewRelationship[];
  outbound: NewRelationship[];
}

export const NewNodeRelationshipsView = ({
  node,
  inbound,
  outbound,
}: NewNodeRelationshipsViewProps) => {
  return (
    <div className="flex gap-2 p-2 bg-slate-50 h-52">
      <div className="flex-1 bg-slate-900/10"></div>
      <div
        className="flex-0 flex flex-col bg-white border border-slate-300/75 shadow-sm min-w-0"
        title={node.id}
      >
        <div className="px-3.5 py-2.5 flex items-center gap-2">
          <div className="flex-shrink-0 -ml-1">{node.icon}</div>
          <div className="flex-1 truncate text-sm">{node.id}</div>
        </div>
        {/* <div className="flex-1 bg-slate-50"></div> */}
      </div>
      <div className="flex-1 bg-slate-900/10 relative">
        <ScrollableArea className="bg-red-100" overflowY>
          <div>
            {outbound.map((relationship) => (
              <div>
                <div>{relationship.relationshipName}</div>
              </div>
            ))}
          </div>
        </ScrollableArea>
      </div>
    </div>
  );
};
