const fetch = require("node-fetch");

exports.makeId = function() {
    let id = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return id;
}

exports.fetch = async function(url, method, body) {
    const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            "Content-Type": "application/json"
        }
    });
    const text = await response.text();
    return text;
}
