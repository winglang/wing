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
            <div className="space-y-3">
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
