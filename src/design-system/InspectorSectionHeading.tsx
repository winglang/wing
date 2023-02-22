import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { ForwardRefExoticComponent, SVGProps } from "react";

export interface InspectorSectionHeadingProps {
  open?: boolean;
  text: string;
  icon?: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

export const InspectorSectionHeading = ({
  open,
  text,
  icon: Icon,
  onClick,
}: InspectorSectionHeadingProps) => {
  const ChevronIcon = open ? ChevronDownIcon : ChevronRightIcon;
  return (
    <button
      className={classNames(
        "w-full px-2 py-1 flex items-center gap-1 bg-slate-50 hover:bg-white group relative",
        "border-t border-slate-300",
      )}
      onClick={onClick}
    >
      <ChevronIcon className="-ml-1 w-4 h-4 text-slate-600 group-hover:text-slate-600" />
      {Icon && (
        <Icon className="w-4 h-4 text-slate-600 group-hover:text-slate-600 mr-1" />
      )}
      <div className="text-slate-600 font-medium group-hover:text-slate-600">
        {text}
      </div>
    </button>
  );
};
