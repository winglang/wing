import classNames from "classnames";

export interface ProgressBarProps {
  /**
   * The progress percentage. Must be between 0 and 100.
   * @default 0
   */
  progress: number;

  /**
   * The size of the progress bar.
   */
  size: "sm" | "md" | "lg";
}

/**
 * A progress bar component.
 */
export const ProgressBar = ({
  progress = 0,
  size = "md",
}: ProgressBarProps) => {
  const height = {
    sm: "h-1",
    md: "h-2",
    lg: "h-4",
  };

  const ceilProgress = Math.min(progress, 100);

  return (
    <div
      role={"progressbar"}
      className={classNames(
        "relative self-center w-full bg-slate-300 rounded-full min-w-[4rem]",
        height[size],
      )}
    >
      <div
        className={classNames([
          "absolute top-0 left-0 h-full rounded",
          {
            "bg-sky-500": ceilProgress > 0,
          },
        ])}
        style={{ width: `${ceilProgress}%` }}
        aria-valuenow={ceilProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${ceilProgress}%`}
      ></div>
    </div>
  );
};
