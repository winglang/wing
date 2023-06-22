import classNames from "classnames";
import { useMemo } from "react";

import { TextHighlight } from "./text-highlight.js";
import { useTheme } from "./theme-provider.js";

const getFileType = (fileName: string) => {
  return fileName.split(".").pop();
};

export type PreviewType = "image" | "pdf" | "text" | "video" | "audio";

export const getPreviewType = (filename: string): PreviewType => {
  switch (getFileType(filename)) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg": {
      return "image";
    }
    case "mp4":
    case "webm": {
      return "video";
    }
    case "mp3":
    case "ogg": {
      return "audio";
    }
    case "pdf": {
      return "pdf";
    }
    default: {
      return "text";
    }
  }
};

export interface FilePreviewProps {
  filename: string;
  content: string;
  className?: string;
}

export const FilePreview = ({
  filename,
  content,
  className,
}: FilePreviewProps) => {
  const { theme } = useTheme();

  const type: PreviewType = useMemo(() => {
    if (!filename) {
      return "text";
    }
    return getPreviewType(filename);
  }, [filename]);

  return (
    <>
      {["image", "video", "audio", "pdf"].includes(type) && (
        <div
          className={classNames(
            "border rounded",
            theme.borderInput,
            theme.bgInput,
            theme.focusInput,
            "flex flex-col grow",
          )}
        >
          {type === "image" && (
            <img
              src={`data:image/${getFileType(filename)}+xml;base64,${content}`}
              alt="Preview"
              className={classNames("h-full mx-auto p-4", className)}
            />
          )}
          {type === "video" && (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              src={`data:video/${getFileType(filename)};base64,${content}`}
              controls
              className={classNames(
                "w-full mx-auto rounded",
                theme.focusInput,
                theme.borderInput,
                className,
              )}
            />
          )}
          {type === "audio" && (
            <div className="p-2 flex">
              {/*eslint-disable-next-line jsx-a11y/media-has-caption*/}
              <audio
                src={`data:audio/${getFileType(filename)};base64,${content}`}
                controls
                className="mx-auto focus:outline-none py-2 text-xs scale-75"
              />
            </div>
          )}
          {type === "pdf" && (
            <iframe
              title="Preview"
              src={`data:application/pdf;base64,${content}#toolbar=0`}
              className={classNames(
                "w-full h-full",
                theme.focusInput,
                theme.borderInput,
                className,
              )}
            />
          )}
        </div>
      )}
      {type === "text" && (
        <TextHighlight
          className={classNames(
            theme.bgInput,
            theme.textInput,
            theme.borderInput,
            "flex-1 font-mono w-full",
            "p-2 rounded border",
            "select-text text-xs",
            "break-words whitespace-pre-wrap",

            className,
          )}
          text={content}
          json
        />
      )}
    </>
  );
};
