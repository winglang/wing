// This file was auto generated from an example found in: function.md_example_1
// Example metadata: {"valid":true}
bring cloud;
bring util;

// defining a cloud.Function resource
let countWords = new cloud.Function(inflight (s: Json?): Json => {
  return "{s.tryAsStr()?.split(" ")?.length ?? 0}";
}) as "countWords";

let longTask = new cloud.Function(inflight () => {
  util.sleep(30s);
  log("done!");
});

new cloud.Function(inflight () => {
  let sentence = "I am a sentence with 7 words";
  // invoking cloud.Function from inflight context
  let wordsCount = countWords.invoke(sentence);
  log("'{sentence}' has {wordsCount ?? "0"} words");

  longTask.invokeAsync("");
  log("task started");
}) as "Invoke Me";
