import { useCallback, useEffect, useMemo, useState } from "react";

import { useDownloadFile } from "../shared/use-download-file.js";
import { useUploadFile } from "../shared/use-upload-file.js";

import { trpc } from "./trpc.js";

export interface UseBucketOptions {
  resourcePath: string;
  onFileListChange: (files: string[]) => void;
  currentFile?: string;
}
export const useBucket = ({
  resourcePath,
  onFileListChange,
  currentFile,
}: UseBucketOptions) => {
  const { readBlob } = useUploadFile();
  const { download: downloadFileLocally, downloadFiles: downloadFilesLocally } =
    useDownloadFile();

  const list = trpc["bucket.list"].useQuery(
    { resourcePath },
    {
      onSuccess(data) {
        onFileListChange(data);
      },
    },
  );
  const putMutation = trpc["bucket.put"].useMutation();
  const deleteMutation = trpc["bucket.delete"].useMutation();
  const downloadMutation = trpc["bucket.download"].useMutation();
  const currentFileContentQuery = trpc["bucket.get"].useQuery(
    {
      fileName: currentFile ?? "",
      resourcePath,
    },
    {
      enabled: currentFile !== undefined,
      keepPreviousData: false,
    },
  );
  const [currentFileContent, setCurrentFileContent] = useState<string>();

  useEffect(() => {
    if (currentFileContentQuery.data) {
      setCurrentFileContent(currentFileContentQuery.data);
    }
  }, [currentFileContentQuery.data]);

  useEffect(() => {
    onFileListChange(list.data ?? []);
  }, [list.data, onFileListChange]);

  const putFile = useCallback(
    (fileName: string, fileContent: string) => {
      return putMutation.mutateAsync({
        resourcePath,
        fileName,
        fileContent,
      });
    },
    [putMutation, resourcePath],
  );

  const uploadFiles = useCallback(
    async (files: FileList) => {
      for (const file of files) {
        const fileContent = await readBlob(file.name, file);
        void putFile(file.name, fileContent);
      }
    },
    [putFile, readBlob],
  );

  const downloadFiles = useCallback(
    async (files: string[]) => {
      if (files.length === 0) {
        return;
      }
      if (files.length === 1 && files[0]) {
        const content =
          currentFileContent ||
          (await downloadMutation.mutateAsync({
            resourcePath,
            fileName: files[0],
          }));
        void downloadFileLocally(files[0], content);
      }
      if (files.length > 1) {
        const promises = files.map(async (file) => {
          const content = await downloadMutation.mutateAsync({
            resourcePath,
            fileName: file,
          });
          return { filename: file, content };
        });

        const result = await Promise.all(promises);
        void downloadFilesLocally(result);
      }
    },
    [
      downloadMutation,
      downloadFileLocally,
      downloadFilesLocally,
      resourcePath,
      currentFileContent,
    ],
  );

  const deleteFile = useCallback(
    async (fileNames: string[]) => {
      return deleteMutation.mutateAsync({
        resourcePath,
        fileNames,
      });
    },
    [deleteMutation, resourcePath],
  );

  const isLoading = useMemo(() => {
    return currentFileContentQuery.isFetching;
  }, [currentFileContentQuery.isFetching]);

  return {
    uploadFiles,
    downloadFile: downloadFileLocally,
    downloadFiles,
    deleteFile,
    currentFileContent,
    isLoading,
  };
};
