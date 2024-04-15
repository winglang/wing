import { useCallback, useEffect, useMemo, useState } from "react";

import { FileBrowserView } from "../features/file-browser-view.js";
import { trpc } from "../services/trpc.js";
import { useDownloadFile } from "../shared/use-download-file.js";
import { useUploadFile } from "../shared/use-upload-file.js";

export interface CustomResourceFileBrowserProps {
  label: string;
  putHandler: string;
  deleteHandler: string;
  getHandler: string;
  listHandler: string;
}

export const CustomResourceFileBrowser = ({
  listHandler,
  deleteHandler,
  putHandler,
  getHandler,
}: CustomResourceFileBrowserProps) => {
  const { download: downloadFileLocally, downloadFiles: downloadFilesLocally } =
    useDownloadFile();
  const { readBlob } = useUploadFile();

  const [currentFile, setCurrentFile] = useState<string>();

  const listQuery = trpc["app.invokeResourceListQuery"].useQuery(
    {
      resourcePath: listHandler,
    },
    { enabled: !!listHandler },
  );

  const currentFileContentQuery = trpc["app.invokeResourceGetQuery"].useQuery(
    {
      fileName: currentFile ?? "",
      resourcePath: getHandler,
    },
    {
      enabled: currentFile !== undefined,
      keepPreviousData: false,
    },
  );

  const deleteMutation =
    trpc["app.invokeFileBrowserDeleteMutation"].useMutation();
  const downloadMutation =
    trpc["app.invokeFileBrowserDownloadMutation"].useMutation();
  const putMutation = trpc["app.invokeFileBrowserPutMutation"].useMutation();

  const [currentFileContent, setCurrentFileContent] = useState<string>();

  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    if (currentFileContentQuery.data) {
      setCurrentFileContent(currentFileContentQuery.data);
    }
  }, [currentFileContentQuery.data]);

  useEffect(() => {
    if (listQuery.data) {
      setFiles(listQuery.data);
    }
  }, [listQuery.data]);

  const deleteFiles = useCallback(
    async (files: string[]) => {
      for (const file of files) {
        await deleteMutation.mutateAsync({
          resourcePath: deleteHandler,
          fileName: file,
        });
      }
    },
    [deleteHandler, deleteMutation],
  );

  const downloadFiles = useCallback(
    async (files: string[]) => {
      if (files.length === 0) {
        return;
      }
      if (files.length === 1 && files[0]) {
        const content =
          currentFileContent ||
          (await downloadMutation.mutate({
            resourcePath: getHandler,
            fileName: files[0],
          }));
        void downloadFileLocally(files[0], content || "");
      }
      if (files.length > 1) {
        const promises = files.map(async (file) => {
          const content = await downloadMutation.mutateAsync({
            resourcePath: getHandler,
            fileName: file,
          });
          return { filename: file, content };
        });

        const result = await Promise.all(promises);
        void downloadFilesLocally(result);
      }
    },
    [
      downloadFileLocally,
      downloadFilesLocally,
      getHandler,
      downloadMutation,
      currentFileContent,
    ],
  );

  const putFile = useCallback(
    (fileName: string, fileContent: string) => {
      return putMutation.mutateAsync({
        resourcePath: putHandler,
        fileName,
        fileContent,
      });
    },
    [putHandler, putMutation],
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

  const isLoading = useMemo(() => {
    return currentFileContentQuery.isFetching;
  }, [currentFileContentQuery.isFetching]);

  return (
    <FileBrowserView
      isLoading={isLoading}
      files={files}
      deleteFilesHandler={deleteFiles}
      downloadFilesHandler={downloadFiles}
      uploadFilesHandler={uploadFiles}
      currentFileContent={currentFileContent}
      onCurrentFileChange={setCurrentFile}
    />
  );
};
