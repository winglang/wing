import { Button, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

export interface TermsAndConditionsProps {
  visible: boolean;
  onAccept: () => void;
}

export const TermsAndConditions = ({
  visible,
  onAccept,
}: TermsAndConditionsProps) => {
  const { theme } = useTheme();

  return (
    visible && (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-40">
        <div
          className={classNames(
            "p-4 rounded-lg shadow-lg space-y-2",
            theme.bgInput,
            theme.textInput,
          )}
        >
          <h1 className="text-lg font-bold">Terms and Conditions</h1>
          <div className="text-sm space-y-2 py-2">
            <p className="text-sm">
              Please take a moment to review our <b>Terms and Conditions</b> by
              visiting{" "}
              <a
                className="text-blue-500 font-semibold"
                href="https://github.com/winglang/wing/blob/main/apps/wing-console/LICENSE.md"
                target="__blank"
              >
                this link
              </a>
              .
            </p>

            <p className="text-sm">
              Once you have thoroughly read and understood the terms, kindly
              confirm your acceptance.
            </p>
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
