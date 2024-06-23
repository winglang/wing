import type { TreeEntry } from "@wingconsole/design-system";
import type { FormEventHandler } from "react";
import { useCallback, useEffect, useState } from "react";

import { FileBrowser } from "./file-browser.js";

export interface FileBrowserViewProps {
  isLoading: boolean;
  files: string[];
  deleteFilesHandler: (files: string[]) => Promise<void>;
  downloadFilesHandler: (files: string[]) => Promise<void>;
  uploadFilesHandler: (fileList: FileList) => Promise<void>;
  currentFileContent: string | undefined;
  onCurrentFileChange: (file: string | undefined) => void;
}
export const FileBrowserView = ({
  files,
  uploadFilesHandler,
  deleteFilesHandler,
  downloadFilesHandler,
  currentFileContent,
  onCurrentFileChange,
  isLoading,
}: FileBrowserViewProps) => {
  const [fileEntries, setFileEntries] = useState<TreeEntry[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [currentFile, setCurrentFile] = useState<string>();
  const [fileInputId, setFileInputId] = useState(new Date().toString());

  useEffect(() => {
    setFileEntries(
      files.map((file) => ({
        id: file,
        name: file,
      })) ?? [],
    );
  }, [files]);

  useEffect(() => {
    if (currentFile && !fileEntries.some((file) => file.id === currentFile)) {
      setCurrentFile(undefined);
    }
  }, [fileEntries, currentFile]);

  useEffect(() => {
    onCurrentFileChange(currentFile);
  }, [currentFile, onCurrentFileChange]);

  const uploadSelectedFiles: FormEventHandler<HTMLInputElement> = useCallback(
    async (event) => {
      await uploadFilesHandler(event.currentTarget.files ?? new FileList());
      // force re-render to avoid problems uploading the same file twice
      setFileInputId(new Date().toString());
    },
    [uploadFilesHandler],
  );

  const deleteSelectedFiles = useCallback(async () => {
    if (currentFile) {
      setCurrentFile(undefined);
    }
    await deleteFilesHandler(selectedFiles);
    setSelectedFiles([]);
  }, [currentFile, deleteFilesHandler, selectedFiles]);

  const downloadSelectedFiles = useCallback(async () => {
    await downloadFilesHandler(selectedFiles);
    setSelectedFiles([]);
  }, [selectedFiles, downloadFilesHandler]);

  const downloadCurrentFile = useCallback(async () => {
    if (!currentFile) {
      return;
    }
    void downloadFilesHandler([currentFile]);
  }, [currentFile, downloadFilesHandler]);

  return (
    <FileBrowser
      isLoading={isLoading}
      files={fileEntries}
      selectedFiles={selectedFiles}
      selectedFile={currentFile ?? ""}
      selectedFileData={currentFileContent}
      fileInputId={fileInputId}
      onDeleteSelectedFilesClick={deleteSelectedFiles}
      onDownloadSelectedFilesClick={downloadSelectedFiles}
      onDownloadCurrentFileClick={downloadCurrentFile}
      onUploadSelectedFilesClick={uploadSelectedFiles}
      onSelectedEntriesChange={setSelectedFiles}
      onCurrentEntryChange={setCurrentFile}
    />
  );
};
