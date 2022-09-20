import { WingLocalSchema } from "@monadahq/wing-local-schema";

import { constructHubTreeToTreeMenuItems } from "@/stories/utils";

import { RightResizableWidget } from "./RightResizableWidget";
import { TopResizableWidget } from "./TopResizableWidget";
import { TreeMenu } from "./TreeMenu";

export interface VscodeLayoutProps {
  schema: WingLocalSchema | undefined;
}

export const VscodeLayout = ({ schema }: VscodeLayoutProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex">
        <RightResizableWidget className="w-60 min-w-[62px] overflow-x-auto">
          <div className="h-full flex">
            <TreeMenu items={constructHubTreeToTreeMenuItems()} />
          </div>
        </RightResizableWidget>
        <div className="flex-1 bg-green-100"></div>
      </div>

      <TopResizableWidget className="h-60 min-h-[62px] overflow-y-auto">
        <div className="h-full bg-red-100">
          <pre className="p-4 text-xs">
            {JSON.stringify(schema, undefined, 2)}
          </pre>
        </div>
      </TopResizableWidget>
    </div>
  );
};
