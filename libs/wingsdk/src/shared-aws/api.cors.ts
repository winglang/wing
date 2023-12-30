import * as cloud from "../cloud";

/**
 * DEFAULT_RESPONSE is a constant that defines the default response when a request occurs.
 * It is used to handle all requests that do not match any defined routes in the API Gateway.
 * The response is a mock integration type, which means it returns a mocked response without
 * forwarding the request to any backend. The response status code is set to 200 for OPTIONS
 * and 404 for any other method. The Content-Type header is set to 'application/json'.
 * @internal
 */
export const API_CORS_DEFAULT_RESPONSE = (
  corsOptions?: cloud.ApiCorsOptions
) => {
  if (corsOptions) {
    return {
      "/{proxy+}": {
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
      "/{proxy+}": {
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

/**
 * Mock API to inject instead of OPTIONS in each path
 */
export const corsOptionsMethod = (corsOptions: cloud.ApiCorsOptions) => ({
  "x-amazon-apigateway-integration": {
    type: "mock",
    passthroughBehavior: "never",
    requestTemplates: {
      "application/json": `{"statusCode": 204}`,
    },
    responses: {
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
  },
});
