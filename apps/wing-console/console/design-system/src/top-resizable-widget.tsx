import classNames from "classnames";
import { createRef, ReactNode, useState } from "react";

export interface TopResizableWidgetProps {
  className?: string;
  children?: ReactNode | undefined;
}

export function TopResizableWidget(props: TopResizableWidgetProps) {
  const { className, children } = props;

  const [offset, setOffset] = useState(0);
  const resizeTarget = createRef<HTMLDivElement>();
  const [isResizing, setResizing] = useState(false);

  return (
    <div className={classNames("relative", className)} ref={resizeTarget}>
      <div
        className={classNames(
          "absolute inset-x-0 -top-[2.5px] h-1 cursor-row-resize transition-colors ease-in-out hover:bg-sky-500 z-20",
          "cursor-row-resize",
        )}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);

          if (resizeTarget.current) {
            setOffset(event.clientY + resizeTarget.current.clientHeight);
          }
          setResizing(true);
        }}
        onPointerUp={(event) => {
          event.currentTarget.releasePointerCapture(event.pointerId);

          if (resizeTarget.current) {
            resizeTarget.current.style.height = `${resizeTarget.current.clientHeight}px`;
          }
          setResizing(false);
        }}
        onPointerMove={(event) => {
          if (!isResizing) {
            return;
          }
          if (resizeTarget.current) {
            resizeTarget.current.style.height = `${offset - event.clientY}px`;
          }
        }}
      />

      {children}
    </div>
  );
}
