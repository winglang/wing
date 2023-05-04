import { useTheme } from "@wingconsole/design-system";
import { OpenApiSpec } from "@wingconsole/server/src/wingsdk.js";
import classNames from "classnames";
import { useCallback, useEffect, useId, useState } from "react";

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

import { ApiResponse, HTTP_HEADERS, HTTP_METHODS } from "./api-helper.js";
import { ApiResponseBodyPanel } from "./ApiResponseBodyPanel.js";
import { ApiResponseHeadersPanel } from "./ApiResponseHeadersPanel.js";

export interface ApiViewProps {
  resourcePath: string;
}

const getHeaderValues = (header: string): string[] => {
  const key = header as keyof typeof HTTP_HEADERS;
  if (key in HTTP_HEADERS) {
    return HTTP_HEADERS[key];
  }
  return [];
};

export interface ApiRoute {
  method: string;
  route: string;
}

const getRoutesFromOpenApi = (openApi: OpenApiSpec): ApiRoute[] => {
  let routes: ApiRoute[] = [];
  for (const route of Object.keys(openApi.paths)) {
    const methods = Object.keys(openApi.paths[route]);
    for (const method of methods) {
      routes.push({
        method: method.replace(/^\//, "").toUpperCase(),
        route,
      });
    }
  }
  return routes;
};

export const ApiView = ({ resourcePath }: ApiViewProps) => {
  const { theme } = useTheme();

  const [url, setUrl] = useState<string>("");

  const [routes, setRoutes] = useState<ApiRoute[]>([]);
  const [currentRoute, setCurrentRoute] = useState<string>("");
  const [currentMethod, setCurrentMethod] = useState<string>("GET");
  const [body, setBody] = useState<string>("");
  const [currentHeaderKey, setCurrentHeaderKey] = useState<string>("");
  const [valuesList, setValuesList] = useState<string[]>([]);

  const [currentOptionsTab, setCurrentOptionsTab] = useState("headers");
  const [currentResponseTab, setCurrentResponseTab] = useState("body");

  const [response, setResponse] = useState<ApiResponse>();

  const bodyId = useId();

  const {
    items: headers,
    addItem: addHeader,
    removeItem: removeHeader,
    editItem: editHeader,
    removeAll: removeAllHeaders,
  } = useKeyValueList();

  const {
    items: queryParameters,
    addItem: addQueryParameter,
    removeItem: removeQueryParameter,
    editItem: editQueryParameter,
    setItems: setQueryParameters,
    removeAll: removeAllQueryParameters,
  } = useKeyValueList();

  const {
    items: pathVariables,
    editItem: editPathVariable,
    setItems: setPathVariables,
    removeAll: removeAllPathVariables,
  } = useKeyValueList();

  const resetApiState = () => {
    setCurrentRoute("");
    setCurrentMethod("GET");
    setBody("");
    setCurrentHeaderKey("");
    setValuesList([]);
    setResponse(undefined);
    removeAllHeaders();
    removeAllQueryParameters();
    removeAllPathVariables();
  };

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
    resetApiState();
    setUrl(schema.data.url);
    const routes = getRoutesFromOpenApi(schema.data.openApiSpec);
    setRoutes(routes);
    const methods = routes
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
                      <ApiResponseBodyPanel
                        response={response}
                        isLoading={apiFetch.isLoading}
                      />
                    ),
                  },
                  {
                    id: "headers",
                    name: "Headers",
                    panel: (
                      <ApiResponseHeadersPanel
                        headers={response?.headers ?? []}
                        isLoading={apiFetch.isLoading}
                      />
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
