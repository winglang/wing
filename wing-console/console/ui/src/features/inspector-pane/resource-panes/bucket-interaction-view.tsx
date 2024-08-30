import { memo, useState } from "react";

import { FileBrowserView } from "./file-browser-view.js";
import { useBucket } from "./use-bucket.js";

export interface BucketViewProps {
  resourcePath: string;
}

export const BucketInteractionView = memo(
  ({ resourcePath }: BucketViewProps) => {
    const [currentFile, setCurrentFile] = useState<string>();

    const {
      uploadFiles,
      downloadFiles,
      deleteFile,
      currentFileContent,
      isLoading,
      files,
    } = useBucket({
      resourcePath,
      currentFile,
    });

    return (
      <FileBrowserView
        isLoading={isLoading}
        files={files}
        deleteFilesHandler={deleteFile}
        downloadFilesHandler={downloadFiles}
        uploadFilesHandler={uploadFiles}
        currentFileContent={currentFileContent}
        onCurrentFileChange={setCurrentFile}
      />
    );
  },
);
