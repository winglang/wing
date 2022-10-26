import classNames from "classnames";
import { useState } from "react";

import { Node } from "../utils/nodeMap.js";

import { NodeAttributes } from "./NodeAttributes.js";
import { NodeInteractionView } from "./NodeInteractionView.js";
import {
  NodeRelationshipsView,
  Relationships,
} from "./NodeRelationshipsView.js";
import { NodeLogs } from "./NogeLogs.js";

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
      case "wingsdk.cloud.Bucket": {
        pills.push({
          id: "interaction",
          text: "Bucket Explorer",
        });

        break;
      }
      case "wingsdk.cloud.Function": {
        pills.push({
          id: "interaction",
          text: "Test Function",
        });

        break;
      }
      case "wingsdk.cloud.Queue": {
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
      <div className="flex-grow-0 flex-shrink-0 w-full p-2 flex justify-around bg-slate-50">
        <div className="max-w-xl">
          {relationships && (
            <NodeRelationshipsView
              key={node.path}
              relationships={relationships}
              onNodeClick={onNodeClick}
            />
          )}
        </div>
      </div>

      <div className="flex bg-white space-x-4 p-2">
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
        {currentPill === "attributes" && (
          <div className="p-2 space-y-8 divide-y divide-slate-200">
            <div className="flex flex-col gap-2">
              <div className="flex-1 flex-shrink-0 min-w-[24rem]">
                <NodeAttributes node={node.schema} />
              </div>
            </div>
          </div>
        )}

        {currentPill === "interaction" && (
          <NodeInteractionView node={node.schema} />
        )}

        {currentPill === "logs" && (
          <NodeLogs
            logs={[{ timestamp: Date.now(), message: "Resource initialized" }]}
          />
        )}
      </div>
    </>
  );
};
