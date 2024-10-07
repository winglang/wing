// This file was auto generated from an example found in: 14-async-functions.md_example_1
// Example metadata: {"valid":true}
bring cloud;
bring util;

// defining a cloud.Function resource
let countWords = new cloud.Function(inflight (payload: Json?): Json => {
  return "{payload?.tryAsStr()?.split(" ")?.length ?? 0}";
}) as "countWords";

// simulate a long running task, to run async
let longTask = new cloud.Function(inflight () => {
  util.sleep(30s);
  log("done!");
});

new cloud.Function(inflight () => {
  let sentence = "I am a sentence with 7 words";
  // invoking cloud.Function from inflight context
  let wordsCount = countWords.invoke(sentence);
  log("'{sentence}' has {wordsCount ?? "0"} words");

  // invokes async
  longTask.invokeAsync("");
  
  // continue to execute
  log("task started");
}) as "Invoke Me";
