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
var cloud = require("../../src/cloud");
var core_1 = require("../../src/core");
var ex = require("../../src/ex");
var tfaws = require("../../src/target-tf-aws");
var util_1 = require("../util");
(0, vitest_1.test)("default table behavior", function () {
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    new ex.Table(app, "Table", {
        columns: { name: ex.ColumnType.STRING },
        primaryKey: "id",
        name: "my-wing-table",
    });
    var output = app.synth();
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual(["aws_dynamodb_table"]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
});
(0, vitest_1.test)("function with a table binding", function () {
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var table = new ex.Table(app, "Table", {
        columns: { name: ex.ColumnType.STRING },
        primaryKey: "id",
        name: "my-wing-table",
    });
    var inflight = (0, core_1.lift)({ my_table: table })
        .grant({ my_table: ["insert"] })
        .inflight(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.my_table.insert("test", { id: "test" })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    new cloud.Function(app, "Function", inflight);
    var output = app.synth();
    (0, vitest_1.expect)((0, util_1.sanitizeCode)(inflight._toInflight())).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_cloudwatch_log_group", // log group for function
        "aws_dynamodb_table", // main table
        "aws_iam_role", // role for function
        "aws_iam_role_policy", // policy for role
        "aws_iam_role_policy_attachment", // execution policy for role
        "aws_lambda_function", // processor function
        "aws_s3_bucket", // S3 bucket for code
        "aws_s3_object", // S3 object for code
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
