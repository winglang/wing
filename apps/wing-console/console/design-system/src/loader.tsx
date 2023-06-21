import Lottie from "react-lottie-player";

import lottieJson from "./assets/wingLoader.json";

export const Loader = ({
  text = "",
  size,
}: {
  text?: string;
  size: string;
}) => {
  return (
    <div className="flex pointer-events-none space-x-1">
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: size, height: size }}
      />
      <span>{text}</span>
    </div>
  );
};
