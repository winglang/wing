import classNames from "classnames";
import { createRef, ReactNode, useState } from "react";
import { DraggableCore } from "react-draggable";

export interface TopResizableWidgetProps {
  className?: string;
  children?: ReactNode | undefined;
}

export function TopResizableWidget(props: TopResizableWidgetProps) {
  const { className, children } = props;

  const [offset, setOffset] = useState(0);
  const resizeTarget = createRef<HTMLDivElement>();

  return (
    <div className={classNames("relative", className)} ref={resizeTarget}>
      <DraggableCore
        onStart={(e) => {
          if (resizeTarget.current) {
            setOffset(
              (e as MouseEvent).clientY + resizeTarget.current.clientHeight,
            );
          }
        }}
        onDrag={(e) => {
          if (resizeTarget.current) {
            resizeTarget.current.style.height = `${
              offset - (e as MouseEvent).clientY
            }px`;
          }
        }}
      >
        <div className="absolute inset-x-0 top-0 h-2 cursor-ns-resize" />
      </DraggableCore>

      {children}
    </div>
  );
}
