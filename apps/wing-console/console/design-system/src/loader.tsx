import { SpinnerLoader } from "./spinner-loader.js";

export const Loader = ({
  text = "",
  size,
}: {
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
  // return (
  //   <div className="flex pointer-events-none space-x-1">
  //     <Lottie
  //       loop
  //       animationData={lottieJson}
  //       play
  //       style={{ width: size, height: size }}
  //     />
  //     <span>{text}</span>
  //   </div>
  // );
};
