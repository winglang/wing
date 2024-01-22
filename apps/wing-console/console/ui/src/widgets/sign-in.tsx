import { Button, Modal, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";

export interface SignInModalProps {
  visible: boolean;
}

export const SignInModal = (props: SignInModalProps) => {
  const { theme } = useTheme();
  return (
    <Modal visible={props.visible} setVisible={() => {}}>
      <div className="flex flex-col gap-4 max-w-md">
        <h3
          className={classNames(
            theme.text1,
            "text-base font-semibold leading-6",
          )}
        >
          Sign In Required
        </h3>

        <p className={classNames(theme.text2, "text-sm")}>
          In order to use the Wing Console, you are required to sign in to Wing
          Cloud. This will help us to provide you with a better experience in
          the future.
        </p>

        <p className={classNames(theme.text2, "text-sm")}>
          Your code will <strong className={theme.text1}>not</strong> be sent to
          Wing Cloud.
        </p>

        <div className="flex gap-2">
          <Button>Sign In to Wing Cloud</Button>
        </div>
      </div>
    </Modal>
  );
};
