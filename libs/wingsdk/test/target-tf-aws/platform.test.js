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
var client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
var aws_sdk_client_mock_1 = require("aws-sdk-client-mock");
var vitest_1 = require("vitest");
var cloud_1 = require("../../src/cloud");
var core_1 = require("../../src/core");
var platform_1 = require("../../src/platform");
var tfaws = require("../../src/target-tf-aws/platform");
var util_1 = require("../util");
require("aws-sdk-client-mock-jest");
var secretsManagerClientMock = (0, aws_sdk_client_mock_1.mockClient)(client_secrets_manager_1.SecretsManagerClient);
(0, vitest_1.describe)("tf-aws platform parameters", function () {
    var platformManager;
    var tempdir;
    var wingParametersFile;
    (0, vitest_1.beforeEach)(function () {
        platformManager = new platform_1.PlatformManager({ platformPaths: ["tf-aws"] });
        tempdir = (0, util_1.mkdtemp)();
        wingParametersFile = path_1.default.join(tempdir, "wing.json");
        process.env.WING_VALUES_FILE = wingParametersFile;
    });
    (0, vitest_1.test)("throws if private subnet ids are not an array", function () {
        // GIVEN
        var providedParameters = {
            "tf-aws": {
                vpc: "existing",
                vpc_id: "vpc-123",
                private_subnet_ids: "subnet-123",
            },
        };
        fs_1.default.writeFileSync(wingParametersFile, JSON.stringify(providedParameters));
        // WHEN
        var app = platformManager.createApp({
            outdir: tempdir,
            entrypointDir: tempdir,
        });
        // THEN
        (0, vitest_1.expect)(function () { return app.synth(); }).toThrow(/must be array/);
    });
    (0, vitest_1.test)("does not throw if private subnet ids are an array", function () {
        // GIVEN
        var providedParameters = {
            "tf-aws": {
                vpc: "existing",
                vpc_id: "vpc-123",
                private_subnet_ids: ["subnet-123"],
            },
        };
        fs_1.default.writeFileSync(wingParametersFile, JSON.stringify(providedParameters));
        // WHEN
        var app = platformManager.createApp({
            outdir: tempdir,
            entrypointDir: tempdir,
        });
        // THEN
        (0, vitest_1.expect)(function () { return app.synth(); }).not.toThrow();
    });
    (0, vitest_1.test)("require private subnet ids, when vpc = existing", function () {
        // GIVEN
        var providedParameters = {
            "tf-aws": {
                vpc: "existing",
                vpc_api_gateway: true,
                vpc_lambda: true,
            },
        };
        fs_1.default.writeFileSync(wingParametersFile, JSON.stringify(providedParameters));
        // WHEN
        var app = platformManager.createApp({
            outdir: tempdir,
            entrypointDir: tempdir,
        });
        // THEN
        (0, vitest_1.expect)(function () { return app.synth(); }).toThrow(/must have required property 'private_subnet_ids'/);
    });
    (0, vitest_1.test)("does not require public subnet ids, when vpc = existing", function () {
        // GIVEN
        var providedParameters = {
            "tf-aws": {
                vpc: "existing",
                vpc_id: "vpc-123",
                private_subnet_ids: ["subnet-123"],
            },
        };
        fs_1.default.writeFileSync(wingParametersFile, JSON.stringify(providedParameters));
        // WHEN
        var app = platformManager.createApp({
            outdir: tempdir,
            entrypointDir: tempdir,
        });
        // THEN
        (0, vitest_1.expect)(function () { return app.synth(); }).not.toThrow();
    });
    (0, vitest_1.test)("all private subnets are used when creating functions", function () {
        // GIVEN
        var providedParameters = {
            "tf-aws": {
                vpc: "existing",
                vpc_id: "vpc-123",
                private_subnet_ids: ["subnet-123", "subnet-456"],
                vpc_lambda: true,
            },
        };
        fs_1.default.writeFileSync(wingParametersFile, JSON.stringify(providedParameters));
        // WHEN
        var app = platformManager.createApp({
            outdir: tempdir,
            entrypointDir: tempdir,
        });
        new cloud_1.Function(app, "Function", (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, undefined];
            });
        }); }));
        // THEN
        var output = app.synth();
        var tfFunction = JSON.parse(output).resource.aws_lambda_function.Function;
        (0, vitest_1.expect)(tfFunction.vpc_config.subnet_ids.length).toEqual(2);
    });
});
(0, vitest_1.describe)("tf-aws platoform storeSecrets", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, vitest_1.beforeEach)(function () {
            secretsManagerClientMock.reset();
            secretsManagerClientMock.on(client_secrets_manager_1.CreateSecretCommand).callsFake(function (command) {
                return {};
            });
            secretsManagerClientMock.on(client_secrets_manager_1.UpdateSecretCommand).callsFake(function (command) {
                return {};
            });
        });
        (0, vitest_1.describe)("when secret does not exist", function () {
            (0, vitest_1.beforeEach)(function () {
                secretsManagerClientMock.on(client_secrets_manager_1.GetSecretValueCommand).rejects({
                    name: "ResourceNotFoundException",
                    message: "Secret does not exist",
                });
            });
            (0, vitest_1.test)("stores secrets in plain text", function () { return __awaiter(void 0, void 0, void 0, function () {
                var platform, secrets;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            platform = new tfaws.Platform();
                            secrets = { secret1: "value1" };
                            // WHEN
                            return [4 /*yield*/, platform.storeSecrets(secrets)];
                        case 1:
                            // WHEN
                            _a.sent();
                            // THEN
                            (0, vitest_1.expect)(secretsManagerClientMock).toHaveReceivedCommandTimes(client_secrets_manager_1.CreateSecretCommand, 1);
                            (0, vitest_1.expect)(secretsManagerClientMock).toHaveReceivedCommandWith(client_secrets_manager_1.CreateSecretCommand, { SecretString: "value1" });
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        (0, vitest_1.describe)("when secret exists", function () {
            (0, vitest_1.beforeEach)(function () {
                secretsManagerClientMock.on(client_secrets_manager_1.GetSecretValueCommand).resolves({});
            });
            (0, vitest_1.test)("updates existing secrets", function () { return __awaiter(void 0, void 0, void 0, function () {
                var platform, secrets;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            platform = new tfaws.Platform();
                            secrets = { secret1: "value1" };
                            // WHEN
                            return [4 /*yield*/, platform.storeSecrets(secrets)];
                        case 1:
                            // WHEN
                            _a.sent();
                            // THEN
                            (0, vitest_1.expect)(secretsManagerClientMock).toHaveReceivedCommandTimes(client_secrets_manager_1.UpdateSecretCommand, 1);
                            (0, vitest_1.expect)(secretsManagerClientMock).toHaveReceivedCommandWith(client_secrets_manager_1.UpdateSecretCommand, { SecretString: "value1" });
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        return [2 /*return*/];
    });
}); });
