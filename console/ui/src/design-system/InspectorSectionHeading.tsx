import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

import { IconComponent } from "../utils/utils.js";

export interface InspectorSectionHeadingProps {
  open?: boolean;
  text: string;
  icon?: IconComponent;
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
  subection: subsection = false,
  bold = true,
  className,
}: InspectorSectionHeadingProps) => {
  const { theme } = useTheme();
  const ChevronIcon = open ? ChevronDownIcon : ChevronRightIcon;
  return (
    <button
      className={classNames(
        "w-full py-1 flex items-center gap-1 group relative",
        theme.border3,
        theme.bg3,
        theme.bg3Hover,
        className,
        "focus:outline-sky-500/50",
        {
          "border-t": !subsection,
          [theme.text1]: !subsection,
          [theme.text2]: subsection,
        },
      )}
      onClick={onClick}
    >
      <ChevronIcon className={classNames("-ml-1 w-4 h-4", theme.text2)} />
      {Icon && <Icon className={classNames("w-4 h-4 mr-1", theme.text1)} />}
      <div className={classNames(bold && "font-medium")}>{text}</div>
    </button>
  );
};
