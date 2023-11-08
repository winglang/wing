import { useTheme, IconComponent } from "@wingconsole/design-system";
import { BaseResourceSchema, NodeDisplay } from "@wingconsole/server";
import classNames from "classnames";
import { PropsWithChildren, useMemo } from "react";

const getResourceBorderColor = (
  resourceType: BaseResourceSchema["type"] | undefined,
) => {
  switch (resourceType) {
    case "@winglang/sdk.cloud.Bucket": {
      return "border-t border-t-orange-500 group-hover:border-t-orange-500 group-focus:border-t-orange-500 dark:border-t-orange-500 dark:group-hover:border-t-orange-500 dark:group-focus:border-t-orange-500";
    }
    case "@winglang/sdk.cloud.Function": {
      return "border-t border-t-sky-500 group-hover:border-t-sky-500 group-focus:border-t-sky-500 dark:border-t-sky-500 dark:group-hover:border-t-sky-500 dark:group-focus:border-t-sky-500";
    }
    case "@winglang/sdk.cloud.Queue": {
      return "border-t border-t-emerald-500 group-hover:border-t-emerald-500 group-focus:border-t-emerald-500 dark:border-t-emerald-500 dark:group-hover:border-t-emerald-500 dark:group-focus:border-t-emerald-500";
    }
    case "@winglang/sdk.cloud.Endpoint": {
      return "border-t border-t-sky-500 group-hover:border-t-sky-500 group-focus:border-t-sky-500 dark:border-t-sky-500 dark:group-hover:border-t-sky-500 dark:group-focus:border-t-sky-500";
    }
    case "@winglang/sdk.cloud.Counter": {
      return "border-t border-t-lime-500 group-hover:border-t-lime-500 group-focus:border-t-lime-500 dark:border-t-lime-500 dark:group-hover:border-t-lime-500 dark:group-focus:border-t-lime-500";
    }
    case "@winglang/sdk.cloud.Topic": {
      return "border-t border-t-pink-500 group-hover:border-t-pink-500 group-focus:border-t-pink-500 dark:border-t-pink-500 dark:group-hover:border-t-pink-500 dark:group-focus:border-t-pink-500";
    }
    case "@winglang/sdk.cloud.Api": {
      return "border-t border-t-amber-500 group-hover:border-t-amber-500 group-focus:border-t-amber-500 dark:border-t-amber-500 dark:group-hover:border-t-amber-500 dark:group-focus:border-t-amber-500";
    }
    case "@winglang/sdk.ex.Table": {
      return "border-t border-t-cyan-500 group-hover:border-t-cyan-500 group-focus:border-t-cyan-500 dark:border-t-cyan-500 dark:group-hover:border-t-cyan-500 dark:group-focus:border-t-cyan-500";
    }
    case "@winglang/sdk.cloud.Schedule": {
      return "border-t border-t-purple-500 group-hover:border-t-purple-500 group-focus:border-t-purple-500 dark:border-t-purple-500 dark:group-hover:border-t-purple-500 dark:group-focus:border-t-purple-500";
    }
    case "@winglang/sdk.ex.Redis": {
      return "border-t border-t-red-700 group-hover:border-t-red-700 group-focus:border-t-red-700 dark:border-t-red-700 dark:group-hover:border-t-red-700 dark:group-focus:border-t-red-700";
    }
    case "@winglang/sdk.cloud.Website": {
      return "border-t border-t-violet-500 group-hover:border-t-violet-500 group-focus:border-t-violet-500 dark:border-t-violet-500 dark:group-hover:border-t-violet-500 dark:group-focus:border-t-violet-500";
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
  resourceType: BaseResourceSchema["type"] | undefined;
  depth: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
}

export const ContainerNode = ({
  open,
  icon: Icon,
  hideBottomBar,
  selected,
  onClick,
  onMouseEnter,
  resourceType,
  depth,
  display,
  ...props
}: PropsWithChildren<ContainerNodeProps>) => {
  const { theme } = useTheme();
  const borderColor = getResourceBorderColor(resourceType);

  const compilerNamed = useMemo(() => {
    if (!display) {
      return false;
    }
    return display.sourceModule === "@winglang/sdk" && display.title;
  }, [display]);

  return (
    // TODO: Fix a11y
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={classNames(
        "flex flex-col group flex-1",
        "outline outline-0 outline-sky-200/50 dark:outline-sky-500/50",
        "transition-all",
        "rounded",
        "cursor-default",
        open && "shadow-lg",
        !open && "shadow",
        {
          "outline-4": selected,
          "hover:outline-2": !selected,
        },
      )}
      tabIndex={-1}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div
        className={classNames(
          "flex relative",
          "rounded overflow-hidden",
          borderColor,
          "group-focus:border-sky-300 dark:group-focus:border-sky-500",
          theme.bg3,
          {
            "rounded-b-none": open,
            "border-b-0": open,
            [theme.border3]: !selected,
            "border-sky-300 dark:border-sky-500": selected,
          },
          "min-h-[32px]",
          "cursor-pointer",
        )}
      >
        {Icon && (
          <div
            className={classNames(
              theme.bg4,
              "px-2 py-1",
              "flex items-center",
              "transition-all",
              "rounded-bl",
              open && "rounded-bl-none",
              "border-r",
              {
                [theme.border3]: !selected,
                "border-sky-300 dark:border-sky-500": selected,
              },
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div
          className={classNames(
            "flex-1 flex items-center",
            "px-2.5 py-2",
            "rounded-br",
            !borderColor && "rounded-tr",
            "group-focus:border-sky-300 dark:group-focus:border-sky-500",
            "transition-all",
            {
              "border-sky-300 dark:border-sky-500": selected,
              "rounded-br-none": open,
              "rounded-l": !Icon,
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
                "text-xs",
                compilerNamed && ["text-slate-600 dark:text-slate-350"],
                !compilerNamed && [theme.text1],
              )}
            >
              {compilerNamed ? display?.title : props.name}
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div
          className={classNames(
            "flex-1 flex items-stretch",
            "border-t",
            "group-focus:border-sky-200 dark:group-focus:border-sky-400",
            {
              [theme.border3]: !selected,
              "border-sky-200 dark:border-sky-400": selected,
            },
          )}
        >
          <div
            className={classNames(
              "flex-1 rounded-b",
              depth % 2 === 0
                ? "bg-slate-50 dark:bg-slate-500"
                : "bg-white dark:bg-slate-550",
              // The classes below are commented out because they cause rendering flashes while zooming.
              // "border-x border-b border-dashed",
              // "group-focus:border-sky-300 dark:group-focus:border-sky-500",
              // "transition-all",
              // "shadow-inner",
              // {
              //   [theme.border3]: !selected,
              //   "border-sky-300 dark:border-sky-500": selected,
              // },
            )}
          />
        </div>
      )}
    </div>
  );
};
