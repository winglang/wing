import {
  ArchiveBoxIcon,
  BoltIcon,
  CubeTransparentIcon,
  QueueListIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import React, { ReactNode } from "react";

import constructHubTree from "../assets/construct-hub-tree.json";

import { TreeMenuItem } from "@/components/TreeMenu";

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
      switch (item.attributes["aws:cdk:cloudformation:type"]) {
        case "AWS::S3::Bucket":
          return (
            <ArchiveBoxIcon
              className="w-4 h-4 text-orange-500"
              aria-hidden="true"
            />
          );
        case "AWS::Lambda::Function":
          return (
            <BoltIcon className="w-4 h-4 text-sky-500" aria-hidden="true" />
          );
        case "AWS::SQS::Queue":
          return (
            <QueueListIcon
              className="w-4 h-4 text-emerald-500"
              aria-hidden="true"
            />
          );
        default:
          return (
            <CubeIcon className="w-4 h-4 text-slate-400" aria-hidden="true" />
          );
      }
    } else {
      return (
        <CubeTransparentIcon
          className="w-4 h-4 text-slate-500"
          aria-hidden="true"
        />
      );
    }
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
