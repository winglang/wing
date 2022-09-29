const $cap = {};
async function $proc($cap, event) {
    event = JSON.parse(event);
    let msg;
    if (process.env.PIG_LATIN) {
        msg = "Ellohay, " + event.name + "!";
    } else {
        msg = "Hello, " + event.name + "!";
    }
    return { msg };
}
exports.handler = async function(event) {
    return await $proc($cap, event);
};
