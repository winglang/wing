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
var util_1 = require("./util");
var ex = require("../../src/ex");
var sim_app_1 = require("../sim-app");
(0, vitest_1.test)("create a table", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, t, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                t = new ex.Table(app, "my_table", {
                    name: "new_table",
                    columns: {
                        name: ex.ColumnType.STRING,
                        age: ex.ColumnType.NUMBER,
                    },
                    primaryKey: "id",
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                (0, vitest_1.expect)(s.getResourceConfig("/my_table")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_table",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        name: "new_table",
                        columns: {
                            name: ex.ColumnType.STRING,
                            age: ex.ColumnType.NUMBER,
                        },
                        primaryKey: "id",
                        initialRows: {},
                    },
                    type: ex.TABLE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("insert row", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, t, s, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                t = new ex.Table(app, "my_table", {
                    name: "my_insert_table",
                    columns: {
                        name: ex.ColumnType.STRING,
                        age: ex.ColumnType.NUMBER,
                    },
                    primaryKey: "id",
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_table");
                return [4 /*yield*/, client.insert("joe-id", { name: "Joe Doe", age: 50 })];
            case 2:
                _a.sent();
                (0, vitest_1.expect)(s.getResourceConfig("/my_table")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_table",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        name: "my_insert_table",
                        columns: {
                            name: ex.ColumnType.STRING,
                            age: ex.ColumnType.NUMBER,
                        },
                        primaryKey: "id",
                        initialRows: {},
                    },
                    type: ex.TABLE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 3:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("get row", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, t, s, client, KEY, joe;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                t = new ex.Table(app, "my_table", {
                    name: "my_get_table",
                    columns: {
                        name: ex.ColumnType.STRING,
                        age: ex.ColumnType.NUMBER,
                    },
                    primaryKey: "id",
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_table");
                KEY = "joe-id";
                return [4 /*yield*/, client.insert(KEY, { name: "Joe Doe", age: 50 })];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.get(KEY)];
            case 3:
                joe = _a.sent();
                (0, vitest_1.expect)(joe).toEqual({ id: "joe-id", name: "Joe Doe", age: 50 });
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.get("NON_EXISTENT_KEY"); }).rejects.toThrowError(/Row does not exist/)];
            case 4:
                _a.sent();
                (0, vitest_1.expect)(s.getResourceConfig("/my_table")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_table",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        name: "my_get_table",
                        columns: {
                            name: ex.ColumnType.STRING,
                            age: ex.ColumnType.NUMBER,
                        },
                        primaryKey: "id",
                        initialRows: {},
                    },
                    type: ex.TABLE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 5:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGet row", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, t, s, client, KEY, joe, nonExistentRow;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                t = new ex.Table(app, "my_table", {
                    name: "my_get_table",
                    columns: {
                        name: ex.ColumnType.STRING,
                        age: ex.ColumnType.NUMBER,
                    },
                    primaryKey: "id",
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_table");
                KEY = "joe-id";
                return [4 /*yield*/, client.insert(KEY, { name: "Joe Doe", age: 50 })];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.tryGet(KEY)];
            case 3:
                joe = _a.sent();
                (0, vitest_1.expect)(joe).toEqual({ id: "joe-id", name: "Joe Doe", age: 50 });
                return [4 /*yield*/, client.tryGet("NON_EXISTENT_KEY")];
            case 4:
                nonExistentRow = _a.sent();
                (0, vitest_1.expect)(nonExistentRow).toEqual(undefined);
                (0, vitest_1.expect)(s.getResourceConfig("/my_table")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_table",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        name: "my_get_table",
                        columns: {
                            name: ex.ColumnType.STRING,
                            age: ex.ColumnType.NUMBER,
                        },
                        primaryKey: "id",
                        initialRows: {},
                    },
                    type: ex.TABLE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 5:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("update row", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, t, s, client, joe;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                t = new ex.Table(app, "my_table", {
                    name: "my_update_table",
                    columns: {
                        name: ex.ColumnType.STRING,
                        age: ex.ColumnType.NUMBER,
                    },
                    primaryKey: "id",
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_table");
                return [4 /*yield*/, client.insert("joe-id", { name: "Joe Doe", age: 50 })];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.get("joe-id")];
            case 3:
                joe = _a.sent();
                (0, vitest_1.expect)(joe).toEqual({ id: "joe-id", name: "Joe Doe", age: 50 });
                return [4 /*yield*/, client.update("joe-id", { age: 51 })];
            case 4:
                _a.sent();
                return [4 /*yield*/, client.get("joe-id")];
            case 5:
                joe = _a.sent();
                (0, vitest_1.expect)(joe).toEqual({ id: "joe-id", name: "Joe Doe", age: 51 });
                (0, vitest_1.expect)(s.getResourceConfig("/my_table")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_table",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        name: "my_update_table",
                        columns: {
                            name: ex.ColumnType.STRING,
                            age: ex.ColumnType.NUMBER,
                        },
                        primaryKey: "id",
                        initialRows: {},
                    },
                    type: ex.TABLE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 6:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("list table", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, t, s, client, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                t = new ex.Table(app, "my_table", {
                    name: "my_list_table",
                    columns: {
                        name: ex.ColumnType.STRING,
                        age: ex.ColumnType.NUMBER,
                    },
                    primaryKey: "id",
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_table");
                return [4 /*yield*/, client.insert("joe-id", { name: "Joe Doe", age: 50 })];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.insert("jane-id", { name: "Jane Doe", age: 45 })];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.list()];
            case 4:
                list = _a.sent();
                (0, vitest_1.expect)(list[0]).toEqual({ id: "joe-id", name: "Joe Doe", age: 50 });
                (0, vitest_1.expect)(list[1]).toEqual({ id: "jane-id", name: "Jane Doe", age: 45 });
                (0, vitest_1.expect)(s.getResourceConfig("/my_table")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_table",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        name: "my_list_table",
                        columns: {
                            name: ex.ColumnType.STRING,
                            age: ex.ColumnType.NUMBER,
                        },
                        primaryKey: "id",
                        initialRows: {},
                    },
                    type: ex.TABLE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 5:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("inserting the same id twice", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, t, s, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                t = new ex.Table(app, "my_table", {
                    name: "my_insert_twice_table",
                    columns: {
                        name: ex.ColumnType.STRING,
                    },
                    primaryKey: "id",
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_table");
                return [4 /*yield*/, client.insert("joe-id", { name: "Joe Doe" })];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, vitest_1.expect)(function () {
                        return client.insert("joe-id", { name: "Joe Doe II" });
                    }).rejects.toThrow("The primary key \"joe-id\" already exists in the \"my_insert_twice_table\" table.")];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("update non-existent item", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, t, s, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                t = new ex.Table(app, "my_table", {
                    name: "my_update_non_existent_table",
                    columns: {
                        name: ex.ColumnType.STRING,
                    },
                    primaryKey: "id",
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_table");
                return [4 /*yield*/, (0, vitest_1.expect)(function () {
                        return client.update("joe-id", { name: "Joe Doe" });
                    }).rejects.toThrow("The primary key \"joe-id\" was not found in the \"my_update_non_existent_table\" table.")];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("deleting non-existent item", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, t, s, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                t = new ex.Table(app, "my_table", {
                    name: "my_delete_non_existent_table",
                    columns: {
                        name: ex.ColumnType.STRING,
                    },
                    primaryKey: "id",
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_table");
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.delete("joe-id"); }).rejects.toThrow("The primary key \"joe-id\" not found in the \"my_delete_non_existent_table\" table.")];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("can add row in preflight", function () { return __awaiter(void 0, void 0, void 0, function () {
    var KEY, ROW, app, table, s, client, joe;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                KEY = "joe-id";
                ROW = { name: "Joe Doe", age: 50 };
                app = new sim_app_1.SimApp();
                table = new ex.Table(app, "my_table", {
                    name: "my_addrow_table",
                    columns: {
                        name: ex.ColumnType.STRING,
                        age: ex.ColumnType.NUMBER,
                    },
                    primaryKey: "id",
                    initialRows: {},
                });
                table.addRow(KEY, ROW);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_table");
                return [4 /*yield*/, client.get("joe-id")];
            case 2:
                joe = _a.sent();
                (0, vitest_1.expect)(joe).toEqual({ name: "Joe Doe", age: 50, id: KEY });
                (0, vitest_1.expect)(s.getResourceConfig("/my_table")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_table",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        name: "my_addrow_table",
                        columns: {
                            name: ex.ColumnType.STRING,
                            age: ex.ColumnType.NUMBER,
                        },
                        primaryKey: "id",
                        initialRows: {
                            "joe-id": { name: "Joe Doe", age: 50, id: KEY },
                        },
                    },
                    type: ex.TABLE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 3:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
