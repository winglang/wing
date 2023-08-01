import { SpinnerLoader } from "./spinner-loader.js";

export const Loader = ({}: {
  /**
   * @deprecated
   */
  text?: string;

  /**
   * @deprecated
   */
  size: string;
}) => {
  return <SpinnerLoader size="sm" />;
};
