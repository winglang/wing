import { ForwardRefExoticComponent, PropsWithChildren, SVGProps } from "react";

import { InspectorSectionHeading } from "./InspectorSectionHeading.js";

export interface InspectorSectionProps {
  open?: boolean;
  text: string;
  icon?: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
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
