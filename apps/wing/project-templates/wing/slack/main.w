bring cloud;
bring slack;

/**
 * In this example, we will create a slack application that gives us updates about
 * a inbox bucket, sending slack messages when a new file is added. Additionally, the 
 * app will allow us to mention it with the text "list inbox" to get a list of all the
 * files in the inbox bucket.
 */
 
/// Since the slack bot will require a token as a secret please be sure 
/// to run `wing secrets` before trying this out. For help understanding how to create
/// a slack bot token see: https://github.com/winglang/winglibs/blob/main/slack/README.md
let botToken = new cloud.Secret(name: "slack-bot-token");
let slackBot = new slack.App(token: botToken);
let inbox = new cloud.Bucket() as "file-process-inbox";

/// When a file is created this event will post an update to slack (be sure to change it to a real slack channel name)
inbox.onCreate(inflight (key) => {
  let channel = slackBot.channel("INBOX_PROCESSING_CHANNEL");
  channel.post("New file: {key} was just uploaded to inbox!");
});


/// When our slack bot is mentioned, this event handler checks for "list inbox" in the 
/// events text, and then responds with a list of all files in the inbox
slackBot.onEvent("app_mention", inflight(ctx, event) => {
  let eventText = event["event"]["text"].asStr();
  log(eventText);
  if eventText.contains("list inbox") {
    let files = inbox.list();
    let message = new slack.Message();
    message.addSection({
      fields: [
        {
          type: slack.FieldType.mrkdwn,
          text: "*Current Inbox:*\n-{files.join("\n-")}"
        }
      ]
    });
    ctx.channel.postMessage(message);
  }
});