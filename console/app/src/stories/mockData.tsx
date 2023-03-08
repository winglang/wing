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
  "eyJyb290Ijp7InR5cGUiOiJjb25zdHJ1Y3RzLkNvbnN0cnVjdCIsImNoaWxkcmVuIjp7ImNsb3VkLkJ1Y2tldCI6eyJ0eXBlIjoid2luZ3Nkay5jbG91ZC5CdWNrZXQiLCJwcm9wcyI6eyJwdWJsaWMiOmZhbHNlfSwiaW5ib3VuZCI6WyJyb290L2Nsb3VkLlF1ZXVlL09uTWVzc2FnZS1kMmNhOGI1MTQxZjBlNzFiIl0sInBhdGgiOiJyb290L2Nsb3VkLkJ1Y2tldCIsImF0dHJzIjp7ImhhbmRsZSI6InNpbS0wIn19LCJjbG91ZC5RdWV1ZSI6eyJ0eXBlIjoid2luZ3Nkay5jbG91ZC5RdWV1ZSIsInByb3BzIjp7InRpbWVvdXQiOjMwLCJzdWJzY3JpYmVycyI6W3siZnVuY3Rpb25IYW5kbGUiOiIke3Jvb3QvY2xvdWQuUXVldWUvT25NZXNzYWdlLWQyY2E4YjUxNDFmMGU3MWIjYXR0cnMuaGFuZGxlfSIsImJhdGNoU2l6ZSI6MX1dfSwib3V0Ym91bmQiOlsicm9vdC9jbG91ZC5RdWV1ZS9Pbk1lc3NhZ2UtZDJjYThiNTE0MWYwZTcxYiJdLCJjaGlsZHJlbiI6eyJPbk1lc3NhZ2UtZDJjYThiNTE0MWYwZTcxYiI6eyJ0eXBlIjoid2luZ3Nkay5jbG91ZC5GdW5jdGlvbiIsInByb3BzIjp7InNvdXJjZUNvZGVGaWxlIjoiYXNzZXRzL09uTWVzc2FnZS1kMmNhOGI1MTQxZjBlNzFiL2luZGV4LmpzIiwic291cmNlQ29kZUxhbmd1YWdlIjoiamF2YXNjcmlwdCIsImVudmlyb25tZW50VmFyaWFibGVzIjp7IkJVQ0tFVF9IQU5ETEVfMmNkMDkzM2QiOiIke3Jvb3QvY2xvdWQuQnVja2V0I2F0dHJzLmhhbmRsZX0iLCJXSU5HX1NJTV9SVU5USU1FX0ZVTkNUSU9OX1BBVEgiOiJyb290L2Nsb3VkLlF1ZXVlL09uTWVzc2FnZS1kMmNhOGI1MTQxZjBlNzFiIn19LCJpbmJvdW5kIjpbInJvb3QvY2xvdWQuUXVldWUiXSwib3V0Ym91bmQiOlsicm9vdC9jbG91ZC5CdWNrZXQiXSwiZGVwZW5kc09uIjpbInJvb3QvY2xvdWQuQnVja2V0Il0sInBhdGgiOiJyb290L2Nsb3VkLlF1ZXVlL09uTWVzc2FnZS1kMmNhOGI1MTQxZjBlNzFiIiwiYXR0cnMiOnsiaGFuZGxlIjoic2ltLTEifX19LCJkZXBlbmRzT24iOlsicm9vdC9jbG91ZC5RdWV1ZS9Pbk1lc3NhZ2UtZDJjYThiNTE0MWYwZTcxYiJdLCJwYXRoIjoicm9vdC9jbG91ZC5RdWV1ZSIsImF0dHJzIjp7ImhhbmRsZSI6InNpbS0yIn19fSwicGF0aCI6InJvb3QifSwic3RhcnRPcmRlciI6WyJyb290L2Nsb3VkLkJ1Y2tldCIsInJvb3QvY2xvdWQuUXVldWUvT25NZXNzYWdlLWQyY2E4YjUxNDFmMGU3MWIiLCJyb290L2Nsb3VkLlF1ZXVlIl19";
