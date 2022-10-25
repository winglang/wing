import classNames from "classnames";
import { createRef, ReactNode, useEffect, useState } from "react";
import { DraggableCore } from "react-draggable";

export interface LeftResizableWidgetProps {
  className?: string;
  children?: ReactNode | undefined;
}

export function LeftResizableWidget(props: LeftResizableWidgetProps) {
  const { className, children } = props;

  const [offset, setOffset] = useState(0);
  const resizeTarget = createRef<HTMLDivElement>();
  const [isResizing, setResizing] = useState(false);

  useEffect(() => {
    if (resizeTarget.current) {
      resizeTarget.current.style.width = `${resizeTarget.current.clientWidth}px`;
    }
  }, []);

  return (
    <div className={classNames("relative", className)} ref={resizeTarget}>
      <DraggableCore
        onStart={(e) => {
          if (resizeTarget.current) {
            document.body.style.cursor = "col-resize";

            setOffset(
              document.body.clientWidth -
                (e as MouseEvent).clientX -
                resizeTarget.current.clientWidth,
            );

            setResizing(true);
          }
        }}
        onDrag={(e) => {
          if (resizeTarget.current) {
            resizeTarget.current.style.width = `${
              offset + (document.body.clientWidth - (e as MouseEvent).clientX)
            }px`;
          }
        }}
        onStop={(e) => {
          if (resizeTarget.current) {
            document.body.style.cursor = "";

            resizeTarget.current.style.width = `${resizeTarget.current.clientWidth}px`;

            setResizing(false);
          }
        }}
      >
        <div
          className={classNames(
            "absolute inset-y-0 -left-0.5 w-1 cursor-col-resize transition-colors ease-in-out hover:bg-sky-500 z-20",
            isResizing && "bg-sky-500",
          )}
        />
      </DraggableCore>

      {children}
    </div>
  );
}
