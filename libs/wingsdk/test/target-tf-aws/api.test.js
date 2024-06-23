"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var core_1 = require("../../src/core");
var tfaws = require("../../src/target-tf-aws");
var target_tf_aws_1 = require("../../src/target-tf-aws");
var util_1 = require("../util");
var INFLIGHT_CODE = (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ({ body: "Hello, world" })];
}); }); });
var INFLIGHT_CODE_2 = (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ({ body: "Hello, Wing!" })];
}); }); });
var extractApiSpec = function (output) {
    var jsonOutput = JSON.parse(output);
    var api = jsonOutput.resource.aws_api_gateway_rest_api;
    var body = Object.values(api)[0].body;
    return JSON.parse(body);
};
(0, vitest_1.test)("api with GET route at root", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.get("/", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    var apiSpec = extractApiSpec(output);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(1);
    (0, vitest_1.expect)(Object.keys(apiSpec.paths["/"])).toStrictEqual(["get"]);
    (0, vitest_1.expect)(apiSpec).toMatchSnapshot();
});
(0, vitest_1.test)("api will be private when vpc_api_gateway is true", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var parameters = app.parameters;
    parameters._rawParameters["tf-aws"] = {
        vpc: "new",
        vpc_api_gateway: true,
    };
    var api = new target_tf_aws_1.Api(app, "Api");
    // WHEN
    var output = app.synth();
    // THEN
    var parsedOutput = JSON.parse(output);
    var apiGatewayKey = Object.keys(parsedOutput.resource.aws_api_gateway_rest_api)[0];
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_vpc")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_vpc_endpoint")).toEqual(1);
    (0, vitest_1.expect)(parsedOutput.resource.aws_api_gateway_rest_api[apiGatewayKey]
        .endpoint_configuration.types[0]).toEqual("PRIVATE");
    (0, vitest_1.expect)(parsedOutput.resource.aws_api_gateway_rest_api[apiGatewayKey]
        .endpoint_configuration.vpc_endpoint_ids.length).toEqual(1); // uses vpc endpoint
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
});
(0, vitest_1.test)("api with multiple methods on same route", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.get("/", INFLIGHT_CODE);
    api.put("/", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    var apiSpec = extractApiSpec(output);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(1);
    (0, vitest_1.expect)(apiSpec).toMatchSnapshot();
    (0, vitest_1.expect)(Object.keys(apiSpec.paths["/"])).toStrictEqual(["get", "put"]);
});
(0, vitest_1.test)("api with GET routes with common prefix", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.get("/hello/foo", INFLIGHT_CODE);
    api.get("/hello/bat", INFLIGHT_CODE_2);
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(2);
    (0, vitest_1.expect)(extractApiSpec(output)).toMatchSnapshot();
});
(0, vitest_1.test)("api with GET routes with different prefix", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.get("/hello/foo", INFLIGHT_CODE);
    api.get("/foo/bar", INFLIGHT_CODE_2);
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(2);
    (0, vitest_1.expect)(extractApiSpec(output)).toMatchSnapshot();
});
(0, vitest_1.test)("api with multiple GET route and one lambda", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.get("/hello/foo", INFLIGHT_CODE);
    api.get("/hello/bat", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    // expect(tfResourcesOf(output)).toEqual(["aws_api_gateway_rest_api"]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(1);
    (0, vitest_1.expect)(extractApiSpec(output)).toMatchSnapshot();
});
(0, vitest_1.test)("api with multiple methods and multiple lambda", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.get("/hello/foo", INFLIGHT_CODE);
    api.post("/hello/bat", INFLIGHT_CODE_2);
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(2);
    (0, vitest_1.expect)(extractApiSpec(output)).toMatchSnapshot();
});
(0, vitest_1.test)("api with multiple methods and one lambda", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.get("/hello/foo", INFLIGHT_CODE);
    api.post("/hello/bat", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(1);
    (0, vitest_1.expect)(extractApiSpec(output)).toMatchSnapshot();
});
(0, vitest_1.test)("api with path parameter", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.get("/hello/:world", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(1);
    (0, vitest_1.expect)(extractApiSpec(output)).toMatchSnapshot();
});
(0, vitest_1.test)("api with 'name' parameter", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.get("/:name", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(1);
    (0, vitest_1.expect)(extractApiSpec(output)).toMatchSnapshot();
});
(0, vitest_1.test)("api with 'name' & 'age' parameter", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.get("/:name/:age", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(1);
    (0, vitest_1.expect)(extractApiSpec(output)).toMatchSnapshot();
});
(0, vitest_1.test)("api with POST route", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.post("/", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    var apiSpec = extractApiSpec(output);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(1);
    (0, vitest_1.expect)(Object.keys(apiSpec.paths["/"])).toStrictEqual(["post"]);
    (0, vitest_1.expect)(apiSpec).toMatchSnapshot();
});
(0, vitest_1.test)("api with PUT route", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.put("/", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    var apiSpec = extractApiSpec(output);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(1);
    (0, vitest_1.expect)(Object.keys(apiSpec.paths["/"])).toStrictEqual(["put"]);
    (0, vitest_1.expect)(apiSpec).toMatchSnapshot();
});
(0, vitest_1.test)("api with PATCH route", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.patch("/", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    var apiSpec = extractApiSpec(output);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(1);
    (0, vitest_1.expect)(Object.keys(apiSpec.paths["/"])).toStrictEqual(["patch"]);
    (0, vitest_1.expect)(apiSpec).toMatchSnapshot();
});
(0, vitest_1.test)("api with DELETE route", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.delete("/", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    var apiSpec = extractApiSpec(output);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(1);
    (0, vitest_1.expect)(Object.keys(apiSpec.paths["/"])).toStrictEqual(["delete"]);
    (0, vitest_1.expect)(apiSpec).toMatchSnapshot();
});
(0, vitest_1.test)("api with OPTIONS route", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.options("/", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    var apiSpec = extractApiSpec(output);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(1);
    (0, vitest_1.expect)(Object.keys(apiSpec.paths["/"])).toStrictEqual(["options"]);
    (0, vitest_1.expect)(apiSpec).toMatchSnapshot();
});
(0, vitest_1.test)("api with HEAD route", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.head("/", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    var apiSpec = extractApiSpec(output);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(1);
    (0, vitest_1.expect)(Object.keys(apiSpec.paths["/"])).toStrictEqual(["head"]);
    (0, vitest_1.expect)(apiSpec).toMatchSnapshot();
});
(0, vitest_1.test)("api with CONNECT route", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    api.connect("/", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    var apiSpec = extractApiSpec(output);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(1);
    (0, vitest_1.expect)(Object.keys(apiSpec.paths["/"])).toStrictEqual(["connect"]);
    (0, vitest_1.expect)(apiSpec).toMatchSnapshot();
});
(0, vitest_1.test)("api url can be used as environment variable", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api");
    new target_tf_aws_1.Function(app, "Fn", INFLIGHT_CODE, {
        env: {
            API_URL: api.url,
        },
    });
    var output = app.synth();
    // THEN
    var tfConfig = JSON.parse(output);
    (0, vitest_1.expect)(tfConfig.resource.aws_lambda_function.Fn.environment.variables.API_URL).toEqual("https://${aws_api_gateway_rest_api.Api_api_91C07D84.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.Api_api_stage_E0FA39D6.stage_name}");
});
(0, vitest_1.test)("api configured for cors", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var api = new target_tf_aws_1.Api(app, "Api", { cors: true });
    api.get("/", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    var apiSpec = extractApiSpec(output);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_api_gateway_rest_api")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(1);
    (0, vitest_1.expect)(Object.keys(apiSpec.paths["/"])).toStrictEqual(["get"]);
    (0, vitest_1.expect)(apiSpec).toMatchSnapshot();
});
