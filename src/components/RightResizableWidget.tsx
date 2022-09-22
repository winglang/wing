import classNames from "classnames";
import { createRef, ReactNode, useState } from "react";
import { DraggableCore } from "react-draggable";

export interface RightResizableWidgetProps {
  className?: string;
  children?: ReactNode | undefined;
}

export function RightResizableWidget(props: RightResizableWidgetProps) {
  const { className, children } = props;

  const [offset, setOffset] = useState(0);
  const resizeTarget = createRef<HTMLDivElement>();

  return (
    <div className={classNames("relative", className)} ref={resizeTarget}>
      <DraggableCore
        onStart={(e) => {
          if (resizeTarget.current) {
            setOffset(
              (e as MouseEvent).clientX - resizeTarget.current.clientWidth,
            );
          }
        }}
        onDrag={(e) => {
          if (resizeTarget.current) {
            resizeTarget.current.style.width = `${
              offset + (e as MouseEvent).clientX
            }px`;
          }
        }}
      >
        <div className="absolute inset-y-0 -right-0.5 w-1 cursor-ew-resize transition-colors ease-in-out hover:bg-sky-500 z-10" />
      </DraggableCore>

      {children}
    </div>
  );
}
