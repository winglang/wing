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
import React from "react";

import { Breadcrumb } from "../design-system/Breadcrumbs.js";
import { TreeMenuItem } from "../design-system/TreeMenu.js";

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
    icon: <CogIcon className="w-4 h-4 text-slate-500" aria-hidden="true" />,
  },
  {
    id: "2",
    icon: (
      <CubeTransparentIcon
        className="w-4 h-4 text-slate-500"
        aria-hidden="true"
      />
    ),
    name: "image-scrapper",
  },
  {
    id: "3",
    icon: (
      <ArchiveBoxIcon className="w-4 h-4 text-orange-500" aria-hidden="true" />
    ),
    name: "bucket",
  },
  {
    id: "4",
    icon: <BoltIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />,
    name: "function",
  },
  {
    id: "5",
    icon: (
      <GlobeAltIcon className="w-4 h-4 text-purple-500" aria-hidden="true" />
    ),
    name: "endpoint",
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
  inbound: {
    icon: React.ReactNode;
    name: string;
  }[];
  outbound: {
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
  children: [],
  inbound: [],
  outbound: [
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

export const DemoBase64WingSchema =
  "ewogICAgInJvb3QiOiB7CiAgICAgICJ0eXBlIjogImNvbnN0cnVjdHMuQ29uc3RydWN0IiwKICAgICAgImNoaWxkcmVuIjogewogICAgICAgICJteV9xdWV1ZSI6IHsKICAgICAgICAgICJ0eXBlIjogIndpbmdzZGsuY2xvdWQuUXVldWUiLAogICAgICAgICAgInByb3BzIjogewogICAgICAgICAgICAidGltZW91dCI6IDMwLAogICAgICAgICAgICAic3Vic2NyaWJlcnMiOiBbCiAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgImZ1bmN0aW9uSWQiOiAicm9vdC9teV9xdWV1ZS9Pbk1lc3NhZ2UtMjM2ZmYzZDcyYWQwYWU0NiIsCiAgICAgICAgICAgICAgICAiYmF0Y2hTaXplIjogMQogICAgICAgICAgICAgIH0KICAgICAgICAgICAgXQogICAgICAgICAgfSwKICAgICAgICAgICJjYWxsZWVzIjogWwogICAgICAgICAgICAicm9vdC9teV9xdWV1ZS9Pbk1lc3NhZ2UtMjM2ZmYzZDcyYWQwYWU0NiIKICAgICAgICAgIF0sCiAgICAgICAgICAiY2hpbGRyZW4iOiB7CiAgICAgICAgICAgICJPbk1lc3NhZ2UtMjM2ZmYzZDcyYWQwYWU0NiI6IHsKICAgICAgICAgICAgICAidHlwZSI6ICJ3aW5nc2RrLmNsb3VkLkZ1bmN0aW9uIiwKICAgICAgICAgICAgICAicHJvcHMiOiB7CiAgICAgICAgICAgICAgICAic291cmNlQ29kZUZpbGUiOiAiYXNzZXRzL09uTWVzc2FnZS0yMzZmZjNkNzJhZDBhZTQ2L2luZGV4LmpzIiwKICAgICAgICAgICAgICAgICJzb3VyY2VDb2RlTGFuZ3VhZ2UiOiAiamF2YXNjcmlwdCIKICAgICAgICAgICAgICB9LAogICAgICAgICAgICAgICJjYWxsZXJzIjogWwogICAgICAgICAgICAgICAgInJvb3QvbXlfcXVldWUiCiAgICAgICAgICAgICAgXSwKICAgICAgICAgICAgICAicGF0aCI6ICJyb290L215X3F1ZXVlL09uTWVzc2FnZS0yMzZmZjNkNzJhZDBhZTQ2IiwKICAgICAgICAgICAgICAiYXR0cnMiOiB7CiAgICAgICAgICAgICAgICAiZnVuY3Rpb25BZGRyIjogNTUxMzcKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgIH0sCiAgICAgICAgICAiZGVwZW5kc09uIjogWwogICAgICAgICAgICAicm9vdC9teV9xdWV1ZS9Pbk1lc3NhZ2UtMjM2ZmYzZDcyYWQwYWU0NiIKICAgICAgICAgIF0sCiAgICAgICAgICAicGF0aCI6ICJyb290L215X3F1ZXVlIiwKICAgICAgICAgICJhdHRycyI6IHsKICAgICAgICAgICAgInF1ZXVlQWRkciI6IDU1MTM4CiAgICAgICAgICB9CiAgICAgICAgfQogICAgICB9LAogICAgICAicGF0aCI6ICJyb290IgogICAgfSwKICAgICJzdGFydE9yZGVyIjogWwogICAgICAicm9vdC9teV9xdWV1ZS9Pbk1lc3NhZ2UtMjM2ZmYzZDcyYWQwYWU0NiIsCiAgICAgICJyb290L215X3F1ZXVlIgogICAgXQp9Cg==";
