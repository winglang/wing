import {
  ArchiveBoxIcon,
  BoltIcon,
  CalculatorIcon,
  ClockIcon,
  CubeIcon,
  CubeTransparentIcon,
  GlobeAltIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";
import {
  ArchiveBoxIcon as SolidArchiveBoxIcon,
  BoltIcon as SolidBoltIcon,
  CalculatorIcon as SolidCalculatorIcon,
  ClockIcon as SolidClockIcon,
  CubeIcon as SolidCubeIcon,
  CubeTransparentIcon as SolidCubeTransparentIcon,
  GlobeAltIcon as SolidGlobeAltIcon,
  QueueListIcon as SolidQueueListIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import classNames from "classnames";
import React from "react";

import {
  BaseResourceSchema,
  WingSimulatorSchema,
} from "../../electron/main/wingsdk.js";
import { TreeMenuItem } from "../design-system/TreeMenu.js";

export const flattenTreeMenuItems = (items: TreeMenuItem[]): TreeMenuItem[] => {
  return items.flatMap((item) => {
    return [
      item,
      ...(item.children ? flattenTreeMenuItems(item.children) : []),
    ];
  });
};

export const SchemaToTreeMenuItems = (
  schema: WingSimulatorSchema,
): TreeMenuItem[] => {
  const tree: TreeMenuItem[] = [];
  const buildTree = (
    node: BaseResourceSchema,
    parent: TreeMenuItem | undefined,
  ) => {
    const item: TreeMenuItem = {
      id: node.path ?? "",
      label: node.path?.split("/").pop() ?? "",
      children: [],
      parentId: parent?.id,
      icon: (
        <ResourceIcon
          resourceType={node.type}
          className="w-4 h-4"
          darkenOnGroupHover
        />
      ),
    };
    if (parent) {
      parent.children?.push(item);
    } else {
      tree.push(item);
    }
  };
  return tree;
};

const CubeTransparentExIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <div className="relative">
      <div className="opacity-40">
        <CubeIcon {...props} />
      </div>

      <CubeTransparentIcon
        {...props}
        className={classNames(props.className, "absolute inset-0 opacity-70")}
      />
    </div>
  );
};

export const CustomResourceIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <div className="relative">
      <CubeIcon {...props} />

      <div
        className={classNames(
          "bg-slate-100 absolute inset-0 scale-[55%] origin-bottom-right",
        )}
      >
        <Cog6ToothIcon className={props.className} />
      </div>
    </div>
  );
};

export const getResourceIconComponent = (
  resourceType: BaseResourceSchema["type"] | undefined,
  { solid = false }: { solid?: boolean } = {},
) => {
  switch (resourceType) {
    case "wingsdk.cloud.Bucket": {
      return solid ? SolidArchiveBoxIcon : ArchiveBoxIcon;
    }
    case "wingsdk.cloud.Function": {
      return solid ? SolidBoltIcon : BoltIcon;
    }
    case "wingsdk.cloud.Queue": {
      return solid ? SolidQueueListIcon : QueueListIcon;
    }
    case "wingsdk.cloud.Endpoint": {
      return solid ? SolidGlobeAltIcon : GlobeAltIcon;
    }
    case "wingsdk.cloud.Counter": {
      return solid ? SolidCalculatorIcon : CalculatorIcon;
    }
    case "cloud.Cron": {
      return solid ? SolidClockIcon : ClockIcon;
    }
    default: {
      return CubeIcon;
    }
  }
};

export const getResourceColors = (options: {
  resourceType: BaseResourceSchema["type"] | undefined;
}) => {
  switch (options.resourceType) {
    case "wingsdk.cloud.Bucket": {
      return "orange";
    }

    case "wingsdk.cloud.Function": {
      return "sky";
    }
    case "wingsdk.cloud.Queue": {
      return "emerald";
    }
    case "wingsdk.cloud.Endpoint": {
      return "sky";
    }
    case "wingsdk.cloud.Counter": {
      return "lime";
    }
  }
};

const getResourceIconColors = (options: {
  resourceType: BaseResourceSchema["type"] | undefined;
  darkenOnGroupHover?: boolean;
  forceDarken?: boolean;
}) => {
  switch (options.resourceType) {
    case "wingsdk.cloud.Bucket": {
      return [
        "text-orange-500 dark:text-orange-400",
        options.darkenOnGroupHover &&
          "group-hover:text-orange-600 dark:group-hover:text-orange-300",
        options.forceDarken && "text-orange-600 dark:text-orange-300",
      ];
    }
    case "wingsdk.cloud.Function": {
      return [
        "text-sky-500 dark:text-sky-400",
        options.darkenOnGroupHover &&
          "group-hover:text-sky-600 dark:group-hover:text-sky-300",
        options.forceDarken && "text-sky-600 dark:text-sky-300",
      ];
    }
    case "wingsdk.cloud.Queue": {
      return [
        "text-emerald-500 dark:text-emerald-400",
        options.darkenOnGroupHover &&
          "group-hover:text-emerald-600 dark:group-hover:text-emerald-300",
        options.forceDarken && "text-emerald-600 dark:text-emerald-300",
      ];
    }
    case "wingsdk.cloud.Endpoint": {
      return [
        "text-sky-500 dark:text-sky-400",
        options.darkenOnGroupHover &&
          "group-hover:text-sky-600 dark:group-hover:text-sky-300",
        options.forceDarken && "text-sky-600 dark:text-sky-300",
      ];
    }
    case "wingsdk.cloud.Counter": {
      return [
        "text-lime-500 dark:text-lime-400",
        options.darkenOnGroupHover &&
          "group-hover:text-lime-600 dark:group-hover:text-lime-300",
        options.forceDarken && "text-lime-600 dark:text-lime-300",
      ];
    }
    default: {
      return [
        "text-slate-500 dark:text-slate-400",
        options.darkenOnGroupHover &&
          "group-hover:text-slate-600 dark:group-hover:text-slate-300",
        options.forceDarken && "text-slate-600 dark:text-slate-300",
      ];
    }
  }
};

export interface ResourceIconProps extends React.SVGProps<SVGSVGElement> {
  resourceType: BaseResourceSchema["type"] | undefined;
  darkenOnGroupHover?: boolean;
  forceDarken?: boolean;
  solid?: boolean;
}

export const ResourceIcon = ({
  resourceType,
  darkenOnGroupHover,
  forceDarken,
  className,
  solid,
  ...props
}: ResourceIconProps) => {
  const Component = getResourceIconComponent(resourceType, { solid });
  const colors = getResourceIconColors({
    resourceType,
    darkenOnGroupHover,
    forceDarken,
  });
  return <Component className={classNames(className, colors)} {...props} />;
};
