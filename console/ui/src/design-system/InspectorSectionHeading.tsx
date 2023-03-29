import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { ForwardRefExoticComponent, SVGProps } from "react";

export interface InspectorSectionHeadingProps {
  open?: boolean;
  text: string;
  icon?: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  subection?: boolean;
  className?: string;
  bold?: boolean;
}

export const InspectorSectionHeading = ({
  open,
  text,
  icon: Icon,
  onClick,
  subection = false,
  bold = true,
  className,
}: InspectorSectionHeadingProps) => {
  const ChevronIcon = open ? ChevronDownIcon : ChevronRightIcon;
  return (
    <button
      className={classNames(
        "w-full py-1 flex items-center gap-1 group relative",
        !subection && "border-t border-slate-300 hover:bg-white bg-slate-50",
        className,
        "focus:outline-sky-500/50",
      )}
      onClick={onClick}
    >
      <ChevronIcon className="-ml-1 w-4 h-4 text-slate-600 group-hover:text-slate-600" />
      {Icon && (
        <Icon className="w-4 h-4 text-slate-600 group-hover:text-slate-600 mr-1" />
      )}
      <div
        className={classNames(
          bold && "font-medium",
          !subection && "text-slate-600 group-hover:text-slate-600",
          subection && "text-slate-500 group-hover:text-slate-600",
        )}
      >
        {text}
      </div>
    </button>
  );
};
