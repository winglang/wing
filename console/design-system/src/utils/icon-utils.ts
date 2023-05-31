import {
  ArchiveBoxIcon,
  BeakerIcon,
  BoltIcon,
  CalculatorIcon,
  ClockIcon,
  CloudIcon,
  CubeIcon,
  GlobeAltIcon,
  MegaphoneIcon,
  QueueListIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import {
  ArchiveBoxIcon as SolidArchiveBoxIcon,
  BeakerIcon as SolidBeakerIcon,
  BoltIcon as SolidBoltIcon,
  CalculatorIcon as SolidCalculatorIcon,
  ClockIcon as SolidClockIcon,
  CloudIcon as SolidCloudIcon,
  GlobeAltIcon as SolidGlobeAltIcon,
  MegaphoneIcon as SolidMegaphoneIcon,
  QueueListIcon as SolidQueueListIcon,
  TableCellsIcon as SolidTableCellsIcon,
} from "@heroicons/react/24/solid";

import { RedisIcon } from "../icons/redis-icon.js";

const isTest = /(\/test$|\/test:([^/\\])+$)/;
const isTestHandler = /(\/test$|\/test:.*\/Handler$)/;

const matchTest = (path: string) => {
  return isTest.test(path) || isTestHandler.test(path);
};

export const getResourceIconComponent = (
  resourceType: string | undefined,
  { solid = true, resourceId }: { solid?: boolean; resourceId?: string } = {},
) => {
  if (resourceId && matchTest(resourceId)) {
    return solid ? SolidBeakerIcon : BeakerIcon;
  }
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
    case "wingsdk.cloud.Topic": {
      return solid ? SolidMegaphoneIcon : MegaphoneIcon;
    }
    case "wingsdk.cloud.Api": {
      return solid ? SolidCloudIcon : CloudIcon;
    }
    case "wingsdk.cloud.Table": {
      return solid ? SolidTableCellsIcon : TableCellsIcon;
    }
    case "cloud.Cron": {
      return solid ? SolidClockIcon : ClockIcon;
    }
    case "wingsdk.redis.Redis": {
      return RedisIcon;
    }
    case "wingsdk.cloud.Test": {
      return solid ? SolidBeakerIcon : BeakerIcon;
    }
    default: {
      return CubeIcon;
    }
  }
};

export const getResourceIconColors = (options: {
  resourceType: string | undefined;
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
    case "wingsdk.cloud.Topic": {
      return [
        "text-pink-500 dark:text-pink-400",
        options.darkenOnGroupHover &&
          "group-hover:text-pink-600 dark:group-hover:text-pink-300",
        options.forceDarken && "text-pink-600 dark:text-pink-300",
      ];
    }
    case "wingsdk.cloud.Api": {
      return [
        "text-amber-500 dark:text-amber-400",
        options.darkenOnGroupHover &&
          "group-hover:text-amber-600 dark:group-hover:text-amber-300",
        options.forceDarken && "text-amber-600 dark:text-amber-300",
      ];
    }
    case "wingsdk.cloud.Table": {
      return [
        "text-cyan-500 dark:text-cyan-400",
        options.darkenOnGroupHover &&
          "group-hover:text-cyan-600 dark:group-hover:text-cyan-300",
        options.forceDarken && "text-cyan-600 dark:text-cyan-300",
      ];
    }
    case "wingsdk.redis.Redis": {
      return [
        "text-red-700 dark:text-red-400",
        options.darkenOnGroupHover &&
          "group-hover:text-red-700 dark:group-hover:text-red-300",
        options.forceDarken && "text-red-700 dark:text-red-300",
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
