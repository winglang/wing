import classNames from "classnames";
import { useState } from "react";

import { Node } from "@/utils/nodeMap";

import { NodeAttributes } from "./NodeAttributes";
import { NodeInteractionView } from "./NodeInteractionView";
import { NodeRelationshipsView, Relationships } from "./NodeRelationshipsView";
import { ScrollableArea } from "./ScrollableArea";

export interface NodeTabContents {
  node: Node;
  relationships: Relationships;
  onNodeClick?: (path: string) => void;
}

interface Pill {
  id: "attributes" | "interaction" | "logs";
  text: string;
}

export const NodeTabContents = ({
  node,
  relationships,
  onNodeClick,
}: NodeTabContents) => {
  const [currentPill, setCurrentPill] = useState<
    "attributes" | "interaction" | "logs"
  >("attributes");
  const [pills] = useState(() => {
    const pills: Pill[] = [{ id: "attributes", text: "Attributes" }];

    switch (node.type) {
      case "cloud.Bucket": {
        pills.push({
          id: "interaction",
          text: "Bucket Explorer",
        });

        break;
      }
      case "cloud.Function": {
        pills.push({
          id: "interaction",
          text: "Test Function",
        });

        break;
      }
      case "cloud.Queue": {
        pills.push({
          id: "interaction",
          text: "Queue Contents",
        });

        break;
      }
      // No default
    }

    if (node.type !== "constructs.Construct") {
      pills.push({ id: "logs", text: "Logs" });
    }

    return pills;
  });

  return (
    <>
      <div className="flex-grow-0 flex-shrink-0 w-full px-2 pb-2">
        {relationships && (
          <NodeRelationshipsView
            key={node.path}
            relationships={relationships}
            onNodeClick={onNodeClick}
          />
        )}
      </div>

      <div className="flex bg-white space-x-4 px-2">
        {pills.map((pill) => {
          return (
            <button
              key={pill.id}
              className={classNames(
                pill.id === currentPill
                  ? "bg-sky-100 text-sky-700"
                  : "text-slate-500 hover:text-slate-700",
                "px-3 py-2 font-medium text-sm rounded-md",
              )}
              onClick={() => setCurrentPill(pill.id)}
            >
              {pill.text}
            </button>
          );
        })}
      </div>

      <div className="flex-1 h-full w-full relative min-w-[32rem]">
        <ScrollableArea overflowX overflowY className="flex flex-col">
          {currentPill === "attributes" && (
            <div className="p-2 space-y-8 divide-y divide-slate-200">
              <div className="flex flex-col gap-2">
                {/* <div className="flex-grow-0 flex-shrink-0 w-full">
                  {relationships && (
                    <NodeRelationshipsView
                      key={node.path}
                      relationships={relationships}
                      onNodeClick={onNodeClick}
                    />
                  )}
                </div> */}
                <div className="flex-1 flex-shrink-0 min-w-[24rem]">
                  <NodeAttributes node={node.schema} />
                </div>
              </div>
            </div>
          )}

          {currentPill === "interaction" && (
            <NodeInteractionView node={node.schema} />
          )}
        </ScrollableArea>
      </div>
    </>
  );
};
