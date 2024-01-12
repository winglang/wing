import { ResourceIcon } from "@wingconsole/design-system";
import { ExplorerItem } from "@wingconsole/server";
import { useCallback, useEffect } from "react";

import { TreeMenuItem, useTreeMenuItems } from "../ui/use-tree-menu-items.js";

import { trpc } from "./trpc.js";

const createTreeMenuItemFromExplorerTreeItem = (
  item: ExplorerItem,
): TreeMenuItem => {
  return {
    id: item.id,
    label: item.label,
    icon: item.type ? (
      <ResourceIcon
        resourceType={item.type}
        resourcePath={item.id}
        className="w-4 h-4"
      />
    ) : undefined,
    children: item.childItems?.map((item) =>
      createTreeMenuItemFromExplorerTreeItem(item),
    ),
  };
};

const tree = {
  data: {
    id: "root",
    label: "root",
    type: "@winglang/sdk.core.App",
    childItems: [
      {
        id: "root/Default/SegmentAnalytics.SegmentAnalytics",
        label: "SegmentAnalytics.SegmentAnalytics",
        type: "@winglang/sdk.std.Resource",
        display: {},
      },
      {
        id: "root/Default/cloud.Api",
        label: "cloud.Api",
        type: "@winglang/sdk.cloud.Api",
        display: {
          title: "Api",
          description: "A REST API endpoint",
        },
        childItems: [
          {
            id: "root/Default/cloud.Api/Endpoint",
            label: "Endpoint",
            type: "@winglang/sdk.cloud.Endpoint",
            display: {
              title: "Endpoint",
              description: "Endpoint for Api root/Default/cloud.Api",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler0",
            label: "GET /wrpc/auth.check",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "GET /wrpc/auth.check",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler1",
            label: "POST /wrpc/auth.signOut",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "POST /wrpc/auth.signOut",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler2",
            label: "GET /wrpc/github.callback",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "GET /wrpc/github.callback",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler3",
            label: "GET /wrpc/github.listInstallations",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "GET /wrpc/github.listInstallations",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler4",
            label: "GET /wrpc/github.listRepositories",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "GET /wrpc/github.listRepositories",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler5",
            label: "GET /wrpc/github.getRepository",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "GET /wrpc/github.getRepository",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler6",
            label: "GET /wrpc/github.getPullRequest",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "GET /wrpc/github.getPullRequest",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler7",
            label: "POST /wrpc/app.create",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "POST /wrpc/app.create",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler8",
            label: "GET /wrpc/app.list",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "GET /wrpc/app.list",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler9",
            label: "POST /wrpc/app.delete",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "POST /wrpc/app.delete",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler10",
            label: "GET /wrpc/app.getByName",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "GET /wrpc/app.getByName",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler11",
            label: "GET /wrpc/app.listEnvironments",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "GET /wrpc/app.listEnvironments",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler12",
            label: "GET /wrpc/app.environment",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "GET /wrpc/app.environment",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler13",
            label: "GET /wrpc/app.listSecrets",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "GET /wrpc/app.listSecrets",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler14",
            label: "POST /wrpc/app.decryptSecret",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "POST /wrpc/app.decryptSecret",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler15",
            label: "POST /wrpc/app.createSecret",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "POST /wrpc/app.createSecret",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler16",
            label: "POST /wrpc/app.deleteSecret",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "POST /wrpc/app.deleteSecret",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler17",
            label: "GET /wrpc/app.listEntrypoints",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "GET /wrpc/app.listEntrypoints",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler18",
            label: "POST /wrpc/app.updateEntrypoint",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "POST /wrpc/app.updateEntrypoint",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler19",
            label: "GET /wrpc/app.environment.logs",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "GET /wrpc/app.environment.logs",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler20",
            label: "GET /wrpc/app.environment.endpoints",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "GET /wrpc/app.environment.endpoints",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
          {
            id: "root/Default/cloud.Api/OnRequestHandler21",
            label: "POST /environment.report",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "POST /environment.report",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
        ],
      },
      {
        id: "root/Default/parameter.Parameter",
        label: "parameter.Parameter",
        type: "@winglang/sdk.std.Resource",
        display: {},
        childItems: [
          {
            id: "root/Default/parameter.Parameter/sim.Parameter",
            label: "sim.Parameter",
            type: "@winglang/sdk.std.Resource",
            display: {},
            childItems: [
              {
                id: "root/Default/parameter.Parameter/sim.Parameter/cloud.Bucket",
                label: "cloud.Bucket",
                type: "@winglang/sdk.cloud.Bucket",
                display: {
                  title: "Bucket",
                  description: "A cloud object store",
                },
              },
            ],
          },
        ],
      },
      {
        id: "root/Default/ex.DynamodbTable",
        label: "ex.DynamodbTable",
        type: "@winglang/sdk.ex.DynamodbTable",
        display: {
          title: "DynamodbTable",
          description: "A DynamoDb Table",
        },
      },
      {
        id: "root/Default/Apps.Apps",
        label: "Apps.Apps",
        type: "@winglang/sdk.std.Resource",
        display: {},
      },
      {
        id: "root/Default/Users.Users",
        label: "Users.Users",
        type: "@winglang/sdk.std.Resource",
        display: {},
      },
      {
        id: "root/Default/Environments.Environments",
        label: "Environments.Environments",
        type: "@winglang/sdk.std.Resource",
        display: {},
      },
      {
        id: "root/Default/Secrets.Secrets",
        label: "Secrets.Secrets",
        type: "@winglang/sdk.std.Resource",
        display: {},
        childItems: [
          {
            id: "root/Default/Secrets.Secrets/ex.DynamodbTable",
            label: "ex.DynamodbTable",
            type: "@winglang/sdk.ex.DynamodbTable",
            display: {
              title: "DynamodbTable",
              description: "A DynamoDb Table",
            },
          },
          {
            id: "root/Default/Secrets.Secrets/crypto.Crypto",
            label: "crypto.Crypto",
            type: "@winglang/sdk.std.Resource",
            display: {},
            childItems: [
              {
                id: "root/Default/Secrets.Secrets/crypto.Crypto/sim.Crypto",
                label: "sim.Crypto",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
            ],
          },
        ],
      },
      {
        id: "root/Default/Endpoints.Endpoints",
        label: "Endpoints.Endpoints",
        type: "@winglang/sdk.std.Resource",
        display: {},
      },
      {
        id: "root/Default/adapter.ProbotAdapter",
        label: "adapter.ProbotAdapter",
        type: "@winglang/sdk.std.Resource",
        display: {},
      },
      {
        id: "root/Default/deployment logs",
        label: "deployment logs",
        type: "@winglang/sdk.cloud.Bucket",
        display: {
          title: "Bucket",
          description: "A cloud object store",
        },
      },
      {
        id: "root/Default/runtime.RuntimeService",
        label: "runtime.RuntimeService",
        type: "@winglang/sdk.std.Resource",
        display: {},
        childItems: [
          {
            id: "root/Default/runtime.RuntimeService/RuntimeHandler_sim",
            label: "RuntimeHandler_sim",
            type: "@winglang/sdk.std.Resource",
            display: {},
            childItems: [
              {
                id: "root/Default/runtime.RuntimeService/RuntimeHandler_sim/containers.Container_sim",
                label: "containers.Container_sim",
                type: "@winglang/sdk.std.Resource",
                display: {},
                childItems: [
                  {
                    id: "root/Default/runtime.RuntimeService/RuntimeHandler_sim/containers.Container_sim/container-info",
                    label: "container-info",
                    type: "@winglang/sdk.ex.Table",
                    display: {
                      title: "Table",
                      description:
                        "A cloud NoSQL database table that can be used to store and query data",
                    },
                  },
                ],
              },
              {
                id: "root/Default/runtime.RuntimeService/RuntimeHandler_sim/cloud.Service",
                label: "cloud.Service",
                type: "@winglang/sdk.cloud.Service",
                display: {
                  title: "Service",
                  description: "A cloud service",
                },
              },
            ],
          },
          {
            id: "root/Default/runtime.RuntimeService/cloud.Queue",
            label: "cloud.Queue",
            type: "@winglang/sdk.cloud.Queue",
            display: {
              title: "Queue",
              description: "A distributed message queue",
            },
            childItems: [
              {
                id: "root/Default/runtime.RuntimeService/cloud.Queue/SetConsumer0",
                label: "setConsumer()",
                type: "@winglang/sdk.cloud.Function",
                display: {
                  title: "setConsumer()",
                  description: "A cloud function (FaaS)",
                  sourceModule: "@winglang/sdk",
                },
              },
            ],
          },
          {
            id: "root/Default/runtime.RuntimeService/cloud.Api",
            label: "cloud.Api",
            type: "@winglang/sdk.cloud.Api",
            display: {
              title: "Api",
              description: "A REST API endpoint",
            },
            childItems: [
              {
                id: "root/Default/runtime.RuntimeService/cloud.Api/Endpoint",
                label: "Endpoint",
                type: "@winglang/sdk.cloud.Endpoint",
                display: {
                  title: "Endpoint",
                  description:
                    "Endpoint for Api root/Default/runtime.RuntimeService/cloud.Api",
                },
              },
              {
                id: "root/Default/runtime.RuntimeService/cloud.Api/OnRequestHandler0",
                label: "POST /",
                type: "@winglang/sdk.cloud.Function",
                display: {
                  title: "POST /",
                  description: "A cloud function (FaaS)",
                  sourceModule: "@winglang/sdk",
                },
              },
              {
                id: "root/Default/runtime.RuntimeService/cloud.Api/OnRequestHandler1",
                label: "DELETE /",
                type: "@winglang/sdk.cloud.Function",
                display: {
                  title: "DELETE /",
                  description: "A cloud function (FaaS)",
                  sourceModule: "@winglang/sdk",
                },
              },
            ],
          },
        ],
      },
      {
        id: "root/Default/ex.ReactApp",
        label: "ex.ReactApp",
        type: "@winglang/sdk.ex.ReactApp",
        display: {
          title: "React App",
          description: "A deployable React App",
        },
      },
      {
        id: "root/Default/Dns.DNS",
        label: "Dns.DNS",
        type: "@winglang/sdk.std.Resource",
        display: {},
        childItems: [
          {
            id: "root/Default/Dns.DNS/sim.DNS",
            label: "sim.DNS",
            type: "@winglang/sdk.std.Resource",
            display: {},
            childItems: [
              {
                id: "root/Default/Dns.DNS/sim.DNS/sim.State",
                label: "sim.State",
                type: "@winglang/sdk.sim.State",
                display: {},
              },
              {
                id: "root/Default/Dns.DNS/sim.DNS/cloud.Service",
                label: "cloud.Service",
                type: "@winglang/sdk.cloud.Service",
                display: {
                  title: "Service",
                  description: "A cloud service",
                },
              },
            ],
          },
        ],
      },
      {
        id: "root/Default/PublicEndpoint.PublicEndpointProvider",
        label: "PublicEndpoint.PublicEndpointProvider",
        type: "@winglang/sdk.std.Resource",
        display: {},
      },
      {
        id: "root/Default/certificate.Certificate",
        label: "certificate.Certificate",
        type: "@winglang/sdk.std.Resource",
        display: {},
        childItems: [
          {
            id: "root/Default/certificate.Certificate/sim.Certificate",
            label: "sim.Certificate",
            type: "@winglang/sdk.std.Resource",
            display: {},
          },
        ],
      },
      {
        id: "root/Default/runtime_client.RuntimeClient",
        label: "runtime_client.RuntimeClient",
        type: "@winglang/sdk.std.Resource",
        display: {},
      },
      {
        id: "root/Default/EnvironmentManager.EnvironmentManager",
        label: "EnvironmentManager.EnvironmentManager",
        type: "@winglang/sdk.std.Resource",
        display: {},
        childItems: [
          {
            id: "root/Default/EnvironmentManager.EnvironmentManager/comment.GithubComment",
            label: "comment.GithubComment",
            type: "@winglang/sdk.std.Resource",
            display: {},
          },
        ],
      },
      {
        id: "root/Default/wingcloud_api.Api",
        label: "wingcloud_api.Api",
        type: "@winglang/sdk.std.Resource",
        display: {},
        childItems: [
          {
            id: "root/Default/wingcloud_api.Api/json_api.JsonApi",
            label: "json_api.JsonApi",
            type: "@winglang/sdk.std.Resource",
            display: {},
            childItems: [
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler1",
                label: "Handler1",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler2",
                label: "Handler2",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler3",
                label: "Handler3",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler4",
                label: "Handler4",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler5",
                label: "Handler5",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler6",
                label: "Handler6",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler7",
                label: "Handler7",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler8",
                label: "Handler8",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler9",
                label: "Handler9",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler10",
                label: "Handler10",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler11",
                label: "Handler11",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler12",
                label: "Handler12",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler13",
                label: "Handler13",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler14",
                label: "Handler14",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler15",
                label: "Handler15",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler16",
                label: "Handler16",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler17",
                label: "Handler17",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler18",
                label: "Handler18",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler19",
                label: "Handler19",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler20",
                label: "Handler20",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler21",
                label: "Handler21",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
              {
                id: "root/Default/wingcloud_api.Api/json_api.JsonApi/Handler22",
                label: "Handler22",
                type: "@winglang/sdk.std.Resource",
                display: {},
              },
            ],
          },
          {
            id: "root/Default/wingcloud_api.Api/Environments Queue",
            label: "Environments Queue",
            type: "@winglang/sdk.cloud.Queue",
            display: {
              title: "Queue",
              description: "A distributed message queue",
            },
            childItems: [
              {
                id: "root/Default/wingcloud_api.Api/Environments Queue/SetConsumer0",
                label: "setConsumer()",
                type: "@winglang/sdk.cloud.Function",
                display: {
                  title: "setConsumer()",
                  description: "A cloud function (FaaS)",
                  sourceModule: "@winglang/sdk",
                },
              },
            ],
          },
          {
            id: "root/Default/wingcloud_api.Api/github_tokens_table.GithubAccessTokensTable",
            label: "github_tokens_table.GithubAccessTokensTable",
            type: "@winglang/sdk.std.Resource",
            display: {},
            childItems: [
              {
                id: "root/Default/wingcloud_api.Api/github_tokens_table.GithubAccessTokensTable/ex.Table",
                label: "ex.Table",
                type: "@winglang/sdk.ex.Table",
                display: {
                  title: "Table",
                  description:
                    "A cloud NoSQL database table that can be used to store and query data",
                },
              },
            ],
          },
          {
            id: "root/Default/wingcloud_api.Api/Production Environment Queue",
            label: "Production Environment Queue",
            type: "@winglang/sdk.cloud.Queue",
            display: {
              title: "Queue",
              description: "A distributed message queue",
            },
            childItems: [
              {
                id: "root/Default/wingcloud_api.Api/Production Environment Queue/SetConsumer0",
                label: "setConsumer()",
                type: "@winglang/sdk.cloud.Function",
                display: {
                  title: "setConsumer()",
                  description: "A cloud function (FaaS)",
                  sourceModule: "@winglang/sdk",
                },
              },
            ],
          },
          {
            id: "root/Default/wingcloud_api.Api/Delete App Queue",
            label: "Delete App Queue",
            type: "@winglang/sdk.cloud.Queue",
            display: {
              title: "Queue",
              description: "A distributed message queue",
            },
            childItems: [
              {
                id: "root/Default/wingcloud_api.Api/Delete App Queue/SetConsumer0",
                label: "setConsumer()",
                type: "@winglang/sdk.cloud.Function",
                display: {
                  title: "setConsumer()",
                  description: "A cloud function (FaaS)",
                  sourceModule: "@winglang/sdk",
                },
              },
            ],
          },
        ],
      },
      {
        id: "root/Default/probot.ProbotApp",
        label: "probot.ProbotApp",
        type: "@winglang/sdk.std.Resource",
        display: {},
        childItems: [
          {
            id: "root/Default/probot.ProbotApp/cloud.Queue",
            label: "cloud.Queue",
            type: "@winglang/sdk.cloud.Queue",
            display: {
              title: "Queue",
              description: "A distributed message queue",
            },
            childItems: [
              {
                id: "root/Default/probot.ProbotApp/cloud.Queue/SetConsumer0",
                label: "setConsumer()",
                type: "@winglang/sdk.cloud.Function",
                display: {
                  title: "setConsumer()",
                  description: "A cloud function (FaaS)",
                  sourceModule: "@winglang/sdk",
                },
              },
            ],
          },
          {
            id: "root/Default/probot.ProbotApp/github.GithubApp",
            label: "github.GithubApp",
            type: "@winglang/sdk.std.Resource",
            display: {},
            childItems: [
              {
                id: "root/Default/probot.ProbotApp/github.GithubApp/cloud.Api",
                label: "cloud.Api",
                type: "@winglang/sdk.cloud.Api",
                display: {
                  title: "Api",
                  description: "A REST API endpoint",
                },
                childItems: [
                  {
                    id: "root/Default/probot.ProbotApp/github.GithubApp/cloud.Api/Endpoint",
                    label: "Endpoint",
                    type: "@winglang/sdk.cloud.Endpoint",
                    display: {
                      title: "Endpoint",
                      description:
                        "Endpoint for Api root/Default/probot.ProbotApp/github.GithubApp/cloud.Api",
                    },
                  },
                  {
                    id: "root/Default/probot.ProbotApp/github.GithubApp/cloud.Api/OnRequestHandler0",
                    label: "POST /webhook",
                    type: "@winglang/sdk.cloud.Function",
                    display: {
                      title: "POST /webhook",
                      description: "A cloud function (FaaS)",
                      sourceModule: "@winglang/sdk",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "root/Default/reverse_proxy.ReverseProxy",
        label: "reverse_proxy.ReverseProxy",
        type: "@winglang/sdk.std.Resource",
        display: {},
        childItems: [
          {
            id: "root/Default/reverse_proxy.ReverseProxy/ReverseProxy_sim",
            label: "ReverseProxy_sim",
            type: "@winglang/sdk.std.Resource",
            display: {},
            childItems: [
              {
                id: "root/Default/reverse_proxy.ReverseProxy/ReverseProxy_sim/sim.State",
                label: "sim.State",
                type: "@winglang/sdk.sim.State",
                display: {},
              },
              {
                id: "root/Default/reverse_proxy.ReverseProxy/ReverseProxy_sim/cloud.Service",
                label: "cloud.Service",
                type: "@winglang/sdk.cloud.Service",
                display: {
                  title: "Service",
                  description: "A cloud service",
                },
              },
            ],
          },
        ],
      },
      {
        id: "root/Default/ngrok.Ngrok",
        label: "ngrok.Ngrok",
        type: "@winglang/sdk.std.Resource",
        display: {},
        childItems: [
          {
            id: "root/Default/ngrok.Ngrok/simutils.Service",
            label: "simutils.Service",
            type: "@winglang/sdk.std.Resource",
            display: {},
            childItems: [
              {
                id: "root/Default/ngrok.Ngrok/simutils.Service/cloud.Service",
                label: "cloud.Service",
                type: "@winglang/sdk.cloud.Service",
                display: {
                  title: "Service",
                  description: "A cloud service",
                },
              },
            ],
          },
          {
            id: "root/Default/ngrok.Ngrok/sim.State",
            label: "sim.State",
            type: "@winglang/sdk.sim.State",
            display: {},
          },
          {
            id: "root/Default/ngrok.Ngrok/cloud.Service",
            label: "cloud.Service",
            type: "@winglang/sdk.cloud.Service",
            display: {
              title: "Service",
              description: "A cloud service",
            },
          },
        ],
      },
      {
        id: "root/Default/cloud.OnDeploy",
        label: "cloud.OnDeploy",
        type: "@winglang/sdk.cloud.OnDeploy",
        display: {
          title: "OnDeploy",
          description: "Run code during the app's deployment.",
        },
        childItems: [
          {
            id: "root/Default/cloud.OnDeploy/Function",
            label: "Function",
            type: "@winglang/sdk.cloud.Function",
            display: {
              title: "Function",
              description: "A cloud function (FaaS)",
              sourceModule: "@winglang/sdk",
            },
          },
        ],
      },
      {
        id: "root/Default/API URL",
        label: "API URL",
        type: "cdktf.TerraformOutput",
      },
      {
        id: "root/Default/Dashboard URL",
        label: "Dashboard URL",
        type: "cdktf.TerraformOutput",
      },
      {
        id: "root/Default/Probot API URL",
        label: "Probot API URL",
        type: "cdktf.TerraformOutput",
      },
      {
        id: "root/Default/Proxy URL",
        label: "Proxy URL",
        type: "cdktf.TerraformOutput",
      },
      {
        id: "root/Default/Site URL",
        label: "Site URL",
        type: "cdktf.TerraformOutput",
      },
    ],
  },
};

export const useExplorer = () => {
  const {
    items,
    setItems,
    selectedItems,
    setSelectedItems,
    expandedItems,
    setExpandedItems,
    expand,
    expandAll,
    collapseAll,
  } = useTreeMenuItems({
    selectedItemIds: ["root"],
  });

  // const tree = trpc["app.explorerTree"].useQuery();

  const { mutate: setSelectedNode } = trpc["app.selectNode"].useMutation();
  const selectedNode = trpc["app.selectedNode"].useQuery();
  const nodeIds = trpc["app.nodeIds"].useQuery();

  const onSelectedItemsChange = useCallback(
    (selectedItems: string[]) => {
      setSelectedItems(selectedItems);
      setSelectedNode({
        resourcePath: selectedItems[0] ?? "",
      });
    },
    [setSelectedNode, setSelectedItems],
  );

  useEffect(() => {
    if (!tree.data) {
      return;
    }
    // Remove the root node by taking the children.
    const items = createTreeMenuItemFromExplorerTreeItem(tree.data).children;
    setItems(items ?? []);
  }, [tree.data, setItems]);

  useEffect(() => {
    if (!nodeIds.data) {
      return;
    }

    if (!selectedNode.data || !nodeIds.data?.includes(selectedNode.data)) {
      setSelectedNode({
        resourcePath: "root",
      });
    }
  }, [selectedNode.data, nodeIds.data, setSelectedNode]);

  useEffect(() => {
    if (!selectedNode.data) {
      return;
    }
    setSelectedItems([selectedNode.data]);
  }, [selectedNode.data, setSelectedItems]);

  useEffect(() => {
    expandAll();
  }, [items, expandAll]);

  return {
    items,
    selectedItems,
    setSelectedItems: onSelectedItemsChange,
    expandedItems,
    setExpandedItems,
    expand,
    expandAll,
    collapseAll,
  };
};
