import {
  ArchiveBoxIcon,
  BoltIcon,
  CubeTransparentIcon,
  QueueListIcon,
  CubeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { ResourceSchema, WingLocalSchema } from "@monadahq/wing-local-schema";
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

export const WingSchemaToTreeMenuItems = (
  schema: WingLocalSchema,
): TreeMenuItem[] => {
  const tree: TreeMenuItem[] = [];
  const buildTree = (node: any, parent: TreeMenuItem | undefined) => {
    const item: TreeMenuItem = {
      id: node.path,
      label: node.id,
      children: [],
      parentId: parent?.id,
      icon: getResourceIcon(node.type),
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
  buildTree(schema.root, undefined);
  return tree;
};

// resource id is not unique, so we need to use the path
const getConstructHubResourcePaths = (): string[] => {
  const resourceIds: string[] = [];
  const getResourceIds = (node: any) => {
    if (isContHubResource(node)) {
      resourceIds.push(node.path);
    }
    if (node.children && Object.keys(node.children).length > 0) {
      // eslint-disable-next-line unicorn/no-array-for-each
      Object.keys(node.children).forEach((child: any) => {
        getResourceIds(node.children[child]);
      });
    }
  };
  getResourceIds(constructHubTree.tree.children["construct-hub-dev"]);
  return resourceIds;
};

const getRandomArrayOfResourcesPaths = (resourcesArray: any[]): string[] => {
  // random index array
  const arrayLength = Math.floor(Math.random() * 8);
  if (!arrayLength) return [];

  const indexArray = Array.from({ length: arrayLength }, () =>
    Math.floor(Math.random() * resourcesArray.length),
  );
  // random resource paths array
  const resourcePaths = [];
  for (let i = 0; i < arrayLength; i++) {
    // @ts-ignore
    resourcePaths.push(resourcesArray[indexArray[i]]);
  }
  return resourcePaths;
};

const isContHubResource = (node: any): boolean => {
  return node?.attributes?.["aws:cdk:cloudformation:type"] !== undefined;
};

const hubNodeTypeAndProps = (
  node: any,
): {
  type: string;
  props: Record<string, any>;
} => {
  if (isContHubResource(node)) {
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

export const constructHubTreeToWingSchema = (): WingLocalSchema => {
  const tree: WingLocalSchema = {
    version: "1.0.0",
    root: {
      id: "App",
      path: "",
      type: "constructs.Construct",
      children: {},
    },
  };

  const resourcePathsArray = getConstructHubResourcePaths();

  // TODO: fix types
  const buildTree = (node: any, parent: any | undefined) => {
    const item: {
      path: string;
      children?: {};
      callers?: string[];
      callees?: string[];
      id: string;
      type: string;
      props: Record<string, any>;
    } = {
      id: node.id,
      path: node.path,
      ...hubNodeTypeAndProps(node),
    };

    if (isContHubResource(node)) {
      item.callers = getRandomArrayOfResourcesPaths(resourcePathsArray);
      item.callees = getRandomArrayOfResourcesPaths(resourcePathsArray);
    }

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

export function getResourceIcon(resourceType: ResourceSchema["type"]) {
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
    case "constructs.Construct":
      return (
        <CubeTransparentIcon
          className="w-4 h-4 text-slate-500"
          aria-hidden="true"
        />
      );
    default:
      return <CubeIcon className="w-4 h-4 text-slate-400" aria-hidden="true" />;
  }
}
