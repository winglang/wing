import classNames from "classnames";
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "../../design-system/Button.js";
import { Checkbox } from "../../design-system/Checkbox.js";
import { SpinnerLoader } from "../../design-system/SpinnerLoader.js";
import { TextHighlight } from "../../design-system/TextHighlight.js";
import { trpc } from "../../utils/trpc.js";
import { File, useDownloadFile } from "../../utils/useDownloadFile.js";

export interface BucketViewProps {
  resourcePath: string;
}

export interface FileExplorerEntry {
  type: "directory" | "file";
  name: string;
  updatedAt?: number;
  fileSize?: number;
}

const getFileType = (fileName: string) => {
  return fileName.split(".").pop();
};

const canBePreviewed = (fileName: string) => {
  const validFileTypes = ["txt", "json"];
  const fileType = getFileType(fileName);
  return fileType && validFileTypes.includes(fileType);
};

export const BucketView = ({ resourcePath }: BucketViewProps) => {
  const bucketList = trpc["bucket.list"].useQuery({ resourcePath });
  const putFile = trpc["bucket.put"].useMutation();
  const getFile = trpc["bucket.get"].useMutation();
  const deleteFile = trpc["bucket.delete"].useMutation();

  const [tableLoading, setTableLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

  const [entries, setEntries] = useState<FileExplorerEntry[]>([]);
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileInputId, setFileInputId] = useState(new Date().toString());

  const { download, downloadFiles } = useDownloadFile();

  const [currentFile, setCurrentFile] = useState<
    | {
        entry: FileExplorerEntry;
        content: string;
      }
    | undefined
  >();

  const addNewEntries: FormEventHandler<HTMLInputElement> = async (event) => {
    for (const file of event.currentTarget.files ?? []) {
      await putFile.mutateAsync({
        resourcePath,
        fileName: file.name,
        filePath: file.path,
      });
    }
    // force re-render to avoid problems uploading the same file twice
    setFileInputId(new Date().toString());
  };

  const deleteSelectedEntries = async () => {
    setTableLoading(true);
    if (currentFile && selectedEntries.includes(currentFile.entry.name)) {
      setCurrentFile(undefined);
    }
    await deleteFile.mutateAsync({
      resourcePath,
      fileNames: selectedEntries,
    });

    setSelectedEntries([]);
    setTableLoading(false);
  };

  const downloadSelectedEntries = useCallback(async () => {
    if (selectedEntries.length === 0) {
      return;
    }

    setTableLoading(true);
    if (selectedEntries.length === 1 && selectedEntries[0]) {
      const [fileName] = selectedEntries;
      const content = await getFile.mutateAsync({
        resourcePath,
        fileName,
      });
      download(fileName, content);
    }
    if (selectedEntries.length > 1) {
      const files: File[] = [];
      for (const entry of selectedEntries) {
        const content = await getFile.mutateAsync({
          resourcePath,
          fileName: entry,
        });
        const file = { filename: entry, content };
        files.push(file);
      }
      await downloadFiles(files);
    }
    setTableLoading(false);
    setSelectedEntries([]);
  }, [selectedEntries]);

  const onEntrySelected = async (
    entry: FileExplorerEntry,
    checked: boolean,
    previewFile: boolean = false,
  ) => {
    setSelectedEntries(([...checkedEntries]) => {
      if (checked) {
        if (checkedEntries.includes(entry.name)) {
          return checkedEntries;
        }
        return [...checkedEntries, entry.name];
      } else {
        const index = checkedEntries.indexOf(entry.name);
        if (index !== -1) {
          checkedEntries.splice(index, 1);
        }
        return checkedEntries;
      }
    });
    if (previewFile && entry !== currentFile?.entry) {
      setCurrentFile({ entry, content: "" });
      if (canBePreviewed(entry.name)) {
        setPreviewLoading(true);
        const file = await getFile.mutateAsync({
          resourcePath,
          fileName: entry.name,
        });
        setCurrentFile({ entry, content: file });
        setPreviewLoading(false);
      }
    }
  };

  // todo [sa] make it work better with actual file objects and not only keys
  useEffect(() => {
    setEntries(
      bucketList.data?.map((file) => ({
        type: "file",
        name: file,
      })) ?? [],
    );
  }, [bucketList.data]);

  return (
    <div className="h-full flex-1 flex flex-col text-sm space-y-1.5">
      <div className="flex justify-between items-center gap-1">
        <div className="flex items-center gap-1">
          <Button
            label="Download"
            disabled={selectedEntries.length === 0}
            onClick={downloadSelectedEntries}
          />
          <Button
            label="Delete"
            disabled={selectedEntries.length === 0}
            onClick={deleteSelectedEntries}
          />
        </div>

        <div>
          <input
            key={fileInputId}
            ref={fileInputRef}
            type="file"
            className="hidden"
            onInput={addNewEntries}
          />
          <Button
            label="Upload"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          />
        </div>
      </div>

      <div className="flex-1 bg-white rounded border border-slate-200 h-96">
        <table className="w-full bg-white rounded table-fixed">
          <tbody className="relative max-h-[10rem] block overflow-y-auto">
            {tableLoading && (
              <tr className="w-full h-full absolute z-10 bg-opacity-50 bg-slate-50">
                <td className="flex justify-center h-full items-center">
                  <SpinnerLoader className="h-5 w-5" />
                </td>
              </tr>
            )}
            {entries.length === 0 && (
              <tr className="table w-full">
                <td className="px-2">
                  <div className="text-center text-slate-400 inline-block w-full">
                    {!tableLoading && "No files"}
                  </div>
                </td>
              </tr>
            )}
            {entries.map((entry) => {
              return (
                <tr key={entry.name} className="table w-full table-fixed">
                  <td
                    className={classNames(
                      "px-2 group hover:bg-slate-200/50 text-slate-600",
                      currentFile?.entry.name === entry.name && "bg-slate-200",
                    )}
                  >
                    <div className="flex items-center gap-1.5 w-full">
                      <Checkbox
                        checked={selectedEntries.includes(entry.name)}
                        onChange={async (event) => {
                          event.stopPropagation();
                          await onEntrySelected(
                            entry,
                            event.currentTarget.checked,
                          );
                        }}
                      />
                      <button
                        className="w-full text-left truncate outline-none"
                        onClick={() => onEntrySelected(entry, true, true)}
                      >
                        {entry.name}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {currentFile && (
        <div>
          <span className="text-sm text-slate-500">
            {currentFile.entry.name}
          </span>

          <TextHighlight
            className={classNames(
              "mt-1 max-h-[30rem]",
              "flex-1 font-mono w-full",
              "rounded border-slate-200 bg-white",
              "select-text text-slate-600 text-xs",
              "break-words whitespace-pre-wrap",
              "overflow-y-auto p-2 border",
            )}
            value={
              currentFile.content ||
              (!previewLoading && "No preview available") ||
              ""
            }
            format={getFileType(currentFile.entry.name) === "json"}
          >
            {previewLoading && (
              <div className="flex justify-center items-center h-20">
                <SpinnerLoader className="h-5 w-5" />
              </div>
            )}
          </TextHighlight>
        </div>
      )}
    </div>
  );
};
