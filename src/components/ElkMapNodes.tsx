import classNames from "classnames";
import { FunctionComponent, PropsWithChildren } from "react";

import { BaseResourceSchema } from "../../electron/main/wingsdk.js";

export interface IconComponent
  extends FunctionComponent<React.SVGProps<SVGSVGElement>> {}

const getResourceBorderColor = (
  resourceType: BaseResourceSchema["type"] | undefined,
) => {
  switch (resourceType) {
    case "wingsdk.cloud.Bucket": {
      return "border-t-[3px] border-t-orange-500 group-hover:border-t-orange-500 group-focus:border-t-orange-500";
    }

    case "wingsdk.cloud.Function": {
      return "border-t-[3px] border-t-sky-500 group-hover:border-t-sky-500 group-focus:border-t-sky-500";
    }
    case "wingsdk.cloud.Queue": {
      return "border-t-[3px] border-t-emerald-500 group-hover:border-t-emerald-500 group-focus:border-t-emerald-500";
    }
    case "wingsdk.cloud.Endpoint": {
      return "border-t-[3px] border-t-sky-500 group-hover:border-t-sky-500 group-focus:border-t-sky-500";
    }
    case "wingsdk.cloud.Counter": {
      return "border-t-[3px] border-t-lime-500 group-hover:border-t-lime-500 group-focus:border-t-lime-500";
    }
  }
};

export interface ContainerNodeProps {
  name: string | undefined;
  icon?: IconComponent;
  open?: boolean;
  hideBottomBar?: boolean;
  selected?: boolean;
  resourceType: BaseResourceSchema["type"] | undefined;
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
  ...props
}: PropsWithChildren<ContainerNodeProps>) => {
  return (
    <div
      className={classNames(
        "flex flex-col group flex-1",
        "outline outline-0 outline-sky-200/50",
        "transition-all",
        "rounded",
        !open && "shadow-sm",
        {
          "hover:outline-4": !selected,
          "outline-4": selected,
        },
      )}
      tabIndex={-1}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div
        className={classNames(
          "flex relative",
          "rounded",
          "border",
          getResourceBorderColor(resourceType),
          "group-hover:border-sky-300",
          "group-focus:border-sky-300",
          {
            "rounded-b-none": open,
            "border-b-0": open,
            "border-gray-300": !selected,
            "border-sky-300": selected,
          },
          "min-h-[32px]",
        )}
      >
        {Icon && (
          <div
            className={classNames(
              "px-2 py-1",
              "bg-white flex items-center",
              "transition-all",
              "rounded-l",
              open && "rounded-bl-none",
              "border-r",
              "group-hover:border-sky-300",
              "group-focus:border-sky-300",
              {
                "border-slate-200": !selected,
                "border-sky-300": selected,
              },
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div
          className={classNames(
            "flex-1 flex items-center",
            // " px-2 py-1",
            " px-2.5 py-2",
            "rounded-r",
            // "bg-white",
            "group-focus:bg-sky-100 group-focus:border-sky-300",
            "group-hover:border-sky-300",
            "transition-all",
            {
              "bg-white": !selected,
              "bg-sky-100 border-sky-300": selected,
              "rounded-br-none": open,
              "rounded-l": !Icon,
            },
          )}
        >
          <div className="flex flex-col">
            <div
              className={classNames(
                "leading-tight",
                "text-xs",
                " group-focus:text-sky-700",
                "truncate",
                "transition-all",
                {
                  "text-slate-700": !selected,
                  "text-sky-700": selected,
                },
              )}
            >
              {props.name}
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div
          className={classNames(
            "flex-1 flex items-stretch group-focus:border-sky-200",
            "border-t",
            {
              "border-slate-200": !selected,
              "border-sky-200": selected,
            },
          )}
        >
          <div
            className={classNames(
              "flex-1 rounded-b",
              "border-x border-b border-dashed",
              "group-focus:border-sky-300 group-focus:bg-white",
              "group-hover:border-sky-300",
              "transition-all",
              "shadow-inner",
              {
                "bg-slate-200/30 border-gray-300": !selected,
                "border-sky-300 bg-white": selected,
              },
            )}
          ></div>
        </div>
      )}
    </div>
  );
};
