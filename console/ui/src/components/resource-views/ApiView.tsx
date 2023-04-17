import { useTheme } from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Button } from "../../design-system/Button.js";
import { Combobox } from "../../design-system/Combobox.js";
import {
  KeyValueList,
  useKeyValueList,
} from "../../design-system/KeyValueList.js";
import Select from "../../design-system/Select.js";
import { Tabs } from "../../design-system/Tabs.js";
import { TextArea } from "../../design-system/TextArea.js";
import { trpc } from "../../utils/trpc.js";
import { AttributeView } from "../AttributeView.js";
import { JsonResponseInput } from "../JsonResponseInput.js";
import { ResponseInput } from "../ResponseInput.js";

export interface ApiViewProps {
  resourcePath: string;
}

const HTTP_METHODS = [
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "CONNECT",
  "OPTIONS",
  "PATCH",
];

const HTTP_HEADERS = {
  accept: [
    "text/html",
    "text/plain",
    "application/json",
    "application/xml",
    "application/javascript",
    "application/octet-stream",
    "multipart/form-data",
    "application/x-www-form-urlencoded",
  ],
  "accept-charset": ["utf8", "iso-8859-1", "windows-1252"],
  "accept-encoding": ["gzip", "deflate", "br"],
  authorization: [],
  "cache-control": [
    "no-cache",
    "no-store",
    "max-age=<seconds>",
    "max-stale=<seconds>",
    "min-fresh=<seconds>",
    "only-if-cached",
  ],
  connection: ["keep-alive", "close"],
  "content-length": [],
  "content-type": [
    "application/json",
    "application/x-www-form-urlencoded",
    "multipart/form-data",
  ],
  cookie: [],
  origin: [],
  "user-agent": [],
};

const getHeaderValues = (header: string): string[] => {
  const key = header as keyof typeof HTTP_HEADERS;
  if (key in HTTP_HEADERS) {
    return HTTP_HEADERS[key];
  }
  return [];
};

const getResponseColor: (status: number) => string = (status) => {
  if (status >= 200 && status < 300) {
    return "text-green-500";
  }
  if (status >= 300 && status < 400) {
    return "text-blue-500";
  }
  if (status >= 400 && status < 500) {
    return "text-orange-500";
  }
  if (status >= 500 && status < 600) {
    return "text-red-500";
  }
  return "gray";
};

export interface ApiRoute {
  method: string;
  route: string;
}

export const ApiView = ({ resourcePath }: ApiViewProps) => {
  const theme = useTheme();

  const [url, setUrl] = useState<string>("");

  const [routes, setRoutes] = useState<ApiRoute[]>([]);
  const [currentRoute, setCurrentRoute] = useState<string>("");
  const [currentMethod, setCurrentMethod] = useState<string>("GET");
  const [body, setBody] = useState<string>("");
  const [currentHeaderKey, setCurrentHeaderKey] = useState<string>("");
  const [valuesList, setValuesList] = useState<string[]>([]);

  const [currentOptionsTab, setCurrentOptionsTab] = useState("headers");
  const [currentResponseTab, setCurrentResponseTab] = useState("body");

  const [response, setResponse] = useState<{
    status: number;
    statusText: string;
    textResponse: string;
    duration: number;
    headers: {
      key: string;
      value: string;
    }[];
  }>();

  const bodyId = useId();

  const {
    items: headers,
    addItem: addHeader,
    removeItem: removeHeader,
    editItem: editHeader,
  } = useKeyValueList();

  const {
    items: queryParameters,
    addItem: addQueryParameter,
    removeItem: removeQueryParameter,
    editItem: editQueryParameter,
    setItems: setQueryParameters,
  } = useKeyValueList();

  const {
    items: pathVariables,
    editItem: editPathVariable,
    setItems: setPathVariables,
  } = useKeyValueList();

  const apiFetch = trpc["api.fetch"].useMutation();
  const schema = trpc["api.schema"].useQuery({ resourcePath });

  const apiCall = async () => {
    if (!url || !currentMethod || !currentRoute) {
      return;
    }
    await apiFetch.mutateAsync({
      url,
      route: currentRoute,
      variables: pathVariables,
      method: currentMethod,
      headers,
      body,
    });
  };

  const openResponseTab = useCallback((tabId: string) => {
    setCurrentResponseTab(tabId);
  }, []);
  const openOptionTab = useCallback((tabId: string) => {
    setCurrentOptionsTab(tabId);
  }, []);

  useEffect(() => {
    if (!currentHeaderKey) {
      setValuesList([]);
      return;
    }
    setValuesList(getHeaderValues(currentHeaderKey));
  }, [currentHeaderKey]);

  const handleRouteChange = (value: string) => {
    const newRoute = value && !value.startsWith("/") ? `/${value}` : value;
    setCurrentRoute(newRoute);
    const search = newRoute.split(/\?(.*)/s)[1];
    const urlParameters = new URLSearchParams(search || "");

    setQueryParameters(() => {
      const newUrlParameters: {
        key: string;
        value: string;
      }[] = [];
      for (const [key, value] of urlParameters.entries()) {
        newUrlParameters.push({
          key,
          value,
        });
      }
      return newUrlParameters;
    });

    setPathVariables(() => {
      const newPathVariables: {
        key: string;
        value: string;
      }[] = [];

      const matches = newRoute.matchAll(/{(\w+)}/g) || [];
      for (const match of matches) {
        if (!match[1]) {
          continue;
        }
        newPathVariables.push({
          key: match[1],
          value: "",
        });
      }
      return newPathVariables;
    });
  };

  useEffect(() => {
    if (!currentRoute) {
      return;
    }
    const urlParameters = new URLSearchParams();
    for (const item of queryParameters) {
      urlParameters.append(item.key, item.value);
    }
    let newRoute = currentRoute.split("?")[0] || "";
    if (urlParameters.toString()) {
      newRoute = `${newRoute}?${urlParameters.toString()}`;
    }
    setCurrentRoute(newRoute);
  }, [currentRoute, queryParameters]);

  useEffect(() => {
    if (!schema.data) {
      return;
    }
    setUrl(schema.data.attrs.url);
    setRoutes(schema.data.props.routes);

    const methods = schema.data.props.routes
      .filter((item) => {
        return item.route === currentRoute;
      })
      .map((route) => route.method);
    if (methods.length > 0 && methods[0]) {
      setCurrentMethod(methods[0]);
    }
  }, [schema.data]);

  useEffect(() => {
    if (!apiFetch.data?.textResponse) {
      return;
    }
    setResponse(apiFetch.data);
  }, [apiFetch.data]);

  return (
    <div className="h-full flex-1 flex flex-col text-sm space-y-1">
      <div className="relative grow">
        <AttributeView name="URL" value={url} noLeftPadding />
        <div className="space-y-2 flex-col grow mt-4">
          <div className="flex gap-1 w-full">
            <div className="group flex grow relative gap-x-1">
              <div
                className={classNames(
                  theme.bgInput,
                  theme.textInput,
                  theme.borderInput,
                  theme.focusWithin,
                  "flex relative",
                  "text-xs w-full",
                  "border rounded",
                  "transition ease-in-out",
                )}
              >
                <Select
                  items={HTTP_METHODS.map((method) => {
                    return { label: method, value: method };
                  })}
                  value={currentMethod}
                  onChange={(method) => {
                    setCurrentMethod(method);
                  }}
                  btnClassName={classNames(
                    theme.bgInput,
                    theme.bgInputHover,
                    theme.borderInput,
                    "text-xs text-left outline-none w-[5.5rem] rounded-l",
                    "px-2.5 py-1.5",
                    "border-r",
                  )}
                  showSelected={false}
                />
                <Combobox
                  placeholder="Enter a route"
                  items={routes.map((route) => {
                    return {
                      label: `${route.method} ${route.route}`,
                      value: `${route.method} ${route.route}`,
                    };
                  })}
                  value={currentRoute}
                  onChange={(value) => {
                    const [method, route] = value.split(" ");
                    if (method && HTTP_METHODS.includes(method) && route) {
                      setCurrentMethod(method);
                      handleRouteChange(route);
                    } else {
                      handleRouteChange(value);
                    }
                  }}
                  className="w-full"
                  inputClassName={classNames(
                    "border-none focus-none text-xs outline-none w-full rounded-r",
                    "px-2.5 py-1.5",
                    "focus:ring-0",
                  )}
                  showSelected={false}
                  renderItem={(item) => {
                    const [method, route] = item.value.split(" ");
                    return (
                      <div className="flex items-center pl-2">
                        <span className="shrink-0 w-[78px]">{method}</span>
                        <span className="w-full">{route}</span>
                      </div>
                    );
                  }}
                />
              </div>
              <Button
                primary
                onClick={apiCall}
                disabled={!currentMethod || !currentRoute}
              >
                Send
              </Button>
            </div>
          </div>
          <div>
            <Tabs
              small
              tabs={[
                {
                  id: "headers",
                  name: "Headers",
                  count: headers.length,
                  panel: (
                    <div className="pt-2">
                      <KeyValueList
                        items={headers}
                        onAddItem={addHeader}
                        onRemoveItem={removeHeader}
                        onEditItem={editHeader}
                        disabled={apiFetch.isLoading}
                        keysList={Object.keys(HTTP_HEADERS)}
                        valuesList={valuesList}
                        onKeyChange={setCurrentHeaderKey}
                      />
                    </div>
                  ),
                },
                {
                  id: "params",
                  name: "Params",
                  count: queryParameters.length + pathVariables.length,
                  panel: (
                    <div className="pt-2 space-y-2">
                      <div className="space-y-1">
                        {pathVariables.length > 0 && (
                          <div className={classNames("text-sm", theme.text2)}>
                            Query params
                          </div>
                        )}
                        <KeyValueList
                          items={queryParameters}
                          onAddItem={addQueryParameter}
                          onRemoveItem={removeQueryParameter}
                          onEditItem={editQueryParameter}
                          disabled={apiFetch.isLoading}
                        />
                      </div>
                      {pathVariables.length > 0 && (
                        <div className="space-y-1">
                          <div className={classNames("text-sm", theme.text2)}>
                            Path variables
                          </div>
                          <KeyValueList
                            items={pathVariables}
                            onEditItem={editPathVariable}
                            disabled={apiFetch.isLoading}
                            keyDisabled={true}
                          />
                        </div>
                      )}
                    </div>
                  ),
                },

                {
                  id: "body",
                  name: `Body`,
                  panel: (
                    <div className="pt-2">
                      <TextArea
                        id={bodyId}
                        containerClassName="w-full"
                        className="text-sm min-h-[2rem]"
                        placeholder="Body..."
                        value={body}
                        onInput={(event) => setBody(event.currentTarget.value)}
                      />
                    </div>
                  ),
                },
              ]}
              currentTabId={currentOptionsTab}
              onTabChange={openOptionTab}
              transparent
            />
          </div>
          <div>
            <span className={classNames(theme.text2, "font-medium")}>
              Response
            </span>
            <div className="mt-1">
              <Tabs
                small
                tabs={[
                  {
                    id: "body",
                    name: "Body",
                    panel: (
                      <div className="pt-2 relative">
                        {response && (
                          <div
                            className={classNames(
                              "gap-x-1 truncate items-center absolute -top-[12px] right-[2px] max-w-full z-10",
                            )}
                          >
                            <span
                              className={classNames(
                                getResponseColor(response.status),
                                "text-xs ml-1 truncate",
                              )}
                            >
                              {response.status} {response.statusText}
                            </span>
                            {response.duration >= 0 && (
                              <span
                                className={classNames(
                                  theme.text2,
                                  "text-xs ml-1 truncate",
                                )}
                              >
                                {response.duration}ms
                              </span>
                            )}
                          </div>
                        )}
                        <JsonResponseInput
                          value={response?.textResponse || ""}
                          loading={apiFetch.isLoading}
                          placeholder="No response"
                          json={true}
                        />
                      </div>
                    ),
                  },
                  {
                    id: "headers",
                    name: "Headers",
                    panel: (
                      <div className="pt-2">
                        <ResponseInput
                          empty={!response?.headers}
                          loading={apiFetch.isLoading}
                        >
                          <KeyValueList
                            items={response?.headers || []}
                            readonly
                          />
                        </ResponseInput>
                      </div>
                    ),
                  },
                ]}
                currentTabId={currentResponseTab}
                onTabChange={openResponseTab}
                transparent
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
