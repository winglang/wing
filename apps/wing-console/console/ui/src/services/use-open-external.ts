export const useOpenExternal = () => {
  const open = (url: string) => {
    window.open(url, "_blank");
  };

  return {
    open,
  };
};
