import classNames from "classnames";
import { PropsWithChildren } from "react";

export interface SkeletonProps {
  className?: string;
  title?: string;
  isLoading?: boolean;
}

export const SkeletonLoader = ({
  className,
  title,
  children,
  isLoading = true,
}: PropsWithChildren<SkeletonProps>) => {
  return (
    <div className={classNames(["relative", className])} title={title}>
      <div className={classNames(isLoading && "invisible", className)}>
        {children}
      </div>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-300 animate-pulse rounded-sm" />
      )}
    </div>
  );
};
