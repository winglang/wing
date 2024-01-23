import {
  Button,
  Checkbox,
  Input,
  Modal,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { useId, useState } from "react";
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

  const [checked, setChecked] = useState(false);

  const id = useId();

  return (
    <Modal visible={visible}>
      <div className={classNames(theme.textInput)}>
        <h1 className="text-lg font-bold">Terms and Conditions</h1>
        <div className="text-sm max-w-[40rem] max-h-[30rem] overflow-auto py-4">
          <div className="prose-sm dark:prose-invert-sm">
            <ReactMarkdown
              // eslint-disable-next-line react/no-children-prop
              children={license}
            />
          </div>
        </div>

        <div className="pt-2">
          <div className="space-x-2 items-center flex">
            <Checkbox
              id={id}
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
              className="cursor-pointer"
            />
            <label htmlFor={id} className="cursor-pointer select-none">
              I have read and agree to the terms and conditions.
            </label>
          </div>
          <div className="flex justify-end">
            <Button primary onClick={onAccept} disabled={!checked}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
