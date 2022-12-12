export const Error = ({ text }: { text: string }) => {
  return (
    <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <span className="text-3xl text-slate-600 mt-5">{text}</span>
      </div>
    </div>
  );
};
