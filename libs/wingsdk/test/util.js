"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkdtemp = exports.sanitizeCode = exports.sanitizePaths = exports.directorySnapshot = exports.appSnapshot = exports.tfSanitize = exports.getTfDataSource = exports.getTfResource = exports.tfResourcesWithProperty = exports.tfDataSourcesOfCount = exports.tfResourcesOfCount = exports.tfDataSourcesOf = exports.tfResourcesOf = exports.treeJsonOf = void 0;
var fs_1 = require("fs");
var os_1 = require("os");
var path_1 = require("path");
function treeJsonOf(outdir) {
    return JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(outdir, "tree.json"), "utf8"));
}
exports.treeJsonOf = treeJsonOf;
function tfResourcesOf(templateStr) {
    return Object.keys(JSON.parse(templateStr).resource).sort();
}
exports.tfResourcesOf = tfResourcesOf;
function tfDataSourcesOf(templateStr) {
    return Object.keys(JSON.parse(templateStr).data).sort();
}
exports.tfDataSourcesOf = tfDataSourcesOf;
function tfResourcesOfCount(templateStr, resourceId) {
    var template = JSON.parse(templateStr);
    var resource = template.resource[resourceId];
    if (!resource) {
        return 0;
    }
    return Object.values(resource).length;
}
exports.tfResourcesOfCount = tfResourcesOfCount;
function tfDataSourcesOfCount(templateStr, dataSourceId) {
    var template = JSON.parse(templateStr);
    var dataSource = template.data[dataSourceId];
    if (!dataSource) {
        return 0;
    }
    return Object.values(dataSource).length;
}
exports.tfDataSourcesOfCount = tfDataSourcesOfCount;
function tfResourcesWithProperty(templateStr, resourceId, properties) {
    return Object.values(JSON.parse(templateStr).resource[resourceId]).find(function (resource) {
        for (var key in properties) {
            if (resource[key] !== properties[key]) {
                return false;
            }
        }
        return true;
    });
}
exports.tfResourcesWithProperty = tfResourcesWithProperty;
function getTfResource(templateStr, resourceId, index) {
    var resources = JSON.parse(templateStr).resource[resourceId];
    if (!resources) {
        return undefined;
    }
    var key = Object.keys(resources)[index !== null && index !== void 0 ? index : 0];
    return resources[key];
}
exports.getTfResource = getTfResource;
function getTfDataSource(templateStr, dataSourceId, index) {
    var dataSources = JSON.parse(templateStr).data[dataSourceId];
    if (!dataSources) {
        return undefined;
    }
    var key = Object.keys(dataSources)[index !== null && index !== void 0 ? index : 0];
    return dataSources[key];
}
exports.getTfDataSource = getTfDataSource;
function tfSanitize(templateStr) {
    // remove names of assets whose hashes are sensitive to changes based
    // on the file system layout
    return JSON.parse(templateStr, function (key, value) {
        if (key === "key" &&
            typeof value === "string" &&
            value.match(/^asset\..*\.zip$/)) {
            return "<key>";
        }
        if (key === "source" &&
            typeof value === "string" &&
            (value.match(/^assets\/.*\/archive.zip$/) || (0, path_1.isAbsolute)(value))) {
            return "<source>";
        }
        if (key === "source_hash" &&
            typeof value === "string" &&
            value.startsWith("${filemd5")) {
            return "${filemd5(<source>)}";
        }
        return value;
    });
}
exports.tfSanitize = tfSanitize;
function appSnapshot(app) {
    app.synth();
    return directorySnapshot(app.outdir);
}
exports.appSnapshot = appSnapshot;
function directorySnapshot(initialRoot) {
    var snapshot = {};
    var visit = function (root, subdir, prefix) {
        if (prefix === void 0) { prefix = ""; }
        var files = (0, fs_1.readdirSync)((0, path_1.join)(root, subdir));
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var f = files_1[_i];
            // skip node_modules because we are symlinking them into sim apps
            if (f === "node_modules") {
                continue;
            }
            // skip sandbox entrypoints since they are mostly a duplicate of the original
            if (f.endsWith(".sandbox.cjs")) {
                continue;
            }
            // skip esbuild output
            if (f.endsWith(".cjs.bundle")) {
                continue;
            }
            var relpath = (0, path_1.join)(subdir, f);
            var abspath = (0, path_1.join)(root, relpath);
            var key = prefix + relpath;
            if ((0, fs_1.statSync)(abspath).isDirectory()) {
                // ignore .state files
                if ((0, path_1.basename)(abspath) !== ".state") {
                    visit(root, relpath);
                }
            }
            else {
                switch ((0, path_1.extname)(f)) {
                    case ".json":
                        var data = (0, fs_1.readFileSync)(abspath, "utf-8");
                        snapshot[key] = JSON.parse(data);
                        if (key.endsWith("simulator.json")) {
                            snapshot[key] = sanitizePaths(snapshot[key]);
                        }
                        break;
                    case ".cjs":
                    case ".js":
                        var code = (0, fs_1.readFileSync)(abspath, "utf-8");
                        snapshot[key] = sanitizeCode(code);
                        break;
                    default:
                        snapshot[key] = (0, fs_1.readFileSync)(abspath, "utf-8");
                }
            }
        }
    };
    visit(initialRoot, ".");
    return snapshot;
}
exports.directorySnapshot = directorySnapshot;
function sanitizePaths(json) {
    // replace all values in the JSON that look like absolute paths with a placeholder of "<ABSOLUTE PATH>"
    for (var _i = 0, _a = Object.keys(json); _i < _a.length; _i++) {
        var key = _a[_i];
        if (typeof json[key] === "string") {
            if ((0, path_1.isAbsolute)(json[key]) && key !== "pathPattern") {
                json[key] = "<ABSOLUTE PATH>/".concat((0, path_1.basename)(json[key]));
            }
        }
        else if (typeof json[key] === "object") {
            json[key] = sanitizePaths(json[key]);
        }
    }
    return json;
}
exports.sanitizePaths = sanitizePaths;
/**
 * Sanitize the text of a code bundle to remove path references that are system-specific.
 */
function sanitizeCode(code) {
    function removeAbsolutePaths(text) {
        var regex = /"[^"]+?\/libs\/wingsdk\/(.+?)"/g;
        // replace first group with static text
        return text.replace(regex, '"[REDACTED]/wingsdk/$1"');
    }
    return removeAbsolutePaths(code);
}
exports.sanitizeCode = sanitizeCode;
function mkdtemp() {
    return (0, fs_1.mkdtempSync)((0, path_1.join)((0, os_1.tmpdir)(), "wingsdk."));
}
exports.mkdtemp = mkdtemp;
