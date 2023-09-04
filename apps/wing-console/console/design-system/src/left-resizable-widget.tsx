import classNames from "classnames";
import { createRef, ReactNode, useState } from "react";

export interface LeftResizableWidgetProps {
  className?: string;
  children?: ReactNode | undefined;
}

export function LeftResizableWidget(props: LeftResizableWidgetProps) {
  const { className, children } = props;

  const [offset, setOffset] = useState(0);
  const resizeTarget = createRef<HTMLDivElement>();
  const [isResizing, setResizing] = useState(false);

  return (
    <div className={classNames("relative", className)} ref={resizeTarget}>
      <div
        className={classNames(
          "absolute inset-y-0 -left-[2.5px] w-1 cursor-col-resize transition-colors ease-in-out hover:bg-sky-500 z-20",
          "cursor-col-resize",
        )}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);

          if (resizeTarget.current) {
            setOffset(
              document.body.clientWidth -
                event.clientX -
                resizeTarget.current.clientWidth,
            );
          }
          setResizing(true);
        }}
        onPointerUp={(event) => {
          event.currentTarget.releasePointerCapture(event.pointerId);

          if (resizeTarget.current) {
            resizeTarget.current.style.width = `${resizeTarget.current.clientWidth}px`;
          }
          setResizing(false);
        }}
        onPointerMove={(event) => {
          if (!isResizing) {
            return;
          }
          if (resizeTarget.current) {
            resizeTarget.current.style.width = `${
              offset + (document.body.clientWidth - event.clientX)
            }px`;
          }
        }}
      />

      {children}
    </div>
  );
}
