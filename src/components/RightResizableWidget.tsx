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
        <div className="absolute inset-y-0 right-0 w-2 cursor-ew-resize" />
      </DraggableCore>

      {children}
    </div>
  );
}
