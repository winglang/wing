import { PropsWithChildren } from "react";

import { IconComponent } from "../utils/utils.js";

import { InspectorSectionHeading } from "./InspectorSectionHeading.js";

export interface InspectorSectionProps {
  open?: boolean;
  text: string;
  icon?: IconComponent;
  onClick?: () => void;
  subection?: boolean;
  bold?: boolean;
  headingClassName?: string;
}

export const InspectorSection = ({
  open,
  text,
  icon,
  onClick,
  children,
  subection = false,
  bold = true,
  headingClassName,
}: PropsWithChildren<InspectorSectionProps>) => {
  return (
    <>
      <InspectorSectionHeading
        text={text}
        icon={icon}
        open={open}
        onClick={onClick}
        subection={subection}
        className={headingClassName}
        bold={bold}
      />
      {open && children}
    </>
  );
};
