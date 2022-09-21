import {
  CubeTransparentIcon,
  GlobeAltIcon,
  BoltIcon,
  QueueListIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import {
  ChartBarIcon,
  ChartPieIcon,
  CogIcon,
  MapIcon,
} from "@heroicons/react/24/solid";
import { WingLocalSchema, ResourceSchema } from "@monadahq/wing-local-schema";
import React, { useEffect, useState } from "react";

import { Breadcrumb } from "@/components/Breadcrumbs";
import { TreeMenuItem } from "@/components/TreeMenu";
import { buildNodeMap, NodeMap } from "@/utils/nodeMap";

export const treeMenuItems: TreeMenuItem[] = [
  {
    id: "1",
    icon: <MapIcon className="w-4 h-4 text-slate-400" aria-hidden="true" />,
    label: "Map view",
  },
  {
    id: "2",
    icon: (
      <ChartPieIcon className="w-4 h-4 text-slate-400" aria-hidden="true" />
    ),
    label: "Event explorer",
  },
  {
    id: "3",
    icon: (
      <ChartBarIcon className="w-4 h-4 text-slate-400" aria-hidden="true" />
    ),
    label: "Logs",
  },
  {
    id: "4",
    icon: <CogIcon className="w-4 h-4 text-slate-400" aria-hidden="true" />,
    label: "Resources",
    children: [
      {
        id: "5",
        parentId: "4",
        icon: (
          <CubeTransparentIcon
            className="w-4 h-4 text-slate-500"
            aria-hidden="true"
          />
        ),
        label: "image-scrapper",
        children: [
          {
            id: "6",
            parentId: "5",
            icon: (
              <GlobeAltIcon
                className="w-4 h-4 text-violet-500"
                aria-hidden="true"
              />
            ),
            label: "endpoint",
          },
          {
            id: "7",
            parentId: "5",
            icon: (
              <BoltIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />
            ),
            label: "scrape-images",
          },
        ],
      },
      {
        id: "8",
        parentId: "4",
        icon: (
          <QueueListIcon
            className="w-4 h-4 text-emerald-500"
            aria-hidden="true"
          />
        ),
        label: "queue",
      },
      {
        id: "9",
        parentId: "4",
        icon: (
          <CubeTransparentIcon
            className="w-4 h-4 text-slate-500"
            aria-hidden="true"
          />
        ),
        label: "image-uploader",
        children: [
          {
            id: "10",
            parentId: "9",
            icon: (
              <BoltIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />
            ),
            label: "upload-image",
          },
          {
            id: "11",
            parentId: "9",
            icon: (
              <ArchiveBoxIcon
                className="w-4 h-4 text-orange-500"
                aria-hidden="true"
              />
            ),
            label: "image-bucket",
          },
        ],
      },
    ],
  },
];

export const breadcrumbs: Breadcrumb[] = [
  {
    id: "1",
    name: "resources",
    onClick: (id: string) => console.log(id),
    current: false,
    icon: <CogIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
  },
  {
    id: "2",
    onClick: (id: string) => console.log(id),
    icon: (
      <CubeTransparentIcon
        className="w-4 h-4 text-slate-500"
        aria-hidden="true"
      />
    ),
    name: "image-scrapper",
    current: false,
  },
  {
    id: "3",
    current: false,
    onClick: (id: string) => console.log(id),
    icon: (
      <ArchiveBoxIcon className="w-4 h-4 text-orange-500" aria-hidden="true" />
    ),
    name: "bucket",
  },
  {
    id: "4",
    current: false,
    onClick: (id: string) => console.log(id),
    icon: <BoltIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
    name: "function",
  },
  {
    id: "5",
    onClick: (id: string) => console.log(id),
    icon: (
      <GlobeAltIcon className="w-4 h-4 text-purple-500" aria-hidden="true" />
    ),
    name: "endpoint",
    current: true,
  },
];

export const meta = {
  name: "endpoint",
  source: {
    fileName: "demo.w",
    line: 20,
    column: 2,
  },
};

export interface Relationships {
  self: {
    icon: React.ReactNode;
    name: string;
  };
  parent:
    | {
        icon: React.ReactNode;
        name: string;
      }
    | undefined;
  children: {
    icon: React.ReactNode;
    name: string;
  }[];
  callers: {
    icon: React.ReactNode;
    name: string;
  }[];
  callees: {
    icon: React.ReactNode;
    name: string;
  }[];
}

export const relationships: Relationships = {
  self: {
    icon: (
      <CubeTransparentIcon
        className="w-4 h-4 text-violet-500"
        aria-hidden="true"
      />
    ),
    name: "endpoint",
  },
  parent: {
    icon: (
      <CubeTransparentIcon
        className="w-4 h-4 text-slate-500"
        aria-hidden="true"
      />
    ),
    name: "image-scrapper",
  },
  children: [
    // {
    //   icon: <CubeTransparentIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
    //   name: "child-1",
    // },
  ],
  callers: [],
  callees: [
    {
      icon: (
        <CubeTransparentIcon
          className="w-4 h-4 text-sky-500"
          aria-hidden="true"
        />
      ),
      name: "scrape-images",
    },
  ],
};

export const logs = [
  {
    timestamp: "Oct 20 15:48:34:743",
    content: '"GET /api/v1/fraud-check/ HTTP/1.1" 200 17',
  },
];

interface ConstructHubNode {
  id: string;
  path: string;
  constructInfo?: Record<string, string>;
  attributes?: Record<string, any>;
  children?: Record<string, ConstructHubNode>;
}

function visitConstructHub(
  parent: ConstructHubNode | undefined,
  node: ConstructHubNode,
  callback: (
    parent: ConstructHubNode | undefined,
    child: ConstructHubNode,
  ) => void,
) {
  callback(parent, node);

  for (const child of Object.values(node.children ?? {})) {
    visitConstructHub(node, child, callback);
  }
}

export function buildConstructHubNodeMap(node: ConstructHubNode): NodeMap {
  let nodes: NodeMap = {};

  visitConstructHub(undefined, node, (parent, node) => {
    nodes = {
      ...nodes,
      [node.path]: {
        id: node.id,
        path: node.path,
        type: node.constructInfo?.fqn ?? "",
        parent: parent?.path,
        children: Object.values(node.children ?? {}).map((child) => child.path),
        constructInfo: node.constructInfo,
        attributes: node.attributes,
      },
    };
  });

  return nodes;
}

export function useConstructHubNodeMap() {
  const [nodeMap, setNodeMap] = useState<NodeMap>();

  useEffect(() => {
    void import("../assets/construct-hub-tree.json").then((constructHub) => {
      const nodeMap = buildConstructHubNodeMap(constructHub.tree);
      setNodeMap(nodeMap);
    });
  }, []);

  return nodeMap;
}

export function useTreeNodeMap() {
  const [nodeMap, setNodeMap] = useState<{
    schema?: WingLocalSchema;
    nodeMap?: NodeMap;
  }>({});

  useEffect(() => {
    void import("../assets/tree.json").then((schema) => {
      const nodeMap = buildNodeMap((schema as WingLocalSchema).root);
      setNodeMap({
        schema: schema as WingLocalSchema,
        nodeMap,
      });
    });
  }, []);

  return nodeMap;
}
