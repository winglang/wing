import { Button, Link, Modal, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParam } from "react-use";

import { AppContext } from "../AppContext.js";
import { trpc } from "../services/trpc.js";

export const useRequireSignIn = () => {
  const { wingCloudSignInUrl } = useContext(AppContext);
  const analytics = trpc["app.analytics"].useQuery();
  const signIn = useCallback(() => {
    const url = new URL(wingCloudSignInUrl!);
    url.searchParams.append("port", location.port);
    url.searchParams.append("anonymousId", `${analytics.data?.anonymousId}`);
    location.href = url.toString();
  }, [wingCloudSignInUrl, analytics.data?.anonymousId]);
  const signedInParameter = useSearchParam("signedIn");
  const [signInRequired, setSignInRequired] = useState(false);
  useEffect(() => {
    // Skip if offline.
    if (navigator.onLine === false) {
      return;
    }

    if (analytics.data?.requireSignIn && signedInParameter === null) {
      setSignInRequired(true);
    } else {
      setSignInRequired(false);
    }
  }, [analytics.data?.requireSignIn, signedInParameter]);
  const { mutate: notifySignedIn } =
    trpc["app.analytics.notifySignedIn"].useMutation();
  useEffect(() => {
    if (signedInParameter !== null) {
      notifySignedIn();
      const url = new URL(location.href);
      url.searchParams.delete("signedIn");
      history.replaceState({}, document.title, url);
    }
  }, [signedInParameter, notifySignedIn]);
  return { signInRequired, signIn };
};

export interface SignInModalProps {
  visible: boolean;
  onSignIn: () => void;
}

export const SignInModal = (props: SignInModalProps) => {
  const { theme } = useTheme();

  return (
    <Modal visible={props.visible}>
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
          <Button onClick={props.onSignIn}>Sign In to Wing Cloud</Button>
        </div>
      </div>
    </Modal>
  );
};
