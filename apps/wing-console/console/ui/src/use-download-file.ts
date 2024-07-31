import JSZip from "jszip";
import textextensions from "textextensions";

export interface File {
  filename: string;
  content: any;
}

// TODO - once mime-types is added to the sdk, use it to determine the encoding
export const getFileEncoding = (file: string): "base64" | "utf8" => {
  const basename = file.split("/").pop() ?? file;
  if (!basename.includes(".")) {
    return "utf8";
  }
  const extension = basename.split(".").pop();
  if (!extension) {
    return "utf8";
  }

  if (textextensions.includes(extension)) {
    return "utf8";
  }

  return "base64";
};

const getEncodedUrl = (file: string, content: string) => {
  const encoding = getFileEncoding(file);
  const encodedContent = encodeURIComponent(content);
  return encoding === "utf8"
    ? "data:text/plain;charset=utf-8," + encodedContent
    : "data:application/octet-stream;base64," + encodedContent;
};

const saveAs = async (file: string, content: string) => {
  await fetch(getEncodedUrl(file, content))
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = file;
      document.body.append(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
};

const download = async (file: string, content: string) => {
  await saveAs(file, content);
};

const downloadFiles = async (files: File[]) => {
  const zip = new JSZip();

  for (const file of files) {
    zip.file(file.filename, file.content, {
      base64: getFileEncoding(file.filename) === "base64",
    });
  }

  const content = await zip.generateAsync({ type: "base64" });
  await saveAs("download.zip", content);
};

export const useDownloadFile = () => {
  return {
    download,
    downloadFiles,
  };
};
