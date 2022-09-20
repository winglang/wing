import {
  ArchiveBoxIcon,
  BoltIcon,
  CubeTransparentIcon,
  QueueListIcon,
  CubeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import {
  ConstructSchema,
  ResourceSchema,
  WingLocalSchema,
} from "@monadahq/wing-local-schema";
import React, { ReactNode } from "react";

import { TreeMenuItem } from "@/components/TreeMenu";

import constructHubTree from "../assets/construct-hub-tree.json";

export const flattenTreeMenuItems = (items: TreeMenuItem[]): TreeMenuItem[] => {
  return items.flatMap((item) => {
    return [
      item,
      ...(item.children ? flattenTreeMenuItems(item.children) : []),
    ];
  });
};

export const constructHubTreeToTreeMenuItems = (): TreeMenuItem[] => {
  const tree: TreeMenuItem[] = [];
  const getItemIcon = (item: any): React.ReactNode => {
    if (item?.attributes?.["aws:cdk:cloudformation:type"]) {
      return getResourceIcon(item.attributes["aws:cdk:cloudformation:type"]);
    }

    return (
      <CubeTransparentIcon
        className="w-4 h-4 text-slate-500"
        aria-hidden="true"
      />
    );
  };
  const buildTree = (node: any, parent: TreeMenuItem | undefined) => {
    const item: TreeMenuItem = {
      id: node.path,
      label: node.id,
      children: [],
      parentId: parent?.id,
      icon: getItemIcon(node),
    };
    if (parent) {
      parent.children?.push(item);
    } else {
      tree.push(item);
    }
    if (node.children && Object.keys(node.children).length > 0) {
      // eslint-disable-next-line unicorn/no-array-for-each
      Object.keys(node.children).forEach((child: any) => {
        buildTree(node.children[child], item);
      });
    }
  };
  buildTree(constructHubTree.tree, undefined);
  return tree;
};

export const constructHubTreeToWingSchema = (): WingLocalSchema => {
  const nodeTypeAndProps = (
    node: any,
  ): {
    type: string;
    props: Record<string, any>;
  } => {
    if (node?.attributes?.["aws:cdk:cloudformation:type"]) {
      switch (node.attributes["aws:cdk:cloudformation:type"]) {
        case "AWS::S3::Bucket":
          return {
            type: "cloud.Bucket",
            props: {},
          };
        case "AWS::Lambda::Function":
          return {
            type: "cloud.Function",
            props: {
              sourceCodeFile: "func.js",
              sourceCodeLanguage: "javascript",
              environmentVariables: {
                FOO: "bar",
              },
            },
          };
        case "AWS::SQS::Queue":
          return { type: "cloud.Queue", props: { timeout: "3000" } };
        default:
          // TODO: update schema to support custom resources
          return { type: "cloud.Custom", props: {} };
      }
    } else {
      return { type: "constructs.Construct", props: {} };
    }
  };

  const tree: WingLocalSchema = {
    version: "1.0.0",
    root: {
      id: "App",
      path: "",
      type: "constructs.Construct",
      children: {},
    },
  };

  // TODO: fix types
  const buildTree = (node: any, parent: any | undefined) => {
    const item: {
      path: string;
      children?: {};
      id: string;
      type: string;
      props: Record<string, any>;
    } = {
      id: node.id,
      path: node.path,
      ...nodeTypeAndProps(node),
    };

    if (node.children) {
      item.children = {};
    }
    if (parent) {
      parent.children[item.id] = item;
    } else {
      // @ts-ignore
      tree.root.children[item.id] = item;
    }
    if (node.children && Object.keys(node.children).length > 0) {
      // eslint-disable-next-line unicorn/no-array-for-each
      Object.keys(node.children).forEach((child: any) => {
        buildTree(node.children[child], item);
      });
    }
  };
  buildTree(constructHubTree.tree.children["construct-hub-dev"], undefined);
  return tree;
};

function getResourceIcon(resourceType: string) {
  switch (resourceType) {
    case "AWS::S3::Bucket":
      return getResourceIcon2("cloud.Bucket");
    case "AWS::Lambda::Function":
      return getResourceIcon2("cloud.Function");
    case "AWS::SQS::Queue":
      return getResourceIcon2("cloud.Queue");
    default:
      return getResourceIcon2("constructs.Construct");
  }
}

function getResourceIcon2(resourceType: ResourceSchema["type"]) {
  switch (resourceType) {
    case "cloud.Bucket":
      return (
        <ArchiveBoxIcon
          className="w-4 h-4 text-orange-500"
          aria-hidden="true"
        />
      );
    case "cloud.Function":
      return <BoltIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />;
    case "cloud.Queue":
      return (
        <QueueListIcon
          className="w-4 h-4 text-emerald-500"
          aria-hidden="true"
        />
      );
    case "cloud.Endpoint":
      return (
        <GlobeAltIcon className="w-4 h-4 text-indigo-500" aria-hidden="true" />
      );
    default:
      return <CubeIcon className="w-4 h-4 text-slate-400" aria-hidden="true" />;
  }
}
