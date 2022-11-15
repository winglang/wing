import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

export interface InspectorSectionHeadingProps {
  open?: boolean;
  text: string;
  onClick?: () => void;
}

export const InspectorSectionHeading = ({
  open,
  text,
  onClick,
}: InspectorSectionHeadingProps) => {
  const Icon = open ? ChevronDownIcon : ChevronRightIcon;
  return (
    <button
      className={classNames(
        "w-full px-4 py-1 flex items-center gap-1 bg-white hover:bg-slate-50 group relative",
      )}
      onClick={onClick}
    >
      <Icon
        className="-ml-1 w-4 h-4 text-slate-500 group-hover:text-slate-600"
        aria-hidden="true"
      />
      <div className="text-slate-500 font-medium group-hover:text-slate-600">
        {text}
      </div>
    </button>
  );
};
