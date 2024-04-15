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
import type { OpenApiSpec } from "@wingconsole/server/src/wingsdk.js";
import { createPersistentState } from "@wingconsole/use-persistent-state";
import classNames from "classnames";
import { memo, useCallback, useEffect, useId, useState } from "react";

import type { AppMode } from "../AppContext.js";
import type { ApiRequest, ApiResponse, ApiRoute } from "../shared/api.js";
import {
  getParametersFromOpenApi,
  getHeaderValues,
  getRoutesFromOpenApi,
  HTTP_HEADERS,
  HTTP_METHODS,
  getRequestBodyFromOpenApi,
} from "../shared/api.js";

import { ApiResponseBodyPanel } from "./api-response-body-panel.js";
import { ApiResponseHeadersPanel } from "./api-response-headers-panel.js";

export interface ApiInteractionProps {
  resourceId: string;
  appMode?: AppMode;
  apiResponse?: ApiResponse;
  url: string;
  openApiSpec: OpenApiSpec;
  callFetch: (data: ApiRequest) => void;
  isLoading: boolean;
}

export const ApiInteraction = memo(
  ({
    resourceId,
    appMode,
    apiResponse,
    callFetch,
    url,
    openApiSpec,
    isLoading,
  }: ApiInteractionProps) => {
    const { theme } = useTheme();

    const { usePersistentState } = createPersistentState(resourceId);

    const [routes, setRoutes] = useState<ApiRoute[]>([]);

    const [currentHeaderKey, setCurrentHeaderKey] = usePersistentState("");
    const [currentHeaderValues, setCurrentHeaderValues] = useState<string[]>(
      [],
    );
    const [currentRoute, setCurrentRoute] = usePersistentState("");

    const [currentMethod, setCurrentMethod] = usePersistentState("GET");

    const bodyId = useId();
    const [bodyPlaceholder, setBodyPlaceholder] = useState<
      string | undefined
    >();
    const [body, setBody] = usePersistentState("");

    const [currentOptionsTab, setCurrentOptionsTab] =
      usePersistentState("headers");
    const [currentResponseTab, setCurrentResponseTab] =
      usePersistentState("body");

    const {
      items: headers,
      addItem: addHeader,
      removeItem: removeHeader,
      editItem: editHeader,
      setItems: setHeaders,
    } = useKeyValueList({
      useState: usePersistentState,
    });

    const {
      items: queryParameters,
      addItem: addQueryParameter,
      removeItem: removeQueryParameter,
      editItem: editQueryParameter,
      setItems: setQueryParameters,
    } = useKeyValueList({
      useState: usePersistentState,
    });

    const {
      items: pathVariables,
      editItem: editPathVariable,
      setItems: setPathVariables,
    } = useKeyValueList({
      useState: usePersistentState,
    });

    // TODO revisit
    const openResponseTab = useCallback(
      (tabId: string) => {
        setCurrentResponseTab(tabId);
      },
      [setCurrentResponseTab],
    );

    const openOptionTab = useCallback(
      (tabId: string) => {
        setCurrentOptionsTab(tabId);
      },
      [setCurrentOptionsTab],
    );

    const apiCall = useCallback(async () => {
      if (!url || !currentMethod || !currentRoute) {
        return;
      }
      callFetch({
        url,
        route: currentRoute,
        variables: pathVariables.map((variable) => {
          return {
            key: variable.key,
            value: variable.value ?? "",
          };
        }),
        method: currentMethod,
        headers: headers.map((header) => {
          return {
            key: header.key,
            value: header.value ?? "",
          };
        }),
        body,
      });
    }, [
      url,
      currentMethod,
      currentRoute,
      callFetch,
      pathVariables,
      headers,
      body,
    ]);

    const loadDataFromOpenApi = useCallback(
      (path: string, method: string) => {
        // Set the headers
        const headersFromSpec = getParametersFromOpenApi({
          path: path,
          method: method,
          openApi: openApiSpec,
          type: "header",
        });
        const newHeaders = headersFromSpec.filter(
          (header) =>
            !headers.some(
              (existingHeader) => existingHeader.key === header.key,
            ),
        );
        setHeaders((headers) => [...headers, ...newHeaders]);

        // Set Query Parameters
        const queryParametersFromSpec = getParametersFromOpenApi({
          path: path,
          method: method,
          openApi: openApiSpec,
          type: "query",
        });
        const newQueryParameters = queryParametersFromSpec.filter(
          (parameter) =>
            !queryParameters.some(
              (existingParameter) => existingParameter.key === parameter.key,
            ),
        );

        setQueryParameters((queryParameters) => [
          ...queryParameters,
          ...newQueryParameters,
        ]);

        // Set Path Variables
        const variablesFromSpec = getParametersFromOpenApi({
          path: path,
          method: method,
          openApi: openApiSpec,
          type: "path",
        });
        const newPathVariables = variablesFromSpec.filter(
          (variable) =>
            !pathVariables.some(
              (existingVariable) => existingVariable.key === variable.key,
            ),
        );
        setPathVariables((pathVariables) => [
          ...pathVariables,
          ...newPathVariables,
        ]);

        // Set the body
        const bodyFromSpec = getRequestBodyFromOpenApi(
          path,
          method,
          openApiSpec,
        );
        setBodyPlaceholder(JSON.stringify(bodyFromSpec, undefined, 2));
      },
      [
        openApiSpec,
        setHeaders,
        setBodyPlaceholder,
        setQueryParameters,
        setPathVariables,
        queryParameters,
        pathVariables,
        headers,
      ],
    );

    const handleMethodChange = useCallback(
      (route: string, method: string) => {
        setCurrentMethod(method);
        loadDataFromOpenApi(route, method);
      },
      [setCurrentMethod, loadDataFromOpenApi],
    );

    const handleRouteChange = useCallback(
      (value: string) => {
        let [method, route] = value.split(" ");
        if (!route) {
          method = currentMethod;
          route = value;
        }

        const newRoute = route && !route.startsWith("/") ? `/${route}` : route;
        setCurrentRoute(newRoute);

        const search = newRoute.split(/\?(.*)/s)[1];
        const urlParameters = new URLSearchParams(search || "");

        const path = newRoute.split(/\?(.*)/s)[0] || "";

        const isListedRoute = routes.some(
          (item) => item.route === path && item.method === method,
        );

        if (!isListedRoute) {
          setHeaders([]);
          setBody("");
          setBodyPlaceholder(undefined);
          setPathVariables([]);
          setQueryParameters([]);
        }

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

        if (isListedRoute && method) {
          handleMethodChange(path, method);
        }
      },
      [
        setHeaders,
        routes,
        setBody,
        setCurrentRoute,
        currentMethod,
        setPathVariables,
        setQueryParameters,
        handleMethodChange,
      ],
    );

    const loadRoutesFromOpenApi = useCallback(() => {
      const routes = getRoutesFromOpenApi(openApiSpec);
      setRoutes(routes);

      if (!currentMethod) {
        const methods = routes
          .filter((item) => {
            return item.route === currentRoute;
          })
          .map((route) => route.method);
        handleMethodChange(currentRoute, methods[0] ?? "GET");
      }
    }, [
      openApiSpec,
      currentMethod,
      currentRoute,
      setRoutes,
      handleMethodChange,
    ]);

    // Load the routes from the OpenAPI spec
    useEffect(() => {
      loadRoutesFromOpenApi();
    }, [openApiSpec, loadRoutesFromOpenApi]);

    // Load the possible values for the current header key
    useEffect(() => {
      if (!currentHeaderKey) {
        setCurrentHeaderValues([]);
        return;
      }
      setCurrentHeaderValues(getHeaderValues(currentHeaderKey));
    }, [currentHeaderKey]);

    // Sync the query parameters with the current route.
    useEffect(() => {
      if (!currentRoute) {
        return;
      }
      const urlParameters = new URLSearchParams();
      for (const item of queryParameters) {
        urlParameters.append(item.key, item.value ?? "");
      }
      let newRoute = currentRoute.split("?")[0] || "";
      if (urlParameters.toString()) {
        newRoute = `${newRoute}?${urlParameters.toString()}`;
      }
      setCurrentRoute(newRoute);
    }, [currentRoute, queryParameters, setCurrentRoute]);

    // TODO: Refactor inline functions below. For example, with `useCallback` or with additional memo components.
    return (
      <div className="h-full flex-1 flex flex-col text-sm space-y-1">
        <div className="relative grow">
          {appMode === "local" && (
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
                    onChange={(value) =>
                      handleMethodChange(currentRoute, value)
                    }
                    btnClassName={classNames(
                      theme.bgInput,
                      theme.bgInputHover,
                      theme.borderInput,
                      "text-xs text-left outline-none w-[5.5rem] rounded-l",
                      "px-2.5 py-1.5",
                      "border-r",
                    )}
                    showSelected={false}
                    dataTestid="cloud.api:method"
                  />
                  <Combobox
                    placeholder="Enter a route"
                    items={routes.map((route) => {
                      return {
                        label: `${route.method} ${route.route}`,
                        value: `${route.method} ${route.route}`,
                      };
                    })}
                    filter={false}
                    value={currentRoute}
                    onChange={handleRouteChange}
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
                        <div
                          className="flex items-center pl-2"
                          data-testid={`cloud.api:route-${route}`}
                        >
                          <span className="shrink-0 w-[78px]">{method}</span>
                          <span className="w-full">{route}</span>
                        </div>
                      );
                    }}
                    dataTestid="cloud.api:route"
                  />
                </div>
                <Button
                  primary
                  onClick={apiCall}
                  disabled={!currentMethod || !currentRoute}
                  dataTestid="cloud.api:send"
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
                          valuesList={currentHeaderValues}
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
                    name: `Body ${body || bodyPlaceholder ? "*" : ""}`,
                    panel: (
                      <div className="pt-2">
                        <TextArea
                          id={bodyId}
                          containerClassName="w-full"
                          className="text-sm min-h-[6rem]"
                          placeholder={bodyPlaceholder ?? "Body..."}
                          value={body}
                          onInput={(event) =>
                            setBody(event.currentTarget.value)
                          }
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
                          dataTestid="cloud.api:response-body"
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
  },
);
