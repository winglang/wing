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

import { TreeMenuItem } from "@/components/TreeMenu";

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

export const breadcrumbs = [
  { icon: undefined, text: "Resources" },
  {
    icon: (
      <CubeTransparentIcon
        className="w-4 h-4 text-slate-500"
        aria-hidden="true"
      />
    ),
    text: "image-scrapper",
  },
  {
    icon: (
      <CubeTransparentIcon
        className="w-4 h-4 text-purple-500"
        aria-hidden="true"
      />
    ),
    text: "endpoint",
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
