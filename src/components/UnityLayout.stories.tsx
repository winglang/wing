import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ConstructSchema, ResourceSchema } from "@monadahq/wing-local-schema";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import classNames from "classnames";

import { buildNodeMap } from "@/utils/nodeMap";

import { constructHubTreeToWingSchema, ResourceIcon } from "../stories/utils";

import { UnityLayout } from "./UnityLayout";

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

export function renderRootNode(root: ConstructSchema) {
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

export default {
  title: "Playground/UnityUi",
  component: UnityLayout,
  args: {},
} as ComponentMeta<typeof UnityLayout>;

const Template: ComponentStory<typeof UnityLayout> = () => {
  // const { schema, nodeMap } = useTreeNodeMap();
  const schema = constructHubTreeToWingSchema();
  const nodeMap = buildNodeMap(schema.root);

  return (
    <div className="select-none dark fixed left-0 top-0 h-full w-full">
      <UnityLayout schema={schema} nodeMap={nodeMap} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
