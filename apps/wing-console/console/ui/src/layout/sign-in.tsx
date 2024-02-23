import {
  Button,
  Link,
  Loader,
  Modal,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParam } from "react-use";

import { AppContext } from "../AppContext.js";
import { trpc } from "../services/trpc.js";

import { GithubIcon } from "./github-icon.js";
import { GoogleIcon } from "./google-icon.js";

/**
 * The name of the query parameter that is passed from
 * Wing Cloud after to the Console after signing in.
 */
const SIGNED_IN_QUERY_PARAMETER = "signedIn";

/**
 * The URL to the Console Terms and Conditions file.
 */
const TERMS_AND_CONDITIONS_URL =
  "https://github.com/winglang/wing/blob/main/apps/wing-console/LICENSE.md";

/**
 * Returns true if the Console should dismiss the sign in modal.
 *
 * It checks for the existence of the `signedIn` query parameter in the URL,
 * which is what we get after the user signs in with GitHub in Wing Cloud.
 */
const useShouldNotifySignedIn = () => {
  const signedIn = useSearchParam(SIGNED_IN_QUERY_PARAMETER);
  return useMemo(() => {
    return signedIn !== null;
  }, [signedIn]);
};

/**
 * Notifies the Wing Console after the user signs in with GitHub.
 *
 * Also, removes the query param from the URL for a neater experience.
 */
const useNotifyAfterSigningIn = () => {
  const { mutate: notify } = trpc["app.analytics.notifySignedIn"].useMutation();
  const shouldNotifySignedIn = useShouldNotifySignedIn();
  useEffect(() => {
    if (!shouldNotifySignedIn) {
      return;
    }

    // Trigger the notify call.
    notify();

    // Remove the `signedIn` query parameter from the URL.
    const url = new URL(location.href);
    url.searchParams.delete(SIGNED_IN_QUERY_PARAMETER);
    history.replaceState({}, document.title, url);
  }, [shouldNotifySignedIn, notify]);
};

/**
 * Returns a function that can be used to sign in the user.
 */
const useSignIn = () => {
  const { githubSignInURL, googleSignInURL } = useContext(AppContext);
  const { mutateAsync: reportSignInClicked } =
    trpc["app.analytics.signInClicked"].useMutation();
  const analytics = trpc["app.analytics"].useQuery();

  const signInWithGithub = useCallback(async () => {
    await reportSignInClicked();
    const url = new URL(githubSignInURL!);
    url.searchParams.append("port", location.port);
    url.searchParams.append("anonymousId", `${analytics.data?.anonymousId}`);
    location.href = url.toString();
  }, [reportSignInClicked, githubSignInURL, analytics.data?.anonymousId]);

  const signInWithGoogle = useCallback(async () => {
    await reportSignInClicked();
    const url = new URL(googleSignInURL!);
    url.searchParams.append("port", location.port);
    url.searchParams.append("anonymousId", `${analytics.data?.anonymousId}`);
    location.href = url.toString();
  }, [reportSignInClicked, googleSignInURL, analytics.data?.anonymousId]);

  return {
    signInWithGithub,
    signInWithGoogle,
  };
};

/**
 * Returns true if the user should be required to sign in.
 */
const useSignInRequired = () => {
  const shouldNotifySignedIn = useShouldNotifySignedIn();
  const analytics = trpc["app.analytics"].useQuery();
  const [signInRequired, setSignInRequired] = useState(false);
  useEffect(() => {
    // Skip if offline.
    if (navigator.onLine === false) {
      return;
    }

    if (analytics.data?.requireSignIn && !shouldNotifySignedIn) {
      setSignInRequired(true);
    } else {
      setSignInRequired(false);
    }
  }, [analytics.data?.requireSignIn, shouldNotifySignedIn]);
  return signInRequired;
};

export interface SignInModalProps {}

export const SignInModal = (props: SignInModalProps) => {
  const { theme } = useTheme();
  const { signInWithGithub, signInWithGoogle } = useSignIn();
  const signInRequired = useSignInRequired();
  useNotifyAfterSigningIn();

  const [githubIsLoading, setGithubIsLoading] = useState(false);
  const [googleIsLoading, setGoogleIsLoading] = useState(false);

  const isLoading = useMemo(() => {
    return githubIsLoading || googleIsLoading;
  }, [githubIsLoading, googleIsLoading]);

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

        <p className={classNames(theme.text2, "text-sm text-center")}>
          Please sign in to help us improve your experience in Wing Console and
          Wing CLI.
        </p>

        <div className="flex justify-around">
          <div className="flex flex-col gap-2.5">
            <Button
              disabled={isLoading}
              onClick={() => {
                setGithubIsLoading(true);
                void signInWithGithub();
              }}
            >
              {githubIsLoading ? (
                <Loader size="xs" />
              ) : (
                <GithubIcon className="w-4 h-4" />
              )}
              <span className="text-sm">Continue with GitHub</span>
            </Button>

            <Button
              disabled={isLoading}
              onClick={() => {
                setGoogleIsLoading(true);
                void signInWithGoogle();
              }}
            >
              {googleIsLoading ? (
                <Loader size="xs" />
              ) : (
                <GoogleIcon className="w-4 h-4" />
              )}
              <span className="text-sm">Continue with Google</span>
            </Button>
          </div>
        </div>

        <div className="flex justify-around">
          <p className={classNames(theme.text2, "text-xs")}>
            By signing up, you agree to our{" "}
            <Link href={TERMS_AND_CONDITIONS_URL} target="_blank">
              Terms and Conditions
            </Link>
            .
          </p>
        </div>
      </div>
    </Modal>
  );
};
