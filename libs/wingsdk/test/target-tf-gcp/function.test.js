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
var fs_1 = require("fs");
var path_1 = require("path");
var cdktf = require("cdktf");
var vitest_1 = require("vitest");
var cloud_1 = require("../../src/cloud");
var core_1 = require("../../src/core");
var std_1 = require("../../src/std");
var tfgcp = require("../../src/target-tf-gcp");
var util_1 = require("../util");
var GCP_APP_OPTS = {
    projectId: "my-project",
    region: "us-central1",
    entrypointDir: __dirname,
    zone: "us-central1",
};
var INFLIGHT_CODE = (0, core_1.inflight)(function (_, name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("Hello, " + name);
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("basic function", function () {
    // GIVEN
    var app = new tfgcp.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    // WHEN
    new cloud_1.Function(app, "Function", INFLIGHT_CODE);
    var output = app.synth();
    var functionOutDir = (0, fs_1.readdirSync)(app.workdir, {
        recursive: true,
        withFileTypes: true,
    }).find(function (d) { return d.isDirectory(); });
    var packageJson = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(app.workdir, functionOutDir.name, "package.json"), "utf-8"));
    var indexFilename = "index.cjs";
    (0, vitest_1.expect)(packageJson.main).toBe(indexFilename);
    (0, vitest_1.expect)((0, fs_1.existsSync)((0, path_1.join)(app.workdir, functionOutDir.name, indexFilename))).toBeTruthy();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "google_cloudfunctions_function",
        "google_project_iam_custom_role",
        "google_project_iam_member",
        "google_project_service",
        "google_service_account",
        "google_storage_bucket",
        "google_storage_bucket_object",
        "random_id",
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("basic function with environment variables", function () {
    // GIVEN
    var app = new tfgcp.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    // WHEN
    new cloud_1.Function(app, "Function", INFLIGHT_CODE, {
        env: {
            FOO: "BAR",
            BOOM: "BAM",
        },
    });
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "google_cloudfunctions_function", {
        environment_variables: {
            BOOM: "BAM",
            FOO: "BAR",
        },
    })).toEqual(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("basic function with timeout explicitly set", function () {
    // GIVEN
    var app = new tfgcp.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    // WHEN
    new cloud_1.Function(app, "Function", INFLIGHT_CODE, {
        timeout: std_1.Duration.fromSeconds(30),
    });
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "google_cloudfunctions_function", {
        timeout: 30,
    })).toEqual(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("basic function with timeout beyond the allowed range", function () {
    // GIVEN
    var app = new tfgcp.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    // WHEN
    (0, vitest_1.expect)(function () {
        new cloud_1.Function(app, "Function", INFLIGHT_CODE, {
            timeout: std_1.Duration.fromSeconds(0),
        });
    }).toThrowErrorMatchingSnapshot();
});
(0, vitest_1.test)("basic function with memory size specified", function () {
    // GIVEN
    var app = new tfgcp.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    // WHEN
    new cloud_1.Function(app, "Function", INFLIGHT_CODE, {
        memory: 256,
    });
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "google_cloudfunctions_function", {
        available_memory_mb: 256,
    })).toEqual(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("basic function with memory beyond the allowed range", function () {
    // GIVEN
    var app = new tfgcp.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    // WHEN
    (0, vitest_1.expect)(function () {
        new cloud_1.Function(app, "Function", INFLIGHT_CODE, {
            memory: 64,
        });
    }).toThrowErrorMatchingSnapshot();
});
