import JSZip from "jszip";

export interface File {
  filename: string;
  content: any;
}

const saveAs = (file: string, blob: Blob) => {
  const url = window.URL.createObjectURL(blob);
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

const download = (file: string, content: any) => {
  saveAs(file, new Blob([content]));
};

const downloadFiles = async (files: File[]) => {
  const zip = new JSZip();

  for (const file of files) {
    zip.file(file.filename, file.content);
  }

  const content = await zip.generateAsync({ type: "blob" });
  saveAs("download.zip", content);
};

export const useDownloadFile = () => {
  return {
    download,
    downloadFiles,
  };
};
