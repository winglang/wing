export const useDownloadFile = () => {
  const download = (file: string, content: any) => {
    const url = window.URL.createObjectURL(new Blob([content]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file);
    // Append to html link element page
    document.body.append(link);
    // Start download
    link.click();
    // Clean up and remove the link
    link.parentNode?.removeChild(link);
  };

  return {
    download,
  };
};
