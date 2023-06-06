import JSZip from "jszip";

export interface File {
  filename: string;
  content: any;
}

// TODO - once mime-types is added to the sdk, use it to determine the encoding
export const getFileEncoding = (file: string): "base64" | "utf8" => {
  const type = file.split(".").pop();
  switch (type) {
    case "txt":
    case "json":
    case "js":
    case "html":
    case "css":
    case "md": {
      return "utf8";
    }
    default: {
      return "base64";
    }
  }
};

const getEncodingPrefix = (file: string, content: string) => {
  const encoding = getFileEncoding(file);
  return encoding === "utf8"
    ? "data:text/plain;charset=utf-8," + content
    : "data:application/octet-stream;base64," + content;
};

const saveAs = async (file: string, content: string) => {
  await fetch(getEncodingPrefix(file, content))
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
