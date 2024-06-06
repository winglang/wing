import * as OutlineHeroIcons from "@heroicons/react/24/outline";
import * as SolidHeroIcons from "@heroicons/react/24/solid";

import { RedisIcon } from "../icons/redis-icon.js";

import type { Colors } from "./colors.js";

const isTest = /(\/test$|\/test:([^/\\])+$)/;
const isTestHandler = /(\/test$|\/test:.*\/Handler$)/;

const matchTest = (path: string) => {
  return isTest.test(path);
};

const getHeroIconName = (heroiconId: string): string => {
  const parts = heroiconId.split("-");
  const resourceName = parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  return `${resourceName}Icon`;
};

export const getResourceIconComponent = (
  resourceType: string | undefined,
  {
    solid = true,
    resourceId,
    icon,
  }: { solid?: boolean; resourceId?: string; icon?: string } = {},
) => {
  const iconSet = solid ? SolidHeroIcons : OutlineHeroIcons;

  if (resourceId && matchTest(resourceId)) {
    return iconSet.BeakerIcon;
  }
  if (icon) {
    // icon is a heroicon id string, e.g. "academic-cap" so we need to convert it to the actual component
    // @ts-ignore
    let iconComponent = iconSet[getHeroIconName(icon)];
    if (iconComponent) {
      return iconComponent;
    }
  }

  switch (resourceType) {
    case "@winglang/sdk.cloud.Bucket": {
      return iconSet.ArchiveBoxIcon;
    }
    case "@winglang/sdk.cloud.Function": {
      return iconSet.BoltIcon;
    }
    case "@winglang/sdk.cloud.Queue": {
      return iconSet.QueueListIcon;
    }
    case "@winglang/sdk.cloud.Website": {
      return iconSet.GlobeAltIcon;
    }
    case "@winglang/sdk.cloud.Counter": {
      return iconSet.CalculatorIcon;
    }
    case "@winglang/sdk.cloud.Topic": {
      return iconSet.MegaphoneIcon;
    }
    case "@winglang/sdk.cloud.Api": {
      return iconSet.CloudIcon;
    }
    case "@winglang/sdk.ex.Table": {
      return iconSet.TableCellsIcon;
    }
    case "@winglang/sdk.cloud.Schedule": {
      return iconSet.ClockIcon;
    }
    case "@winglang/sdk.ex.Redis": {
      return RedisIcon;
    }
    case "@winglang/sdk.std.Test": {
      return iconSet.BeakerIcon;
    }
    case "@winglang/sdk.cloud.Secret": {
      return iconSet.KeyIcon;
    }
    default: {
      return iconSet.CubeIcon;
    }
  }
};

interface ColorSet {
  default: string;
  groupHover: string;
  forceDarken: string;
}

const colors: Record<Colors, ColorSet> = {
  orange: {
    default: "text-orange-500 dark:text-orange-400",
    groupHover: "group-hover:text-orange-600 dark:group-hover:text-orange-300",
    forceDarken: "text-orange-600 dark:text-orange-300",
  },
  sky: {
    default: "text-sky-500 dark:text-sky-400",
    groupHover: "group-hover:text-sky-600 dark:group-hover:text-sky-300",
    forceDarken: "text-sky-600 dark:text-sky-300",
  },
  emerald: {
    default: "text-emerald-500 dark:text-emerald-400",
    groupHover:
      "group-hover:text-emerald-600 dark:group-hover:text-emerald-300",
    forceDarken: "text-emerald-600 dark:text-emerald-300",
  },
  lime: {
    default: "text-lime-500 dark:text-lime-400",
    groupHover: "group-hover:text-lime-600 dark:group-hover:text-lime-300",
    forceDarken: "text-lime-600 dark:text-lime-300",
  },
  pink: {
    default: "text-pink-500 dark:text-pink-400",
    groupHover: "group-hover:text-pink-600 dark:group-hover:text-pink-300",
    forceDarken: "text-pink-600 dark:text-pink-300",
  },
  amber: {
    default: "text-amber-500 dark:text-amber-400",
    groupHover: "group-hover:text-amber-600 dark:group-hover:text-amber-300",
    forceDarken: "text-amber-600 dark:text-amber-300",
  },
  cyan: {
    default: "text-cyan-500 dark:text-cyan-400",
    groupHover: "group-hover:text-cyan-600 dark:group-hover:text-cyan-300",
    forceDarken: "text-cyan-600 dark:text-cyan-300",
  },
  purple: {
    default: "text-purple-500 dark:text-purple-400",
    groupHover: "group-hover:text-purple-600 dark:group-hover:text-purple-300",
    forceDarken: "text-purple-600 dark:text-purple-300",
  },
  red: {
    default: "text-red-700 dark:text-red-400",
    groupHover: "group-hover:text-red-700 dark:group-hover:text-red-300",
    forceDarken: "text-red-700 dark:text-red-300",
  },
  violet: {
    default: "text-violet-700 dark:text-violet-400",
    groupHover: "group-hover:text-violet-700 dark:group-hover:text-violet-300",
    forceDarken: "text-violet-700 dark:text-violet-300",
  },
  slate: {
    default: "text-slate-500 dark:text-slate-400",
    groupHover: "group-hover:text-slate-600 dark:group-hover:text-slate-300",
    forceDarken: "text-slate-600 dark:text-slate-300",
  },
};

export const getResourceIconColors = (options: {
  resourceType: string | undefined;
  darkenOnGroupHover?: boolean;
  forceDarken?: boolean;
  color?: Colors | string;
}) => {
  let color: Colors =
    options.color && Object.keys(colors).includes(options.color)
      ? (options.color as Colors)
      : "slate";

  let defaultColor = [
    colors[color].default,
    options.darkenOnGroupHover && colors[color].groupHover,
    options.forceDarken && colors[color].forceDarken,
  ];

  if (options.color) {
    return defaultColor;
  }

  switch (options.resourceType) {
    case "@winglang/sdk.cloud.Bucket": {
      return [
        colors.orange.default,
        options.darkenOnGroupHover && colors.orange.groupHover,
        options.forceDarken && colors.orange.forceDarken,
      ];
    }
    case "@winglang/sdk.cloud.Function": {
      return [
        colors.sky.default,
        options.darkenOnGroupHover && colors.sky.groupHover,
        options.forceDarken && colors.sky.forceDarken,
      ];
    }
    case "@winglang/sdk.cloud.Queue": {
      return [
        colors.emerald.default,
        options.darkenOnGroupHover && colors.emerald.groupHover,
        options.forceDarken && colors.emerald.forceDarken,
      ];
    }
    case "@winglang/sdk.cloud.Counter": {
      return [
        colors.lime.default,
        options.darkenOnGroupHover && colors.lime.groupHover,
        options.forceDarken && colors.lime.forceDarken,
      ];
    }
    case "@winglang/sdk.cloud.Topic": {
      return [
        colors.pink.default,
        options.darkenOnGroupHover && colors.pink.groupHover,
        options.forceDarken && colors.pink.forceDarken,
      ];
    }
    case "@winglang/sdk.cloud.Api": {
      return [
        colors.amber.default,
        options.darkenOnGroupHover && colors.amber.groupHover,
        options.forceDarken && colors.amber.forceDarken,
      ];
    }
    case "@winglang/sdk.ex.Table": {
      return [
        colors.cyan.default,
        options.darkenOnGroupHover && colors.cyan.groupHover,
        options.forceDarken && colors.cyan.forceDarken,
      ];
    }
    case "@winglang/sdk.cloud.Schedule": {
      return [
        colors.purple.default,
        options.darkenOnGroupHover && colors.purple.groupHover,
        options.forceDarken && colors.purple.forceDarken,
      ];
    }
    case "@winglang/sdk.ex.Redis": {
      return [
        colors.red.default,
        options.darkenOnGroupHover && colors.red.groupHover,
        options.forceDarken && colors.red.forceDarken,
      ];
    }
    case "@winglang/sdk.cloud.Website": {
      return [
        colors.violet.default,
        options.darkenOnGroupHover && colors.violet.groupHover,
        options.forceDarken && colors.violet.forceDarken,
      ];
    }
    default: {
      return defaultColor;
    }
  }
};
