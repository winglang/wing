import { ForwardRefExoticComponent, PropsWithChildren, SVGProps } from "react";

import { InspectorSectionHeading } from "./InspectorSectionHeading.js";

export interface InspectorSectionProps {
  open?: boolean;
  text: string;
  icon?: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

export const InspectorSection = ({
  open,
  text,
  icon,
  onClick,
  children,
}: PropsWithChildren<InspectorSectionProps>) => {
  return (
    <>
      <InspectorSectionHeading
        text={text}
        icon={icon}
        open={open}
        onClick={onClick}
      />
      {open && children}
    </>
  );
};
