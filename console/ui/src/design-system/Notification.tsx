import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { nanoid } from "nanoid";
import {
  createContext,
  Fragment,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface Notification {
  title: string;
  body?: string;
  id: string;
  show: boolean;
  type?: "success" | "error";
  autoCloseTimeoutId?: ReturnType<typeof setTimeout>;
}

interface NotificationsContext {
  notifications: Notification[];
  showNotification(
    title: string,
    options?: {
      body?: string;
      autoCloseDelayMs?: number;
      type?: "success" | "error";
    },
  ): void;
  closeNotification(notificationId: string): void;
  removeNotification(notificationId: string): void;
}

const Context = createContext<NotificationsContext | undefined>(undefined);

function usePrivateNotifications() {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "Notifications context not found. Please, use the <NotificationsProvider> first.",
    );
  }

  return context;
}

export function useNotifications() {
  const { notifications, showNotification, closeNotification } =
    usePrivateNotifications();
  return { notifications, showNotification, closeNotification };
}

function NotificationsContainer() {
  const { theme } = useTheme();
  const { notifications, closeNotification, removeNotification } =
    usePrivateNotifications();

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-10"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          {notifications.map((notification) => (
            <Transition
              key={notification.id}
              show={notification.show}
              appear
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => {
                removeNotification(notification.id);
              }}
            >
              <div
                className={classNames(
                  theme.bgInput,
                  "max-w-sm w-full shadow-lg rounded-lg",
                  "pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden",
                )}
              >
                <div className="p-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {notification.type === "error" ? (
                        <ExclamationCircleIcon
                          className={"h-6 w-6 text-red-400"}
                          aria-hidden="true"
                        />
                      ) : (
                        <CheckCircleIcon
                          className="h-6 w-6 text-green-400"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p
                        className={classNames(
                          theme.textInput,
                          "text-sm font-medium",
                        )}
                      >
                        {notification.title}
                      </p>
                      {notification.body && (
                        <p className={classNames("mt-1 text-sm", theme.text2)}>
                          {notification.body}
                        </p>
                      )}
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button
                        type="button"
                        className={classNames(
                          theme.text2,
                          theme.text4Hover,
                          theme.focusInput,
                          "rounded-md inline-flex",
                        )}
                        onClick={() => {
                          closeNotification(notification.id);
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XCircleIcon
                          className={classNames("h-5 w-5")}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          ))}
        </div>
      </div>
    </>
  );
}

export function NotificationsProvider(props: PropsWithChildren) {
  const { children } = props;
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { closeNotification, showNotification, removeNotification } =
    useMemo(() => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const closeNotification = (notificationId: string) => {
        setNotifications((previousNotifications) => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const notifications = [...previousNotifications];

          const notificationIndex = notifications.findIndex(
            (notification) => notification.id === notificationId,
          );
          if (notificationIndex === -1) {
            return previousNotifications;
          }

          const notification = notifications[notificationIndex];
          if (notification) {
            notification.show = false;
            clearTimeout(notification.autoCloseTimeoutId);
          }
          return notifications;
        });
      };

      // eslint-disable-next-line @typescript-eslint/no-shadow
      const showNotification = (
        title: string,
        options?: {
          body?: string;
          autoCloseDelayMs?: number;
          type?: "success" | "error";
        },
      ) => {
        setNotifications((previousNotifications) => {
          const notificationId = nanoid();
          const autoCloseDelayMs = options?.autoCloseDelayMs ?? 3000;
          return [
            ...previousNotifications,
            {
              id: notificationId,
              title,
              type: options?.type ?? "success",
              body: options?.body,
              show: true,
              autoCloseTimeoutId: setTimeout(
                () => closeNotification(notificationId),
                autoCloseDelayMs,
              ),
            },
          ];
        });
      };

      // eslint-disable-next-line @typescript-eslint/no-shadow
      const removeNotification = (notificationId: string) => {
        setNotifications((previousNotifications) => {
          return previousNotifications.filter(
            ({ id }) => id !== notificationId,
          );
        });
      };

      return {
        closeNotification,
        showNotification,
        removeNotification,
      };
    }, []);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setNotifications((notifications) => {
        for (const notification of notifications) {
          clearTimeout(notification.autoCloseTimeoutId);
        }

        return notifications;
      });
    };
  }, []);

  return (
    <Context.Provider
      value={{
        notifications,
        showNotification,
        closeNotification,
        removeNotification,
      }}
    >
      {children}
      <NotificationsContainer />
    </Context.Provider>
  );
}
