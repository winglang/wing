bring cloud;

let b = new cloud.Bucket() as "Eyal Keren";
let q1 = new cloud.Queue() as "q1";
let q2 = new cloud.Queue() as "q2";

q1.on_message(inflight (m:str): str => {
  b.put("1.txt", "Hello, ${m}"); 
})

q2.on_message(inflight (m:str): str => {
  b.put("2.txt", "Hello, ${m}"); 
});
