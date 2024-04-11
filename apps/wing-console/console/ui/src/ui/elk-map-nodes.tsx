import type { IconComponent } from "@wingconsole/design-system";
import { useTheme } from "@wingconsole/design-system";
import type { Colors } from "@wingconsole/design-system/src/utils/colors";
import type { BaseResourceSchema, NodeDisplay } from "@wingconsole/server";
import classNames from "classnames";
import type { PropsWithChildren } from "react";
import { memo, useMemo } from "react";

const colorSet: Record<Colors, string> = {
  orange: "bg-orange-500 dark:bg-orange-600",
  sky: "bg-sky-500 dark:bg-sky-600",
  emerald: "bg-emerald-500 dark:bg-emerald-600",
  lime: "bg-lime-500 dark:bg-lime-600",
  pink: "bg-pink-500 dark:bg-pink-600",
  amber: "bg-amber-500 dark:bg-amber-600",
  cyan: "bg-cyan-500 dark:bg-cyan-600",
  purple: "bg-purple-500 dark:bg-purple-600",
  red: "bg-red-700 dark:bg-red-600",
  violet: "bg-violet-500 dark:bg-violet-600",
  slate: "bg-slate-400 dark:bg-slate-600",
};

const getResourceBackgroudColor = (
  resourceType: BaseResourceSchema["type"] | undefined,
  color: Colors = "slate",
) => {
  switch (resourceType) {
    case "@winglang/sdk.cloud.Bucket": {
      return colorSet.orange;
    }
    case "@winglang/sdk.cloud.Function": {
      return colorSet.sky;
    }
    case "@winglang/sdk.cloud.Queue": {
      return colorSet.emerald;
    }
    case "@winglang/sdk.cloud.Counter": {
      return colorSet.lime;
    }
    case "@winglang/sdk.cloud.Topic": {
      return colorSet.pink;
    }
    case "@winglang/sdk.cloud.Api": {
      return colorSet.amber;
    }
    case "@winglang/sdk.ex.Table": {
      return colorSet.cyan;
    }
    case "@winglang/sdk.cloud.Schedule": {
      return colorSet.purple;
    }
    case "@winglang/sdk.ex.Redis": {
      return colorSet.red;
    }
    case "@winglang/sdk.cloud.Website": {
      return colorSet.violet;
    }
    case "@winglang/sdk.ex.ReactApp": {
      return colorSet.sky;
    }
    default: {
      return colorSet[color] ?? colorSet.slate;
    }
  }
};

export interface ContainerNodeProps {
  nodeId: string;
  name: string | undefined;
  display?: NodeDisplay;
  icon?: IconComponent;
  open?: boolean;
  hideBottomBar?: boolean;
  selected?: boolean;
  fade?: boolean;
  resourceType: BaseResourceSchema["type"] | undefined;
  depth: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export const ContainerNode = memo(
  ({
    open,
    icon: Icon,
    hideBottomBar,
    selected,
    fade,
    onClick,
    onMouseEnter,
    resourceType,
    depth,
    display,
    ...props
  }: PropsWithChildren<ContainerNodeProps>) => {
    const { theme } = useTheme();
    const bgColor = useMemo(
      () => getResourceBackgroudColor(resourceType, display?.color as Colors),
      [resourceType, display?.color],
    );

    const compilerNamed = useMemo(() => {
      const cloudResourceType = resourceType
        ? resourceType.split(".").at(-1)
        : "";
      return !!display?.title && display?.title !== cloudResourceType;
    }, [display, resourceType]);

    return (
      // TODO: Fix a11y
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        className={classNames(
          "flex flex-col group flex-1",
          "outline outline-0 outline-sky-200/50 dark:outline-sky-500/50",
          "transition-all",
          "rounded-lg",
          "relative",
          "cursor-default",
          {
            "outline-2": selected,
          },
        )}
        tabIndex={-1}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
      >
        <div
          className={classNames(
            "flex gap-1 items-center",
            "px-3 py-2.5",
            "relative",
            "rounded-lg overflow-hidden",
            "bg-white dark:bg-slate-700",
            {
              "rounded-b-none": open,
            },
            "cursor-pointer",
          )}
        >
          {Icon && (
            <div>
              <div
                className={classNames(
                  bgColor,
                  "p-2",
                  "flex items-center",
                  "transition-all",
                  "rounded-lg",
                  {
                    "opacity-30": fade,
                  },
                )}
              >
                <Icon className="w-5 h-5 text-white dark:text-white" />
              </div>
            </div>
          )}
          <div
            className={classNames(
              "flex-1 flex items-center",
              "px-2 py-1",
              "rounded-br-lg",
              "transition-all",
              {
                "rounded-br-none": open,
              },
            )}
            data-testid={`map-node:${props.nodeId}`}
          >
            <div className="flex flex-col">
              <div
                className={classNames(
                  "leading-tight",
                  "truncate",
                  "transition-all",
                  "text-sm",
                  compilerNamed && [
                    !selected && "text-slate-600 dark:text-slate-400",
                    selected && "text-sky-600 dark:text-sky-400",
                    "italic font-normal",
                  ],
                  !compilerNamed && [
                    !selected && "text-slate-600 dark:text-slate-250",
                    selected && "text-sky-600 dark:text-sky-400",
                    "font-semibold",
                  ],
                  { "opacity-30": fade },
                )}
              >
                {compilerNamed ? display?.title : props.name}
              </div>
            </div>
          </div>
        </div>

        {open && (
          <div
            className={classNames("flex-1 flex items-stretch", "border-t", {
              [theme.border3]: !selected,
              "border-opacity-30": fade,
              "border-sky-200 dark:border-sky-400": selected,
            })}
          >
            <div
              className={classNames(
                "flex-1 rounded-b-lg",
                depth % 2 === 0
                  ? "bg-white dark:bg-slate-500"
                  : "bg-slate-50 dark:bg-slate-550",
              )}
            />
          </div>
        )}

        <div
          className={classNames(
            "absolute inset-0 pointer-events-none rounded-lg",
            "border",
            selected && "border-sky-500 dark:border-sky-500",
            !selected && "border-slate-300 dark:border-slate-700",
            fade && "border-opacity-30",
            "shadow-sm",
          )}
        ></div>
      </div>
    );
  },
);
