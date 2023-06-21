import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  FilePreview,
  Modal,
  ResponseInput,
  ToolbarButton,
  Tree,
  TreeEntry,
  getPreviewType,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { FormEvent, useMemo, useRef, useState } from "react";

export interface BucketInteractionProps {
  selectedEntries: string[];
  entries: TreeEntry[];
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
export const BucketInteraction = ({
  selectedEntries,
  entries,
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
}: BucketInteractionProps) => {
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewType = useMemo(() => {
    return getPreviewType(selectedFile ?? "");
  }, [selectedFile]);

  const validPreviewTypes = new Set(["image", "video", "pdf", "text"]);
  const [showPreview, setShowPreview] = useState(false);

  const currentRef = useRef<HTMLButtonElement>(null);

  const closePreview = () => {
    setShowPreview(false);
    currentRef.current?.focus();
  };

  return (
    <div className="h-full flex-1 flex flex-col text-sm space-y-1.5">
      <div className="flex justify-between items-center gap-1">
        <div className="flex items-center gap-1">
          <Button
            label="Download"
            disabled={selectedEntries.length === 0}
            onClick={onDownloadSelectedFilesClick}
          />
          <Button
            label="Delete"
            disabled={selectedEntries.length === 0}
            onClick={onDeleteSelectedFilesClick}
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
          />
        </div>
      </div>

      {entries.length === 0 && (
        <div
          className={classNames(
            theme.bgInput,
            theme.text2,
            theme.borderInput,
            "px-2.5 py-1.5",
            "outline-none rounded text-center inline-block w-full text-xs",
          )}
        >
          No files
        </div>
      )}
      {entries.length > 0 && (
        <Tree
          currentRef={currentRef}
          entries={entries}
          selectedEntries={selectedEntries}
          onCurrentChange={onCurrentEntryChange}
          onSelectionChange={onSelectedEntriesChange}
          onOpenEntry={() => {
            if (validPreviewTypes.has(previewType)) {
              setShowPreview(true);
            }
          }}
          className="min-h-[6rem] h-48 overflow-y-auto resize-y"
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
