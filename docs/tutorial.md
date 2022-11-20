# The Very Official Wing Tutorial

Hello there! So you heard that there's this shiny new programming language, and
of course, you gotta check it out and see what's all the fuss about. You got to
the right place!

This tutorial will take you on a fun journey. At the end of this journey not
only you'll be able to start writing Wing code, but you'll also understand why
Wing is special and what makes it "cloud oriented".

Currently, this tutorial assumes you have some background in object-oriented
programming. If you still don't have such background, fear not! Everybody can
learn how to program. We recommend [TBD] as a great starting point.

So without further ado, let's get this party started.

### You are not alone!

Your first task in this tutorial is to pop into the [winglang slack] and post a
ceremonious message into the [#tutorial] channel. Something like this:

```text
Hello everyone! 👋 I am about to start the Wing tutorial
This weird tutorial tells me that I need to post this message here so here I am posting this message. 
I guess this means that I can also ask some questions as I go through the tutorial here, which is kind of cool.
So hi!
```

### Install 'em

OK, next we'll need to get those nice little wingy bits into your system. 

You'll need [Node.js](https://nodejs.org) >= 18.x and then you can just:

```console
$ npm i -g @winglang/wing
$ wing --version
```

We also recommend installing the [wing vscode
extension](https://github.com/winglang/wing/releases/latest/download/vscode-wing.vsix).

Run into any issues? [#tutorial] is your friend.

### To do or not to do?

So what are we going to build here? A "TO DO" app of course! As much as it is
lame and boring and over used, it's still a great way to learn a new language.

So we are going with "To Do".

Like with any good old backend, let's start by defining the public REST API of
our app:

* `GET /tasks` - return all the tasks in our list.
* `POST /tasks` - adds an task to the list.
* `GET /tasks/:id` - returns a specific task.
* `PUT /tasks/:id` - updates a task in our list (e.g. set it to "done").
* `DELETE /tasks/:id` - delete a task from the list.

A task is a JSON object that includes two fields: a textual `title` and a
boolean `completed` (optional).

Let's create a new task:

```json
POST /tasks
Body: { "title": "my first task" }

Response:
{
  "id": "1",
  "title": "my first task",
  "completed": false
}
```

Now list all the tasks:

```json
GET /tasks

Response:
{
  "count": 1,
  "tasks": [
    {
      "id": "1",
      "title": "my first task",
      "completed": false
    }
  ]
}
```

Update the task to completed:

```json
PUT /tasks/1
{
  "completed": true
}

Response:
{
  "id": "1",
  "title": "my first task",
  "completed": true
}
```

And so on... You got the drift.

### OK, let's get this party going...

Create a file called `todo.w` with the following code:

```rust
bring cloud;

let api = new cloud.Api();

api.on_post("/tasks", (req: cloud.ApiRequest) ~> {
  print("creating a task");
});
```

The above code defines a REST API with a single POST route to it that matches
the `/tasks` URL.

You might have noticed this quirky notation `~>`. We used it to define the
function literal for our POST handler. This tiny little thing is one of the most
important and unique things about the wing language called **inflight
functions**.

But before we explain what inflight functions are (we also call them
"inflights"), let's take a step back and talk about what are cloud applications
anyway?

Here's **wing's definition** of cloud applications:

A cloud application is software that deeply leverages **cloud resources** in
order to perform its duties. A cloud resource is *any network-accessible
service*. These resources can be used to store data or files (like buckets),
process HTTP requests (like API gateways), distribute content (like CDNs),
publish notifications to mobile phones or run user-defined code (such as Lambda
functions or Kubernetes deployments). Cloud providers such as AWS, GCP and Azure
offer a basic set of resources (similar to how an operating system offers a
basic set of resources to applications running on the machine), but that doesn't
imply that those are the only resources an application might use.

These managed services offer not only functional capabilities to applications,
but also many non-functional benefits such as high availability, elastic
scalability and reliability. By relying on cloud resources, developers are able
to innovate faster and focus on the direct value that their applications create
for users.

Wing is designed around this new programming paradigm, which we call
**cloud-oriented programming**.




One of the fundamental differences between applications that run on a single
machine (we shall call them from now on "traditional apps") and applications
that run on the cloud is that such applications are distributed. My code gets
executed on different compute platform such as FaaS platforms, containers, CI/CD
jobs, etc.


But the fact that they are distributed and execute across multiple platforms
doesn't mean they are not an integral part of my application.

In fact, wing takes the complete opposite approach! Wing applications are
distributed by nature. The code you write that handles events that occur in your
application (in this case a `/POST tasks` request was received) can be executed
anywhere in the cloud (we will see how we can even control where), but from an
application developer's perspective, that doesn't change the intention or the
high level mental model of what we are trying to say.









### Modeling

Let's create a file called `todo.w` with the following code:

```ts
struct Task {
  title: str;
  completed: bool?;
}

struct TaskItem extends Task {
  id: str;
}
```

So what's going on here?

We are declaring a couple of data types. In Wing, those are called "structs".
They are basically a way to represent type-safe data schemas.

We start with the `Task` struct which has two fields: `title` (of type `str`,
which is a string, dah) and `completed` of type `bool?`. The question mark
indicates that `completed` is an *optional field*, which means that it might or
might not appear in the data.

Here's how I can initialize something of type `Task`:

```rust
let t1 = Task { title: "Learn wing" };
let t2 = Task {
  title: "Take out the garbage",
  completed: true,
};

// we can use `assert` to make assertions anywhere
assert(t1.title == "Learn wing");

// `nil` means nothing, undefined, null, nada, none, ...
assert(t1.completed == nil);

// notice that `nil` is not the same as true or false
assert(t1.completed != true);
assert(t1.completed != false);

assert(t2.completed == true);
assert(t2.completed);
```

So far, should be quite straightforward.

The next struct we are declaring is `TaskItem` which is basically a `Task` with
an `id`. The `extends` keyword can be used to create compositions of structs.
Wing allows you to extend from multiple structs.


```ts
resource Tasks {
  public ~list(): TaskItem[] {

  }

  public ~add(task: Task): TaskItem {

  }

  public ~update(id: str, task: Task): void {

  }

  public ~delete(id: str): void {

  }
}
```

Now that you have the CLI installed, let's write some wing code:

Create a file called `simcity.w`:

```rust
bring cloud;

new cloud.Bucket();
```




Let's see what happens when we compile this:

```sh
wing compile simcity.w
```
















## Ready to start?

OK, now that we got all of that out of the way, I think we can get started with
the interesting stuff.







## The Usual Suspects

Before we dive into the cool stuff, let's cover all the basics at a quick
glance. This should look quite familiar and self explainatory so we'll breeze
through it.

### Comments

```rust
// one line comment

/*
  Multi
  Line
  Comment
*/
```

### Primitive types

```rust
let x: num = 12;      // yes, semicolons! we are in that camp.
let y: num = 56.4;    // both integers and floating points are "num", like in javascript
let s: str = "hello"; // only double quotes
let z: bool = true;
```

### Math

```rust
assert(12 * (2 + 88) / 4 - 1 == 269);
assert(13 / 5 == 2.6); // division
assert(13 % 5 == 5);   // modulo
assert(12 \ 5 == 2);   // floor division
assert(2 ^ 4 == 16);   // exponent
```

### Logic

```rust
assert(5 == 5); // equiality
assert(1 != 3); // inequility

// works for all primitive types (and more, see later)
assert("hello" == "hello");
assert(true != false);

// logical operators - the usual suspects
assert((10 > 3 && 6 <= 99) || !("hello" == "world"));
```

### Control Flow

```rust
// conditions
if x == y {
  print("branch1");
} elif h == "hello" {
  print("branch2");
} else {
  print("branch3");
}

// for loops
for x in iterable {
  break;    // break the loop
  continue; // skip to next iteration
}

// while loops
while condition {
  break;
  continue;
}
```



[winglang Slack]: https://join.slack.com/t/winglang/shared_invite/zt-1i7jb3pt3-lb0RKOSoLA1~pl6cBnP2tA
[#tutorial]: https://winglang.slack.com/archives/C04BPLGF0KC