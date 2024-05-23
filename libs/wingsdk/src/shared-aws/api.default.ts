import * as cloud from "../cloud";

/**
 * `createApiDefaultResponse` is a function that defines the default response when a request occurs.
 * It is used to handle all requests that do not match any defined routes in the API Gateway.
 * The response is a mock integration type, which means it returns a mocked response without
 * forwarding the request to any backend. The response status code is set to 204 for OPTIONS
 * and 404 for any other HTTP method. The Content-Type header is set to `application/json`.
 * @internal
 */
export const createApiDefaultResponse = (
  paths: string[],
  corsOptions?: cloud.ApiCorsOptions
) => {
  const defaultKey =
    // the longest a sequence of parameters starts form the root
    paths.reduce((result: string, key: string) => {
      // matches single sequence of parameters starts form the root
      let matched = key.match(/^(\/{[A-Za-z0-9\-_]+})*/g)?.[0] ?? "";
      return matched.length > result.length ? matched : result;
    }, "") + "/{proxy+}";

  if (corsOptions) {
    return {
      [defaultKey]: {
        "x-amazon-apigateway-any-method": {
          produces: ["application/json"],
          "x-amazon-apigateway-integration": {
            type: "mock",
            requestTemplates: {
              "application/json": `
                #if ($context.httpMethod == "OPTIONS")
                    {"statusCode": 204}
                #else
                    {"statusCode": 404}
                #end
              `,
            },
            passthroughBehavior: "never",
            responses: {
              default: {
                statusCode: "404",
                responseParameters: {
                  "method.response.header.Content-Type": "'application/json'",
                },
                responseTemplates: {
                  "application/json":
                    '{"statusCode": 404, "message": "Error: Resource not found"}',
                },
              },
              "204": {
                statusCode: "204",
                responseParameters: {
                  "method.response.header.Content-Type": "'application/json'",
                  "method.response.header.Access-Control-Allow-Origin": `'${corsOptions.allowOrigin}'`,
                  "method.response.header.Access-Control-Allow-Methods": `'${corsOptions.allowMethods}'`,
                  "method.response.header.Access-Control-Allow-Headers": `'${corsOptions.allowHeaders}'`,
                },
                responseTemplates: {
                  "application/json": "{}",
                },
              },
              "404": {
                statusCode: "404",
                responseParameters: {
                  "method.response.header.Content-Type": "'application/json'",
                },
                responseTemplates: {
                  "application/json":
                    '{"statusCode": 404, "message": "Error: Resource not found"}',
                },
              },
            },
          },
          responses: {
            204: {
              description: "204 response",
              headers: {
                "Content-Type": {
                  type: "string",
                },
                "Access-Control-Allow-Origin": {
                  type: "string",
                },
                "Access-Control-Allow-Methods": {
                  type: "string",
                },
                "Access-Control-Allow-Headers": {
                  type: "string",
                },
              },
            },
            404: {
              description: "404 response",
              headers: {
                "Content-Type": {
                  type: "string",
                },
              },
            },
          },
        },
      },
    };
  } else {
    return {
      [defaultKey]: {
        "x-amazon-apigateway-any-method": {
          produces: ["application/json"],
          "x-amazon-apigateway-integration": {
            type: "mock",
            requestTemplates: {
              "application/json": `
                {"statusCode": 404}
              `,
            },
            passthroughBehavior: "never",
            responses: {
              default: {
                statusCode: "404",
                responseParameters: {
                  "method.response.header.Content-Type": "'application/json'",
                },
                responseTemplates: {
                  "application/json":
                    '{"statusCode": 404, "message": "Error: Resource not found"}',
                },
              },
              "404": {
                statusCode: "404",
                responseParameters: {
                  "method.response.header.Content-Type": "'application/json'",
                },
                responseTemplates: {
                  "application/json":
                    '{"statusCode": 404, "message": "Error: Resource not found"}',
                },
              },
            },
          },
          responses: {
            404: {
              description: "404 response",
              headers: {
                "Content-Type": {
                  type: "string",
                },
              },
            },
          },
        },
      },
    };
  }
};
