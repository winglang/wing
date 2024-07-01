exports.makeKey = function(name) {
    return "data/" + name + ".json";
}

exports.makeKeyInflight = exports.makeKey;
