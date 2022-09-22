const $cap = {};
async function $proc($cap, event) {
    event = JSON.parse(event);
    let processed = [];
    for (let i = 0; i < event.messages.length; i++) {
        if (event.messages[i] === "BAD MESSAGE") {
            throw new Error("ERROR");
        }
        processed.push(`Received: ${event.messages[i]}`);
    }
    return processed;
}
exports.handler = async function(event) {
    return await $proc($cap, event);
};
