bring cloud;

let b = new cloud.Bucket() as "Eyal Keren";
let q1 = new cloud.Queue() as "q1";
let q2 = new cloud.Queue() as "q2";

q1.addConsumer(inflight (m:str): str => {
  b.put("1.txt", "Hello, ${m}"); 
})
//^ Expected ';'

q2.addConsumer(inflight (m:str): str => {
  b.put("2.txt", "Hello, ${m}"); 
});

let x = 5
      //^ ';' expected

if (x > 10) {
           //^ '}' expected