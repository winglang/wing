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
var target_tf_gcp_1 = require("../../src/target-tf-gcp");
var util_1 = require("../util");
var GCP_APP_OPTS = {
    projectId: "my-project",
    entrypointDir: __dirname,
    storageLocation: "US",
    region: "us-central1",
    zone: "us-central1",
};
function checkDatastorePermissions(output, expectedPermissions) {
    var outputObject = JSON.parse(output);
    var customRoleName = Object.keys(outputObject.resource.google_project_iam_custom_role).find(function (name) { return name.startsWith("Function_CustomRole"); });
    var customRole = outputObject.resource.google_project_iam_custom_role[customRoleName];
    var datastorePermissions = customRole.permissions.filter(function (perm) {
        return perm.startsWith("datastore.entities.");
    });
    (0, vitest_1.expect)(datastorePermissions).toEqual(vitest_1.expect.arrayContaining(expectedPermissions));
    (0, vitest_1.expect)(datastorePermissions).toHaveLength(expectedPermissions.length);
}
(0, vitest_1.test)("counter name valid", function () {
    // GIVEN
    var app = new target_tf_gcp_1.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    var counter = new cloud_1.Counter(app, "The.Amazing-Counter_01");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "google_firestore_database", {
        name: "wing-counter-the-amazing-counter-01-".concat(counter.node.addr.substring(0, 8)),
    })).toEqual(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("replace invalid character from counter name", function () {
    // GIVEN
    var app = new target_tf_gcp_1.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    var counter = new cloud_1.Counter(app, "The*Amazing%Counter@01");
    var output = app.synth();
    console.log(output);
    // THEN
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "google_firestore_database", {
        name: "wing-counter-the-amazing-counter-01-".concat(counter.node.addr.substring(0, 8)),
    })).toEqual(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("default counter behavior", function () {
    // GIVEN
    var app = new target_tf_gcp_1.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    new cloud_1.Counter(app, "Counter");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "google_firestore_database",
        "google_project_service",
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
});
(0, vitest_1.test)("counter with initial value", function () {
    // GIVEN
    var app = new target_tf_gcp_1.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    new cloud_1.Counter(app, "Counter", {
        initial: 9991,
    });
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "google_firestore_database",
        "google_project_service",
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("function with a counter binding", function () {
    // GIVEN
    var app = new target_tf_gcp_1.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    var counter = new cloud_1.Counter(app, "Counter");
    var handler = (0, core_1.lift)({ my_counter: counter })
        .grant({ my_counter: [cloud_1.CounterInflightMethods.INC] })
        .inflight(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.my_counter.inc(2)];
                case 1:
                    val = _a.sent();
                    console.log(val);
                    return [2 /*return*/];
            }
        });
    }); });
    new cloud_1.Function(app, "Function", handler);
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.sanitizeCode)(handler._toInflight())).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "google_cloudfunctions_function",
        "google_firestore_database",
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
(0, vitest_1.test)("inc() IAM permissions", function () {
    // GIVEN
    var app = new target_tf_gcp_1.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    var counter = new cloud_1.Counter(app, "Counter");
    var handler = (0, core_1.lift)({ my_counter: counter })
        .grant({ my_counter: [cloud_1.CounterInflightMethods.INC] })
        .inflight(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.my_counter.inc(2)];
                case 1:
                    val = _a.sent();
                    console.log(val);
                    return [2 /*return*/];
            }
        });
    }); });
    new cloud_1.Function(app, "Function", handler);
    var output = app.synth();
    // THEN
    checkDatastorePermissions(output, [
        "datastore.entities.get",
        "datastore.entities.create",
        "datastore.entities.update",
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("dec() IAM permissions", function () {
    // GIVEN
    var app = new target_tf_gcp_1.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    var counter = new cloud_1.Counter(app, "Counter");
    var handler = (0, core_1.lift)({ my_counter: counter })
        .grant({ my_counter: [cloud_1.CounterInflightMethods.DEC] })
        .inflight(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.my_counter.dec(2)];
                case 1:
                    val = _a.sent();
                    console.log(val);
                    return [2 /*return*/];
            }
        });
    }); });
    new cloud_1.Function(app, "Function", handler);
    var output = app.synth();
    // THEN
    checkDatastorePermissions(output, [
        "datastore.entities.get",
        "datastore.entities.create",
        "datastore.entities.update",
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("peek() IAM permissions", function () {
    // GIVEN
    var app = new target_tf_gcp_1.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    var counter = new cloud_1.Counter(app, "Counter");
    var handler = (0, core_1.lift)({ my_counter: counter })
        .grant({ my_counter: [cloud_1.CounterInflightMethods.PEEK] })
        .inflight(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.my_counter.peek()];
                case 1:
                    val = _a.sent();
                    console.log(val);
                    return [2 /*return*/];
            }
        });
    }); });
    new cloud_1.Function(app, "Function", handler);
    var output = app.synth();
    // THEN
    checkDatastorePermissions(output, [
        "datastore.entities.get",
        "datastore.entities.create",
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("set() IAM permissions", function () {
    // GIVEN
    var app = new target_tf_gcp_1.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    var counter = new cloud_1.Counter(app, "Counter");
    var handler = (0, core_1.lift)({ my_counter: counter })
        .grant({ my_counter: [cloud_1.CounterInflightMethods.SET] })
        .inflight(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.my_counter.set(1)];
                case 1:
                    val = _a.sent();
                    console.log(val);
                    return [2 /*return*/];
            }
        });
    }); });
    new cloud_1.Function(app, "Function", handler);
    var output = app.synth();
    // THEN
    checkDatastorePermissions(output, [
        "datastore.entities.create",
        "datastore.entities.update",
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
