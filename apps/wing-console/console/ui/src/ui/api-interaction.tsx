import {
  Attribute,
  Button,
  Combobox,
  KeyValueList,
  Select,
  Tabs,
  TextArea,
  useKeyValueList,
  useTheme,
} from "@wingconsole/design-system";
import classNames from "classnames";
import { useCallback, useEffect, useId, useState } from "react";

import { AppMode } from "../AppContext.js";
import {
  ApiRequest,
  ApiResponse,
  ApiRoute,
  getHeaderValues,
  getRoutesFromOpenApi,
  HTTP_HEADERS,
  HTTP_METHODS,
} from "../shared/api.js";

import { ApiResponseBodyPanel } from "./api-response-body-panel.js";
import { ApiResponseHeadersPanel } from "./api-response-headers-panel.js";

export interface ApiInteractionProps {
  appMode: AppMode;
  apiResponse?: ApiResponse;
  schemaData: any;
  callFetch: (data: ApiRequest) => void;
  isLoading: boolean;
}

export const ApiInteraction = ({
  appMode,
  apiResponse,
  callFetch,
  schemaData,
  isLoading,
}: ApiInteractionProps) => {
  const { theme } = useTheme();
  const bodyId = useId();

  const [url, setUrl] = useState<string>("");
  const [routes, setRoutes] = useState<ApiRoute[]>([]);
  const [currentRoute, setCurrentRoute] = useState<string>("");
  const [currentMethod, setCurrentMethod] = useState<string>("GET");
  const [body, setBody] = useState<string>("");
  const [currentHeaderKey, setCurrentHeaderKey] = useState<string>("");
  const [valuesList, setValuesList] = useState<string[]>([]);

  const [currentOptionsTab, setCurrentOptionsTab] = useState("headers");
  const [currentResponseTab, setCurrentResponseTab] = useState("body");

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
    removeAllHeaders();
    removeAllQueryParameters();
    removeAllPathVariables();
  };

  const apiCall = useCallback(async () => {
    if (!url || !currentMethod || !currentRoute) {
      return;
    }
    await callFetch({
      url,
      route: currentRoute,
      variables: pathVariables,
      method: currentMethod,
      headers,
      body,
    });
  }, [url, currentRoute, pathVariables, currentMethod, headers, body]);

  // TODO revisit
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
    if (!schemaData) {
      return;
    }
    resetApiState();
    setUrl(schemaData.url);
    const routes = getRoutesFromOpenApi(schemaData.openApiSpec);
    setRoutes(routes);
    const methods = routes
      .filter((item) => {
        return item.route === currentRoute;
      })
      .map((route) => route.method);
    if (methods.length > 0 && methods[0]) {
      setCurrentMethod(methods[0]);
    }
  }, [schemaData]);

  return (
    <div className="h-full flex-1 flex flex-col text-sm space-y-1">
      <div className="relative grow">
        {appMode !== "webapp" && (
          <Attribute name="URL" value={url} noLeftPadding />
        )}
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
                        disabled={isLoading}
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
                          disabled={isLoading}
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
                            disabled={isLoading}
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
                        response={apiResponse}
                        isLoading={isLoading}
                      />
                    ),
                  },
                  {
                    id: "headers",
                    name: "Headers",
                    panel: (
                      <ApiResponseHeadersPanel
                        headers={apiResponse?.headers ?? []}
                        isLoading={isLoading}
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
