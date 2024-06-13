import type { OpenApiSpec } from "@wingconsole/server/src/wingsdk";

export const HTTP_METHODS = [
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "CONNECT",
  "OPTIONS",
  "PATCH",
];

export const HTTP_HEADERS = {
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

export interface ApiResponseHeader {
  key: string;
  value: string;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  textResponse: string;
  duration: number;
  headers: ApiResponseHeader[];
}

export interface ApiRequest {
  url: string;
  route: string;
  variables: { value: string; key: string }[];
  method: string;
  headers: { value: string; key: string }[];
  body: string;
}

export interface ApiRoute {
  method: string;
  route: string;
}

export const getHeaderValues = (header: string): string[] => {
  const key = header as keyof typeof HTTP_HEADERS;
  if (key in HTTP_HEADERS) {
    return HTTP_HEADERS[key];
  }
  return [];
};

export const getRoutesFromOpenApi = (openApi: OpenApiSpec): ApiRoute[] => {
  let routes: ApiRoute[] = [];

  if (!openApi?.paths) {
    return routes;
  }

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

export interface Parameter {
  key: string;
  value: string;
  type: string;
  required: boolean;
  description?: string;
}

export interface GetParametersFromOpenApiProps {
  path: string;
  method?: string;
  openApi: OpenApiSpec;
  type: "query" | "header" | "path";
}

export const getParametersFromOpenApi = ({
  path,
  method = "",
  openApi,
  type,
}: GetParametersFromOpenApiProps): Parameter[] => {
  try {
    if (!openApi?.paths[path]) {
      return [];
    }
    const pathParameters = openApi.paths[path].parameters;
    const methodParameters =
      openApi.paths[path][method.toLowerCase()]?.parameters;

    const parametersList = [
      ...(pathParameters || []),
      ...(methodParameters || []),
    ];

    let parameters = [];
    for (const parameter of parametersList) {
      if (parameter.in === type) {
        const required = parameter.required || false;
        const type = parameter.schema?.type || "string";
        parameters.push({
          key: parameter.name,
          value: "",
          type: type as string,
          required: required,
          description: parameter.description,
        });
      }
    }

    return parameters;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getRequestBodyFromOpenApi = (
  path: string,
  method: string,
  openApi: OpenApiSpec,
): Record<string, string> | undefined => {
  try {
    const requestBody =
      openApi?.paths[path]?.[method.toLowerCase()]?.requestBody;
    if (!requestBody) {
      return undefined;
    }

    const jsonContentType = requestBody.content?.["application/json"];
    if (!jsonContentType) {
      return undefined;
    }

    const schema = jsonContentType.schema;
    if (!schema) {
      return undefined;
    }

    const bodyProperties = schema.properties;

    let response = {} as Record<string, string>;
    for (const key in bodyProperties) {
      const type = bodyProperties[key].type;
      const required = schema.required?.includes(key) ? "required" : "optional";
      const description = bodyProperties[key].description;
      response[key] = `${type} (${required}) ${
        description ? `- ${description}` : ""
      }`;
    }

    return response;
  } catch (error) {
    console.log(error);
    return {};
  }
};
