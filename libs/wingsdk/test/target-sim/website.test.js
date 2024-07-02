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
var fs_1 = require("fs");
var path_1 = require("path");
var vitest_1 = require("vitest");
var cloud = require("../../src/cloud");
var sim_app_1 = require("../sim-app");
(0, vitest_1.test)("website is serving static pages", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, websiteUrl, indexPage, aPage, bPage, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Website(app, "website", {
                    path: (0, path_1.resolve)(__dirname, "../test-files/website"),
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _d.sent();
                websiteUrl = getWebsiteUrl(s, "/website");
                return [4 /*yield*/, fetch(websiteUrl)];
            case 2:
                indexPage = _d.sent();
                return [4 /*yield*/, fetch("".concat(websiteUrl, "/b.html"))];
            case 3:
                aPage = _d.sent();
                return [4 /*yield*/, fetch("".concat(websiteUrl, "/inner-folder/a.html"))];
            case 4:
                bPage = _d.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 5:
                // THEN
                _d.sent();
                _a = vitest_1.expect;
                return [4 /*yield*/, indexPage.text()];
            case 6:
                _a.apply(void 0, [_d.sent()]).toEqual((0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, "../test-files/website/index.html"), {
                    encoding: "utf-8",
                }));
                _b = vitest_1.expect;
                return [4 /*yield*/, aPage.text()];
            case 7:
                _b.apply(void 0, [_d.sent()]).toEqual((0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, "../test-files/website/b.html"), {
                    encoding: "utf-8",
                }));
                _c = vitest_1.expect;
                return [4 /*yield*/, bPage.text()];
            case 8:
                _c.apply(void 0, [_d.sent()]).toEqual((0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, "../test-files/website/inner-folder/a.html"), {
                    encoding: "utf-8",
                }));
                return [2 /*return*/];
        }
    });
}); });
function getWebsiteUrl(s, path) {
    var apiAttrs = s.getResourceConfig(path).attrs;
    return apiAttrs.url;
}
(0, vitest_1.test)("website is serving dynamic json content", function () { return __awaiter(void 0, void 0, void 0, function () {
    var jsonConfig, jsonPath, app, website, s, websiteUrl, configPage, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                jsonConfig = { version: "3.3.5" };
                jsonPath = "config.json";
                app = new sim_app_1.SimApp();
                website = new cloud.Website(app, "website", {
                    path: (0, path_1.resolve)(__dirname, "../test-files/website"),
                });
                website.addJson(jsonPath, Object(jsonConfig));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _b.sent();
                websiteUrl = getWebsiteUrl(s, "/website");
                return [4 /*yield*/, fetch("".concat(websiteUrl, "/").concat(jsonPath))];
            case 2:
                configPage = _b.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _b.sent();
                _a = vitest_1.expect;
                return [4 /*yield*/, configPage.json()];
            case 4:
                _a.apply(void 0, [_b.sent()]).toEqual(jsonConfig);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("website is serving dynamic content", function () { return __awaiter(void 0, void 0, void 0, function () {
    var fileContent, route, app, website, s, websiteUrl, configPage, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                fileContent = "<html>hello world!</html>";
                route = "addition.html";
                app = new sim_app_1.SimApp();
                website = new cloud.Website(app, "website", {
                    path: (0, path_1.resolve)(__dirname, "../test-files/website"),
                });
                website.addFile(route, fileContent, { contentType: "text/html" });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _b.sent();
                websiteUrl = getWebsiteUrl(s, "/website");
                return [4 /*yield*/, fetch("".concat(websiteUrl, "/").concat(route))];
            case 2:
                configPage = _b.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _b.sent();
                _a = vitest_1.expect;
                return [4 /*yield*/, configPage.text()];
            case 4:
                _a.apply(void 0, [_b.sent()]).toEqual(fileContent);
                (0, vitest_1.expect)(configPage.headers.get("content-type")).toContain("text/html");
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api.url is resolved in website config", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, api, website, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "api");
                website = new cloud.Website(app, "website", {
                    path: (0, path_1.resolve)(__dirname, "../test-files/website"),
                });
                website.addJson("config.json", { apiUrl: api.url });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                (0, vitest_1.expect)(s.getResourceConfig("/website")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                        url: vitest_1.expect.any(String),
                    },
                    path: "root/website",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        fileRoutes: {
                            "config.json": {
                                contentType: "application/json",
                                data: vitest_1.expect.stringMatching(/{"apiUrl":"http:\/\/127.0.0.1:\d+"}/),
                            },
                        },
                        staticFilesPath: vitest_1.expect.any(String),
                    },
                    type: cloud.WEBSITE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("multiple tokens are resolved in website config", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, api1, api2, website, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                api1 = new cloud.Api(app, "api1");
                api2 = new cloud.Api(app, "api2");
                website = new cloud.Website(app, "website", {
                    path: (0, path_1.resolve)(__dirname, "../test-files/website"),
                });
                website.addJson("config.json", {
                    api1: api1.url,
                    api2: api2.url,
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                (0, vitest_1.expect)(s.getResourceConfig("/website")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                        url: vitest_1.expect.any(String),
                    },
                    path: "root/website",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        fileRoutes: {
                            "config.json": {
                                contentType: "application/json",
                                data: vitest_1.expect.stringMatching(/{"api1":"http:\/\/127.0.0.1:\d+","api2":"http:\/\/127.0.0.1:\d+"}/),
                            },
                        },
                        staticFilesPath: vitest_1.expect.any(String),
                    },
                    type: cloud.WEBSITE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("addJson throws an error for no json path", function () { return __awaiter(void 0, void 0, void 0, function () {
    var jsonConfig, jsonPath, app, website;
    return __generator(this, function (_a) {
        jsonConfig = { version: "3.3.5" };
        jsonPath = "not a json Path";
        app = new sim_app_1.SimApp();
        website = new cloud.Website(app, "website", {
            path: (0, path_1.resolve)(__dirname, "../test-files/website"),
        });
        (0, vitest_1.expect)(function () {
            website.addJson(jsonPath, Object(jsonConfig));
        }).toThrowError('key must have a .json suffix. (current: "not a json Path")');
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("custom error page", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, website, s, websiteUrl, errorPage, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                app = new sim_app_1.SimApp();
                website = new cloud.Website(app, "website", {
                    path: (0, path_1.resolve)(__dirname, "../test-files/website"),
                    errorDocument: "b.html",
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _b.sent();
                websiteUrl = getWebsiteUrl(s, "/website");
                return [4 /*yield*/, fetch("".concat(websiteUrl, "/page123"))];
            case 2:
                errorPage = _b.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _b.sent();
                _a = vitest_1.expect;
                return [4 /*yield*/, errorPage.text()];
            case 4:
                _a.apply(void 0, [_b.sent()]).toEqual((0, fs_1.readFileSync)((0, path_1.resolve)(__dirname, "../test-files/website/b.html"), {
                    encoding: "utf-8",
                }));
                return [2 /*return*/];
        }
    });
}); });
