import { PropsWithChildren } from "react";

import { InspectorSectionHeading } from "./InspectorSectionHeading.js";

export interface InspectorSectionProps {
  open?: boolean;
  text: string;
  onClick?: () => void;
}

export const InspectorSection = ({
  open,
  text,
  onClick,
  children,
}: PropsWithChildren<InspectorSectionProps>) => {
  return (
    <>
      <InspectorSectionHeading text={text} open={open} onClick={onClick} />
      {open && children}
    </>
  );
};
