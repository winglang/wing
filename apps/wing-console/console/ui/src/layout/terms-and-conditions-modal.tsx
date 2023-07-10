import { Button, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";

export interface TermsAndConditionsModalProps {
  visible: boolean;
  onAccept: () => void;
  license: string;
}

export const TermsAndConditionsModal = ({
  visible,
  onAccept,
  license,
}: TermsAndConditionsModalProps) => {
  const { theme } = useTheme();

  return (
    visible && (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-40">
        <div
          className={classNames(
            "p-6 rounded-lg shadow-lg space-y-2",
            theme.bgInput,
            theme.textInput,
          )}
        >
          <h1 className="text-lg font-bold">Terms and Conditions</h1>
          <div className="text-sm max-w-[40rem] max-h-[30rem] overflow-auto pr-4">
            <div
              className={classNames(
                "font-sans",
                "prose-lg prose-invert prose-p:leading-6 text-slate-700 dark:text-[#BDCECC] prose-ol:list-decimal",
                "prose-pre:bg-slate-200 dark:prose-pre:bg-slate-800 prose-pre:my-3 prose-ol:my-prose-p:text-slate-700 dark:prose-ol:my-prose-p:text-[#BDCECC]",
                "prose-pre:overflow-auto",
                "prose-a:text-sky-700 dark:prose-a:text-sky-300",
                "prose-h3:text-xl prose-h3:pb-4 prose-h3:pt-4 prose-headings:font-sans prose-h3:font-bold",
                "prose-h4:text-xl prose-h4:pb-4 prose-h4:pt-0 prose-headings:font-sans prose-h4:font-bold",
                "prose-h1:text-3xl prose-headings:pb-8 prose-headings:text-slate-700 dark:prose-headings:text-[#BDCECC] prose-h1:font-bold",
                "[&>*]:transition-colors [&>*]:duration-300",
                "prose-h1:transition-colors prose-h1:duration-300",
              )}
            >
              <ReactMarkdown
                // eslint-disable-next-line react/no-children-prop
                children={license}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button primary onClick={onAccept}>
              Accept
            </Button>
          </div>
        </div>
      </div>
    )
  );
};
