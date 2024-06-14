import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { TreeEntry } from "@wingconsole/design-system";
import {
  Button,
  FilePreview,
  Modal,
  ResponseInput,
  ToolbarButton,
  Tree,
  getPreviewType,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";
import type { FormEvent } from "react";
import { useCallback, useContext, useMemo, useRef, useState } from "react";

import { LayoutContext, LayoutType } from "../../layout/layout-provider.js";

export interface FileBrowserProps {
  selectedFiles: string[];
  files: TreeEntry[];
  fileInputId: string;
  selectedFile: string;
  isLoading: boolean;
  selectedFileData: string | undefined;
  onDownloadSelectedFilesClick: () => void;
  onDownloadCurrentFileClick: () => void;
  onDeleteSelectedFilesClick: () => void;
  onUploadSelectedFilesClick: (event: FormEvent<HTMLInputElement>) => void;
  onSelectedEntriesChange: (entries: string[]) => void;
  onCurrentEntryChange: (index: string | undefined) => void;
}

export const FileBrowser = ({
  selectedFiles,
  files,
  fileInputId,
  selectedFileData,
  selectedFile,
  isLoading,
  onDownloadSelectedFilesClick,
  onDownloadCurrentFileClick,
  onDeleteSelectedFilesClick,
  onUploadSelectedFilesClick,
  onSelectedEntriesChange,
  onCurrentEntryChange,
}: FileBrowserProps) => {
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewType = useMemo(() => {
    return getPreviewType(selectedFile ?? "");
  }, [selectedFile]);

  const [validPreviewTypes] = useState(
    () => new Set(["image", "video", "pdf", "text"]),
  );
  const [showPreview, setShowPreview] = useState(false);

  const currentRef = useRef<HTMLButtonElement>(null);

  const closePreview = useCallback(() => {
    setShowPreview(false);
    currentRef.current?.focus();
  }, []);

  const layoutType = useContext(LayoutContext);

  const onOpenEntry = useCallback(() => {
    if (validPreviewTypes.has(previewType)) {
      setShowPreview(true);
    }
  }, [previewType, validPreviewTypes]);

  return (
    <div className="h-full flex-1 flex flex-col text-sm space-y-1.5">
      <div className="flex justify-between items-center gap-1">
        <div className="flex items-center gap-1">
          <Button
            label="Download"
            disabled={selectedFiles.length === 0}
            onClick={onDownloadSelectedFilesClick}
            dataTestid="cloud.bucket:download"
          />
          <Button
            label="Delete"
            disabled={selectedFiles.length === 0}
            onClick={onDeleteSelectedFilesClick}
            dataTestid="cloud.bucket:delete-file"
          />
        </div>

        <div>
          <input
            key={fileInputId}
            ref={fileInputRef}
            type="file"
            className="hidden"
            onInput={onUploadSelectedFilesClick}
            multiple
          />
          <Button
            label="Upload"
            onClick={() => {
              fileInputRef.current?.click();
            }}
            dataTestid="cloud.bucket:upload"
          />
        </div>
      </div>

      {files.length === 0 && (
        <div
          className={classNames(
            theme.bgInput,
            theme.text2,
            theme.borderInput,
            "px-2.5 py-1.5",
            "outline-none rounded text-center inline-block w-full text-xs",
          )}
          data-testid="cloud.bucket:empty-state"
        >
          No files
        </div>
      )}
      {files.length > 0 && (
        <Tree
          currentRef={currentRef}
          entries={files}
          selectedEntries={selectedFiles}
          onCurrentChange={onCurrentEntryChange}
          onSelectionChange={onSelectedEntriesChange}
          onOpenEntry={onOpenEntry}
          dataTestid="cloud.bucket:files"
          className={classNames(
            "overflow-y-auto resize-y",
            layoutType === LayoutType.Tutorial && "min-h-[4rem]",
            layoutType !== LayoutType.Tutorial && "h-48 min-h-[6rem]",
          )}
        />
      )}

      {selectedFile && (
        <div className="space-y-1 pt-2">
          <div className={classNames(theme.text2, "text-sm flex gap-x-1")}>
            <span className={theme.text1}>File:</span>
            <span className="truncate">{selectedFile}</span>
            <div className="grow" />
            {validPreviewTypes.has(previewType) && (
              <ToolbarButton title="Open" onClick={() => setShowPreview(true)}>
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                <span>Open</span>
              </ToolbarButton>
            )}
          </div>
          <ResponseInput
            empty={!selectedFileData}
            loading={!showPreview && isLoading}
          >
            <FilePreview
              filename={selectedFile}
              content={selectedFileData ?? ""}
              className={classNames(
                previewType === "image" && "max-h-[25rem]",
                previewType === "pdf" && "min-h-[25rem]",
                previewType === "text" &&
                  "max-h-[30rem] resize-y overflow-y-auto",
              )}
              dataTestid="cloud.bucket:file-preview"
            />
          </ResponseInput>
        </div>
      )}

      <Modal
        visible={showPreview}
        setVisible={closePreview}
        className="max-w-[80vw] space-y-1.5"
      >
        <div className={classNames(theme.text2, "text-md flex space-x-1")}>
          <span className={theme.text1}>File:</span>
          <span className="truncate">{selectedFile}</span>
          <div className="grow" />
          <ToolbarButton
            title="Download"
            disabled={!selectedFile || !selectedFileData}
            onClick={onDownloadCurrentFileClick}
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
          </ToolbarButton>
          <ToolbarButton title="Close" onClick={closePreview}>
            <XMarkIcon className="w-5 h-5" />
          </ToolbarButton>
        </div>
        <FilePreview
          filename={selectedFile ?? ""}
          content={selectedFileData ?? ""}
          className={classNames(
            previewType === "image" &&
              "min-h-[15rem] min-w-[15rem] max-h-[70vh]",
            previewType === "video" && "min-w-[70vw]",
            previewType === "pdf" && "min-h-[70vh] min-w-[50vw]",
            previewType === "text" && [
              "min-w-[15rem] min-h-[20rem] max-h-[80vh] max-w-[75vw] w-full",
              "resize overflow-auto",
            ],
          )}
        />
      </Modal>
    </div>
  );
};
