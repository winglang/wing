import type { SpinnerLoaderSize } from "./spinner-loader.js";
import { SpinnerLoader } from "./spinner-loader.js";

export const Loader = ({
  size,
  className,
  text,
}: {
  /**
   * @deprecated
   */
  text?: string;

  size?: SpinnerLoaderSize;

  className?: string;
}) => {
  return <SpinnerLoader size={size || "sm"} className={className} />;
};
