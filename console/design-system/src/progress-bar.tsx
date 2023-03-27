import classNames from "classnames";

export interface ProgressBarProps {
  progress: number;
  size: "sm" | "md" | "lg";
}

export const ProgressBar = ({
  progress = 0,
  size = "md",
}: ProgressBarProps) => {
  const height = {
    sm: "h-1",
    md: "h-2",
    lg: "h-4",
  };

  const ceilProgress = Math.ceil(progress);

  return (
    <div
      role={"progressbar"}
      className={
        "relative self-center w-full bg-slate-300 rounded-full " + height[size]
      }
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
