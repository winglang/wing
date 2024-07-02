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
var cloud_1 = require("../../src/cloud");
var core_1 = require("../../src/core");
var ex = require("../../src/ex");
var tfaws = require("../../src/target-tf-aws");
var util_1 = require("../util");
var INFLIGHT_CODE = (0, core_1.inflight)(function (_, name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("Hello, " + name);
        return [2 /*return*/];
    });
}); });
(0, vitest_1.describe)("When creating a Redis resource", function () {
    (0, vitest_1.it)("should create an elasticache cluster and required vpc networking resources", function () {
        // GIVEN
        var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
        new ex.Redis(app, "Redis");
        // WHEN
        var output = app.synth();
        // THEN
        (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
            "aws_eip", // Elastic IP for NAT Gateway
            "aws_elasticache_cluster", // Elasticache cluster
            "aws_elasticache_subnet_group", // Elasticache subnet group
            "aws_internet_gateway", // Internet Gateway
            "aws_nat_gateway", // NAT for internet egress from private subnet
            "aws_route_table", // Route tables for subnets
            "aws_route_table_association", // Route table associations for subnets
            "aws_security_group", // Security group for Elasticache cluster access
            "aws_subnet", // App wide subnets
            "aws_vpc", // VCP for app
        ]);
        (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    });
    (0, vitest_1.it)("should only contain a single instance of the vpc resources", function () {
        // GIVEN
        var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
        new ex.Redis(app, "Redis");
        // WHEN
        var output = app.synth();
        // THEN
        (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_vpc")).toEqual(1);
        (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_subnet")).toEqual(3);
        (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_route_table")).toEqual(3);
        (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_nat_gateway")).toEqual(1);
        (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_internet_gateway")).toEqual(1);
    });
    (0, vitest_1.describe)("that is used by a function", function () {
        (0, vitest_1.it)("lambda function should have access to the redis cluster", function () {
            // GIVEN
            var app = new tfaws.App({
                outdir: (0, util_1.mkdtemp)(),
                entrypointDir: __dirname,
            });
            var redisCluster = new ex.Redis(app, "Redis");
            var func = new cloud_1.Function(app, "Function", INFLIGHT_CODE);
            redisCluster.onLift(func, ["set", "get"]);
            // WHEN
            var output = app.synth();
            var lambda = (0, util_1.getTfResource)(output, "aws_lambda_function");
            var vpcConfig = lambda.vpc_config;
            // THEN
            (0, vitest_1.expect)(vpcConfig.security_group_ids).toBeDefined();
            (0, vitest_1.expect)(vpcConfig.subnet_ids).toBeDefined();
        });
    });
});
(0, vitest_1.describe)("When creating multiple Redis resources", function () {
    (0, vitest_1.it)("should only contain a single instance of the vpc resources", function () {
        // GIVEN
        var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
        new ex.Redis(app, "RedisOne");
        new ex.Redis(app, "RedisTwo");
        // WHEN
        var output = app.synth();
        // THEN
        // 2 clusters, 2 security groups, 1 vpc, 2 subnets, 2 route tables, 1 nat gateway, 1 internet gateway
        (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_elasticache_cluster")).toEqual(2);
        (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_security_group")).toEqual(4);
        (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_vpc")).toEqual(1);
        (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_subnet")).toEqual(3);
        (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_route_table")).toEqual(3);
        (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_nat_gateway")).toEqual(1);
        (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_internet_gateway")).toEqual(1);
    });
    (0, vitest_1.describe)("that are used by a function", function () {
        (0, vitest_1.it)("the function should have access to both clusters", function () {
            // GIVEN
            var app = new tfaws.App({
                outdir: (0, util_1.mkdtemp)(),
                entrypointDir: __dirname,
            });
            var redisCluster = new ex.Redis(app, "Redis");
            var otherCluster = new ex.Redis(app, "OtherRedis");
            var func = new cloud_1.Function(app, "Function", INFLIGHT_CODE);
            redisCluster.onLift(func, ["set", "get"]);
            otherCluster.onLift(func, ["set", "get"]);
            // WHEN
            var output = app.synth();
            var lambda = (0, util_1.getTfResource)(output, "aws_lambda_function");
            var vpcConfig = JSON.parse(JSON.stringify(lambda.vpc_config));
            // THEN
            (0, vitest_1.expect)(vpcConfig.security_group_ids.length).toEqual(4);
            (0, vitest_1.expect)(vpcConfig.subnet_ids.length).toEqual(4);
        });
    });
});
