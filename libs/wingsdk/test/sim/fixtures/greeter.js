const $cap = {};
async function $proc($cap, event) {
    event = JSON.parse(event);
    let msg = "Hello, " + event.name + "!";
    if (process.env.TEST_VAR_1) {
        msg += " What's up?";
    }
    return { msg };
}
exports.handler = async function(event) {
    return await $proc($cap, event);
};
