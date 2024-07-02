"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var tfazure = require("../../src/target-tf-azure");
var util_1 = require("../util");
var AZURE_APP_OPTS = {
    location: "East US",
    entrypointDir: __dirname,
};
(0, vitest_1.test)("create a bucket", function () {
    // GIVEN
    var app = new tfazure.App(__assign({ outdir: (0, util_1.mkdtemp)() }, AZURE_APP_OPTS));
    new cloud_1.Bucket(app, "my_bucket");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "azurerm_resource_group",
        "azurerm_storage_account",
        "azurerm_storage_container",
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "azurerm_storage_container")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("create multiple buckets", function () {
    // GIVEN
    var app = new tfazure.App(__assign({ outdir: (0, util_1.mkdtemp)() }, AZURE_APP_OPTS));
    new cloud_1.Bucket(app, "my_bucket");
    new cloud_1.Bucket(app, "my_bucket2");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "azurerm_resource_group",
        "azurerm_storage_account",
        "azurerm_storage_container",
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "azurerm_storage_container")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket is public", function () {
    // GIVEN
    var app = new tfazure.App(__assign({ outdir: (0, util_1.mkdtemp)() }, AZURE_APP_OPTS));
    new cloud_1.Bucket(app, "my_bucket", { public: true });
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "azurerm_resource_group",
        "azurerm_storage_account",
        "azurerm_storage_container",
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "azurerm_storage_container")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket with two preflight objects", function () {
    // GIVEN
    var app = new tfazure.App(__assign({ outdir: (0, util_1.mkdtemp)() }, AZURE_APP_OPTS));
    var bucket = new cloud_1.Bucket(app, "my_bucket", { public: true });
    bucket.addObject("file1.txt", "hello world");
    bucket.addObject("file2.txt", "boom bam");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "azurerm_resource_group",
        "azurerm_storage_account",
        "azurerm_storage_blob",
        "azurerm_storage_container",
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "azurerm_storage_blob")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket with two preflight files", function () {
    // GIVEN
    var app = new tfazure.App(__assign({ outdir: (0, util_1.mkdtemp)() }, AZURE_APP_OPTS));
    var bucket = new cloud_1.Bucket(app, "my_bucket", { public: true });
    bucket.addFile("file1.txt", "../test-files/test1.txt");
    bucket.addFile("file2.txt", "../test-files/test2.txt");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "azurerm_resource_group",
        "azurerm_storage_account",
        "azurerm_storage_blob",
        "azurerm_storage_container",
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "azurerm_storage_blob")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket name valid", function () {
    // GIVEN
    var app = new tfazure.App(__assign({ outdir: (0, util_1.mkdtemp)() }, AZURE_APP_OPTS));
    var bucket = new cloud_1.Bucket(app, "The-Uncanny-Bucket");
    var output = app.synth();
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "azurerm_resource_group", {
        name: "Default-".concat(app.node.addr.substring(0, 8)),
    })).toEqual(true);
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "azurerm_storage_account", {
        name: "default".concat(app.node.addr.substring(0, 8)),
    })).toEqual(true);
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "azurerm_storage_container", {
        name: "the-uncanny-bucket-".concat(bucket.node.addr.substring(0, 8)),
    })).toEqual(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket onEvent is not implemented yet", function () {
    // GIVEN
    var error;
    try {
        var app = new tfazure.App(__assign({ outdir: (0, util_1.mkdtemp)() }, AZURE_APP_OPTS));
        var bucket = new cloud_1.Bucket(app, "my_bucket", { public: true });
        bucket.onEvent((0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); }));
        app.synth();
    }
    catch (err) {
        error = err.message;
    }
    // THEN
    (0, vitest_1.expect)(error).toBe("onEvent method isn't implemented yet on the current target.\nFor more information see: https://github.com/winglang/wing/issues/1954.\nContributions welcome ❤️");
});
