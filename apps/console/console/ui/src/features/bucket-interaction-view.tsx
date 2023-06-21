import { TreeEntry } from "@wingconsole/design-system";
import { FormEventHandler, useCallback, useMemo, useState } from "react";

import { useBucket } from "../services/use-bucket.js";
import { BucketInteraction } from "../ui/bucket-interaction.js";

export interface BucketViewProps {
  resourcePath: string;
}

export const BucketInteractionView = ({ resourcePath }: BucketViewProps) => {
  const [entries, setEntries] = useState<TreeEntry[]>([]);
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [currentFile, setCurrentFile] = useState<string>();

  const onFileListChange = useCallback((files: string[]) => {
    setEntries(
      files.map((file) => ({
        id: file,
        name: file,
      })) ?? [],
    );
    setCurrentFile(undefined);
    setSelectedEntries([]);
  }, []);

  const {
    uploadFiles,
    downloadFile,
    downloadFiles,
    deleteFile,
    currentFileContent,
    isLoading,
  } = useBucket({
    resourcePath,
    onFileListChange,
    currentFile,
  });

  const [fileInputId, setFileInputId] = useState(new Date().toString());

  const uploadSelectedEntries: FormEventHandler<HTMLInputElement> = useCallback(
    async (event) => {
      await uploadFiles(event.currentTarget.files ?? new FileList());
      // force re-render to avoid problems uploading the same file twice
      setFileInputId(new Date().toString());
    },
    [uploadFiles],
  );

  const deleteSelectedEntries = useCallback(async () => {
    if (currentFile) {
      setCurrentFile(undefined);
    }
    await deleteFile(selectedEntries);
    setSelectedEntries([]);
  }, [currentFile, deleteFile, selectedEntries]);

  const downloadSelectedEntries = useCallback(async () => {
    await downloadFiles(selectedEntries);
    setSelectedEntries([]);
  }, [selectedEntries, downloadFiles]);

  const downloadCurrentFile = useCallback(async () => {
    if (!currentFile || !currentFileContent) {
      return;
    }
    downloadFile(currentFile, currentFileContent);
  }, [currentFile, currentFileContent, downloadFile]);

  return (
    <BucketInteraction
      isLoading={isLoading}
      entries={entries}
      selectedEntries={selectedEntries}
      selectedFile={currentFile ?? ""}
      selectedFileData={currentFileContent}
      fileInputId={fileInputId}
      onDeleteSelectedFilesClick={deleteSelectedEntries}
      onDownloadSelectedFilesClick={downloadSelectedEntries}
      onDownloadCurrentFileClick={downloadCurrentFile}
      onUploadSelectedFilesClick={uploadSelectedEntries}
      onSelectedEntriesChange={setSelectedEntries}
      onCurrentEntryChange={setCurrentFile}
    />
  );
};
