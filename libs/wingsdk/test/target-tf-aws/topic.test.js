"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var constructs_1 = require("constructs");
var vitest_1 = require("vitest");
var cloud = require("../../src/cloud");
var core_1 = require("../../src/core");
var platform_1 = require("../../src/platform");
var std_1 = require("../../src/std");
var tfaws = require("../../src/target-tf-aws");
var util_1 = require("../util");
var CdktfApp = /** @class */ (function (_super) {
    __extends(CdktfApp, _super);
    function CdktfApp() {
        return _super.call(this, undefined, undefined) || this;
    }
    return CdktfApp;
}(constructs_1.Construct));
(0, vitest_1.test)("default topic behavior", function () {
    // GIVEN
    var platform = platform_1.PlatformManager.load("tf-aws");
    var App = /** @class */ (function (_super) {
        __extends(App, _super);
        function App() {
            var _this = _super.call(this, undefined, undefined) || this;
            new cloud.Topic(_this, "Topic");
            return _this;
        }
        return App;
    }(constructs_1.Construct));
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    platform.synth(App);
    new cloud.Topic(app, "Topic");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual(["aws_sns_topic"]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("topic with subscriber function", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var topic = new cloud.Topic(app, "Topic");
    var subscriber = (0, core_1.inflight)(function (_, event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("Received: ", event);
            return [2 /*return*/];
        });
    }); });
    topic.onMessage(subscriber);
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.sanitizeCode)(subscriber._toInflight())).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_cloudwatch_log_group", // log group for subscriber function
        "aws_iam_role", // role for subscriber function
        "aws_iam_role_policy", // policy for subscriber function role
        "aws_iam_role_policy_attachment", // execution policy for subscriber role
        "aws_lambda_function", // subscriber function
        "aws_lambda_permission", // policy allowing sns to publsh to subscriber lambda
        "aws_s3_bucket", // S3 bucket for code
        "aws_s3_object", // S3 object for code
        "aws_sns_topic", // main topic
        "aws_sns_topic_subscription", // subscriber lambda subscription to topic
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("topic with multiple subscribers", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var topic = new cloud.Topic(app, "Topic");
    // WHEN
    topic.onMessage((0, core_1.inflight)(function (_, event) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, console.log("Got Event: ", event)];
    }); }); }));
    topic.onMessage((0, core_1.inflight)(function (_, event) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, console.log("Ohh yea!! ", event)];
    }); }); }));
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_sns_topic")).toEqual(1); // 1 topic
    // 2 everything else
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_iam_role")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_iam_role_policy")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_iam_role_policy_attachment")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_function")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_lambda_permission")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_s3_bucket")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_s3_object")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_sns_topic_subscription")).toEqual(2);
});
(0, vitest_1.test)("topic name valid", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var topic = new cloud.Topic(app, "The-Spectacular_Topic-01");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "aws_sns_topic", {
        name: "The-Spectacular_Topic-01-".concat(topic.node.addr.substring(0, 8)),
    }));
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("replace invalid character from queue name", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var topic = new cloud.Topic(app, "The%Spectacular@Topic");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "aws_sns_topic", {
        name: "The-Spectacular-Topic-".concat(topic.node.addr.substring(0, 8)),
    }));
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("topic with subscriber function timeout", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var topic = new cloud.Topic(app, "Topic");
    var subscriber = (0, core_1.inflight)(function (_, event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("Received: ", event);
            return [2 /*return*/];
        });
    }); });
    topic.onMessage(subscriber, { timeout: std_1.Duration.fromSeconds(30) });
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "aws_lambda_function", {
        timeout: 30,
    })).toEqual(true);
});
