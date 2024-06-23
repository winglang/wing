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
var client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
var aws_sdk_client_mock_1 = require("aws-sdk-client-mock");
require("aws-sdk-client-mock-jest");
var vitest_1 = require("vitest");
var secret_inflight_1 = require("../../src/shared-aws/secret.inflight");
var secretsManagerClientMock = (0, aws_sdk_client_mock_1.mockClient)(client_secrets_manager_1.SecretsManagerClient);
var SECRET_ARN = "arn:aws:secretsmanager:us-east-1:123456789012:secret:MySecret-gwMwkg";
var SECRET_VALUE = JSON.stringify({ key: "value" });
(0, vitest_1.beforeEach)(function () {
    secretsManagerClientMock.reset();
    secretsManagerClientMock
        .on(client_secrets_manager_1.GetSecretValueCommand)
        .resolves({ SecretString: SECRET_VALUE });
});
(0, vitest_1.test)("value", function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, secretValue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new secret_inflight_1.SecretClient(SECRET_ARN);
                return [4 /*yield*/, client.value()];
            case 1:
                secretValue = _a.sent();
                // THEN
                (0, vitest_1.expect)(secretsManagerClientMock).toHaveReceivedCommandTimes(client_secrets_manager_1.GetSecretValueCommand, 1);
                (0, vitest_1.expect)(secretsManagerClientMock).toHaveReceivedCommandWith(client_secrets_manager_1.GetSecretValueCommand, { SecretId: SECRET_ARN });
                (0, vitest_1.expect)(secretValue).toBe(SECRET_VALUE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("valueJson", function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, secretValue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new secret_inflight_1.SecretClient(SECRET_ARN);
                return [4 /*yield*/, client.valueJson()];
            case 1:
                secretValue = _a.sent();
                // THEN
                (0, vitest_1.expect)(secretValue).toEqual(JSON.parse(SECRET_VALUE));
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("caches the value", function () { return __awaiter(void 0, void 0, void 0, function () {
    var client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new secret_inflight_1.SecretClient(SECRET_ARN);
                return [4 /*yield*/, client.value()];
            case 1:
                _a.sent();
                return [4 /*yield*/, client.value()];
            case 2:
                _a.sent();
                // THEN
                (0, vitest_1.expect)(secretsManagerClientMock).toHaveReceivedCommandTimes(client_secrets_manager_1.GetSecretValueCommand, 1);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("can bypass cache", function () { return __awaiter(void 0, void 0, void 0, function () {
    var client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new secret_inflight_1.SecretClient(SECRET_ARN);
                return [4 /*yield*/, client.value()];
            case 1:
                _a.sent();
                return [4 /*yield*/, client.value({ cache: false })];
            case 2:
                _a.sent();
                // THEN
                (0, vitest_1.expect)(secretsManagerClientMock).toHaveReceivedCommandTimes(client_secrets_manager_1.GetSecretValueCommand, 2);
                return [2 /*return*/];
        }
    });
}); });
