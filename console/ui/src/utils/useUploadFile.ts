import { getFileEncoding } from "./useDownloadFile.js";

interface Reader {
  read(file: Blob, fileReader: FileReader): void;
  result(input: string): string;
}

class UTF8Reader implements Reader {
  read(file: Blob, fileReader: FileReader) {
    fileReader.readAsText(file);
  }

  result(input: string) {
    return input;
  }
}

class Base64Reader implements Reader {
  read(file: Blob, fileReader: FileReader) {
    fileReader.readAsDataURL(file);
  }

  result(input: string) {
    const [_, value] = input.split(",");
    return value!;
  }
}

const getReader = (fileName: string): Reader => {
  const encoding = getFileEncoding(fileName);
  switch (encoding) {
    case "utf8": {
      return new UTF8Reader();
    }
    case "base64": {
      return new Base64Reader();
    }
    default: {
      throw new Error(`unkown file encoding: ${fileName} ${encoding}`);
    }
  }
};

const readBlob = async (fileName: string, file: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = getReader(fileName);
    const fileReader = new FileReader();
    fileReader.addEventListener("load", (event) => {
      if (event.target && typeof event.target.result === "string") {
        resolve(reader.result(event.target.result));
      } else {
        reject("invalid event target");
      }
    });
    fileReader.addEventListener("error", () => {
      reject(`failed to read ${fileName}`);
    });
    reader.read(file, fileReader);
  });
};

export const useUploadFile = () => {
  return {
    readBlob,
  };
};
