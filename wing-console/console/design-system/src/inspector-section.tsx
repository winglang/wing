import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type PropsWithChildren } from "react";

import { InspectorSectionHeading } from "./inspector-section-heading.js";
import type { IconComponent } from "./resource-icon.js";

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
  const [initialRender, setInitialRender] = useState(true);
  useEffect(() => {
    setInitialRender(false);
  }, []);
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
      <AnimatePresence>
        {open && (
          <motion.div
            role="group"
            style={{ overflow: "hidden" }}
            initial={initialRender ? undefined : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
