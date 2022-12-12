import Lottie from "react-lottie-player";

import lottieJson from "../assets/wingLoader.json";

export const Loader = ({ text }: { text: string }) => {
  return (
    <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center z-50 pointer-events-none">
      <div className="flex flex-col items-center">
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: 200, height: 200 }}
        />
        <span className="text-3xl text-slate-600 mt-5">{text}</span>
      </div>
    </div>
  );
};
