import { Button, Link, Modal, useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParam } from "react-use";

import { AppContext } from "../AppContext.js";
import { trpc } from "../services/trpc.js";

import { GithubIcon } from "./github-icon.js";

export interface SignInModalProps {}

export const SignInModal = (props: SignInModalProps) => {
  const { theme } = useTheme();
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

  return (
    <Modal visible={signInRequired}>
      <div className="flex flex-col gap-4 max-w-lg items-center">
        <h3
          className={classNames(
            theme.text1,
            "text-base font-semibold leading-6",
          )}
        >
          Wing Console
        </h3>

        <p className={classNames(theme.text2, "text-sm")}>
          Help us to provide you with a better experience.
        </p>

        <div className="flex justify-around gap-2">
          <Button onClick={signIn}>
            <GithubIcon className="w-4 h-4" />
            <span className="text-sm">Sign In</span>
          </Button>
        </div>

        <div className="flex justify-around">
          <p className={classNames(theme.text2, "text-xs")}>
            You acknowledge that you read, and agree to our{" "}
            <Link
              href="https://github.com/winglang/wing/blob/main/apps/wing-console/LICENSE.md"
              target="_blank"
            >
              Terms and Conditions
            </Link>
            .
          </p>
        </div>
      </div>
    </Modal>
  );
};
