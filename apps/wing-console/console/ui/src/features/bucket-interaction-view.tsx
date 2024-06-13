import type { TreeEntry } from "@wingconsole/design-system";
import { memo, useCallback, useMemo, useState } from "react";

import { useBucket } from "../services/use-bucket.js";

import { FileBrowserView } from "./file-browser-view.js";

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
