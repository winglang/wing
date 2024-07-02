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
var cdktf = require("cdktf");
var vitest_1 = require("vitest");
var cloud_1 = require("../../src/cloud");
var core_1 = require("../../src/core");
var std_1 = require("../../src/std");
var tfaws = require("../../src/target-tf-aws");
var util_1 = require("../util");
var INFLIGHT_CODE = (0, core_1.inflight)(function (_, name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("Hello, " + name);
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("basic function", function () {
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    new cloud_1.Function(app, "Function", INFLIGHT_CODE);
    var output = app.synth();
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_cloudwatch_log_group", // log group for Lambda
        "aws_iam_role", // role for Lambda
        "aws_iam_role_policy", // policy for role
        "aws_iam_role_policy_attachment", // execution policy for role
        "aws_lambda_function", // Lambda
        "aws_s3_bucket", // S3 bucket for code
        "aws_s3_object", // S3 object for code
    ]);
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "aws_cloudwatch_log_group", {
        retention_in_days: 30,
    })).toEqual(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("function will be behind a vpc when vpc_lambda is set to true", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var parameters = app.parameters;
    parameters._rawParameters["tf-aws"] = {
        vpc: "new",
        vpc_lambda: true,
    };
    new cloud_1.Function(app, "Function", INFLIGHT_CODE);
    // WHEN
    var output = app.synth();
    // THEN
    var tfFunction = JSON.parse(output).resource.aws_lambda_function.Function;
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_vpc")).toEqual(1);
    (0, vitest_1.expect)(tfFunction.vpc_config).toBeDefined();
    (0, vitest_1.expect)(tfFunction.vpc_config.security_group_ids.length).toEqual(1);
    (0, vitest_1.expect)(tfFunction.vpc_config.subnet_ids.length).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
});
(0, vitest_1.test)("basic function with environment variables", function () {
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    new cloud_1.Function(app, "Function", INFLIGHT_CODE, {
        env: {
            FOO: "BAR",
            BOOM: "BAM",
        },
    });
    var output = app.synth();
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "aws_lambda_function", {
        environment: {
            variables: {
                BOOM: "BAM",
                FOO: "BAR",
            },
        },
    })).toEqual(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("function name valid", function () {
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var func = new cloud_1.Function(app, "The-Mighty_Function-01", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "aws_lambda_function", {
        function_name: "The-Mighty_Function-01-".concat(func.node.addr.substring(0, 8)),
    })).toEqual(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("replace invalid character from function name", function () {
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var func = new cloud_1.Function(app, "The%Mighty$Function", INFLIGHT_CODE);
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "aws_lambda_function", {
        function_name: "The-Mighty-Function-".concat(func.node.addr.substring(0, 8)),
    })).toEqual(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("basic function with timeout explicitly set", function () {
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    new cloud_1.Function(app, "Function", INFLIGHT_CODE, {
        timeout: std_1.Duration.fromSeconds(30),
    });
    var output = app.synth();
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "aws_lambda_function", {
        timeout: 30,
    })).toEqual(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("basic function with memory size specified", function () {
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    new cloud_1.Function(app, "Function", INFLIGHT_CODE, { memory: 512 });
    var output = app.synth();
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_cloudwatch_log_group", // log group for Lambda
        "aws_iam_role", // role for Lambda
        "aws_iam_role_policy", // policy for role
        "aws_iam_role_policy_attachment", // execution policy for role
        "aws_lambda_function", // Lambda
        "aws_s3_bucket", // S3 bucket for code
        "aws_s3_object", // S3 object for code
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("basic function with custom log retention", function () {
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    new cloud_1.Function(app, "Function", INFLIGHT_CODE, { logRetentionDays: 7 });
    var output = app.synth();
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "aws_cloudwatch_log_group", {
        retention_in_days: 7,
    })).toEqual(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("basic function with infinite log retention", function () {
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    new cloud_1.Function(app, "Function", INFLIGHT_CODE, { logRetentionDays: -1 });
    var output = app.synth();
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "aws_cloudwatch_log_group")).toEqual(false);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("asset path is stripped of spaces", function () {
    // GIVEN
    var some_name = "I have a space in my name";
    var expectedReplacement = "i_have_a_space_in_my_name";
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var f = new cloud_1.Function(app, some_name, INFLIGHT_CODE);
    // WHEN
    app.synth();
    // THEN
    (0, vitest_1.expect)(f.entrypoint).toContain(expectedReplacement);
});
(0, vitest_1.test)("vpc permissions are added even if there is no policy", function () {
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var f = new tfaws.Function(app, "Function", INFLIGHT_CODE);
    f.addNetwork({
        securityGroupIds: ["sg-1234567890"],
        subnetIds: ["subnet-1234567890"],
    });
    var output = app.synth();
    var policy = (0, util_1.tfSanitize)(output).resource.aws_iam_role_policy
        .Function_IamRolePolicy_E3B26607.policy;
    (0, vitest_1.expect)(JSON.parse(policy).Statement).toStrictEqual([
        {
            Action: [
                "ec2:CreateNetworkInterface",
                "ec2:DescribeNetworkInterfaces",
                "ec2:DeleteNetworkInterface",
                "ec2:DescribeSubnets",
                "ec2:DescribeSecurityGroups",
            ],
            Resource: ["*"],
            Effect: "Allow",
        },
    ]);
});
