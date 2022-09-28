import classNames from "classnames";
import { createRef, ReactNode, useEffect, useState } from "react";
import { DraggableCore } from "react-draggable";

export interface TopResizableWidgetProps {
  className?: string;
  children?: ReactNode | undefined;
}

export function TopResizableWidget(props: TopResizableWidgetProps) {
  const { className, children } = props;

  const [offset, setOffset] = useState(0);
  const resizeTarget = createRef<HTMLDivElement>();
  const [isResizing, setResizing] = useState(false);

  useEffect(() => {
    if (resizeTarget.current) {
      resizeTarget.current.style.height = `${resizeTarget.current.clientHeight}px`;
    }
  }, []);

  return (
    <div className={classNames("relative", className)} ref={resizeTarget}>
      <DraggableCore
        onStart={(e) => {
          if (resizeTarget.current) {
            document.body.style.cursor = "row-resize";

            setOffset(
              (e as MouseEvent).clientY + resizeTarget.current.clientHeight,
            );

            setResizing(true);
          }
        }}
        onDrag={(e) => {
          if (resizeTarget.current) {
            resizeTarget.current.style.height = `${
              offset - (e as MouseEvent).clientY
            }px`;
          }
        }}
        onStop={(e) => {
          if (resizeTarget.current) {
            document.body.style.cursor = "";

            resizeTarget.current.style.height = `${resizeTarget.current.clientHeight}px`;

            setResizing(false);
          }
        }}
      >
        <div
          className={classNames(
            "absolute inset-x-0 -top-0.5 h-1 cursor-row-resize transition-colors ease-in-out hover:bg-sky-500 z-10",
            isResizing && "bg-sky-500",
          )}
        />
      </DraggableCore>

      {children}
    </div>
  );
}
