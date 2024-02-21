---
title: React, Vite & Websockets 
id: react-vite-websockets
keywords: [Websockets, React, Vite, Local, Wing]
---

# React, Vite & Websockets 

In this guide, we will build a simple React web application with a Wing backend.

The webapp will have a counter that can be incremented by clicking on it. This counter will increment a distributed counter deployed via the Wing backend. We will also demonstrate how to use websockets in order to get real-time updates from the backend every time the counter is updated from any other webpage.

## Prerequisites

- Node.js v20 or later.
- Wing supports two popular IDEs with syntax highlighting, completions, go-to-definition and an embedded Wing Simulator:

  - [VSCode](https://marketplace.visualstudio.com/items?itemName=Monada.vscode-wing) - Official extension
  - [IntelliJ](https://plugins.jetbrains.com/plugin/22353-wing) - Community extension

## Step 1 - Installation & Scaffolding
In this step, we will be creating our project.


### Creating a React App with Vite

1. Create the root project folder:
 ```sh
 mkdir ~/shared-counter
 cd ~/shared-counter
 ```
2. Create a new React app using Vite under the frontend folder:
 ```sh
 npm create vite frontend -- --template react-ts
 ```
3. Run your React app and ensure it works:
 ```sh
 cd frontend
 npm install
 npm run dev
 ```
> The result should be a very simple webpage that runs locally and works without any backend (note the counter is not shared between tabs).

4. Press Ctrl-C to return to the CLI prompt.

### Creating a Wing backend

1. Install Wing:
 ```sh
 npm install -g winglang
 # Verify installation
 wing -V 
 ```
2. Create a `backend` directory under the project root:
 ```sh
 mkdir ~/shared-counter/backend
 cd ~/shared-counter/backend
 ```
3. Generate a new empty Wing project:
 ```sh
 wing new empty
 ```
> This will generate three files: `package.json`, `package-lock.json` and `main.w` file with a simple hello-world `Cloud.Function`
4. Run this project inside Wing Simulator
```sh
wing run main.w
```
> The result should be a page shows a single `Cloud.Function` if you invoke it, it should show `hello, world` in the response section.

5. Invoke the cloud.Function to see that response.
6. Ctrl-C to go back to CLI prompt.

## Step 2 - Hello `@winglibs/vite` 

In the previous step, we used `npm run dev` to start the local web server. 
In this step, we will install the `@winglibs/vite` package responsible for starting the dev server. 
We will also pass information from the backend to the frontend.

### Install and use `@winglibs/vite`

Open VScode / Intellij on the project directory.


1. Install `@winglibs/vite`:
 ```sh
 cd ~/shared-counter/backend
 npm i -s @winglibs/vite
 ```
2.  Clear `backend/main.w` from existing code, and add the following code to bring and instantiate Vite in `backend/main.w`:
 ```ts
 bring vite;
 
 new vite.Vite(
   root:"../frontend"
 );
 ```
3. Run this project inside the Wing Simulator:
 ```sh
 wing run main.w
 ```
> You should have 2 web pages open: the React web application and the Wing Simulator, showing the simulator.

### Sending data to your Vite app using `publicEnv`

Now that we have our backend instantiate the Vite resource, 
we would like to see how we can pass constant data from the backend to the frontend.

1. Use `publicEnv` in order to pass `title` from the backend to the frontend. In `backend/main.w:
 ```ts
 bring vite;
 
 new vite.Vite(
   root:"../frontend",
   publicEnv: {
     title: "Wing + Vite + React"
   }
 );
 ```
2. Notice that the React webpage now has `window.wing.env` containing this title. 
You can verify it by opening javascript console under developer tools and running `console.log(window.wing.env);`
4. Use `window.wing.env.title` in `frontend/src/App.tsx`. Look for `<h1>Vite + React</h1>` and replace it with `<h1>{window.wing.env.title}</h1>`.
5. Upon saving both the Wing file and the TypeScript file, you should see the new title.

## Step 3 - Adding a counter

Now that we understand how to pass information from the backend to the frontend, we will create a backend API endpoint and provide the frontend code with a URL.
On the frontend, we will switch from using a local counter to a backend-based counter.

### Creating a counter and read/update API routes

1. Instantiate a `cloud.Api` in `backend/main.w` by adding the following code:
```ts
bring vite;
bring cloud;

let api = new cloud.Api(cors: true);

new vite.Vite(
  root: "../frontend",
  publicEnv: {
    title: "Wing + Vite + React",
    API_URL: api.url
  }
);
```
Notice that we added a new environment variable called `API_URL` to our frontend application which points to the URL of our API endpoint.

2. Now, let's also instantiate a `cloud.Counter`:
 
```ts
let counter = new cloud.Counter();
``` 
3. Add the following routes:
  - A `GET /counter` for retrieving the counter value (using `counter.peek()`)
  ```ts
  api.get("/counter", inflight () => {
    return {
      status: 200, 
      body: "{counter.peek()}"
    };
  });
  ```
  - A `POST /counter` for incrementing the counter (using `counter.inc()`)
  ```ts
  api.post("/counter", inflight () => {
    let oldValue = counter.inc();
    return {
      status: 200, 
      body: "{oldValue + 1}"
    };
  });
  ```
4. Experiment with the Wing Simulator to see that these routes work as expected.

> You can click on the API and use the right side panel to test the endpoints, 
you can also examine the Counter value or even modify it.

### Edit `App.tsx` to call our backend
Let's modify our frontend code to fetch and update the counter value using the routes defined above.



1. First, store the `API_URL` in some variable in `frontend/src/App.tsx`:
```ts
const API_URL = window.wing.env.API_URL;
```
2. Then, lets use React hooks to update the counter data:
```ts
function App() {
// ...
  const [count, setCount] = useState("NA")
  const incrementCount = async () => {
    const response = await fetch(`${API_URL}/counter`, {
      method: "POST"
    });
    setCount(await response.text()); 
  }
  const getCount = async () => {
    const response = await fetch(`${API_URL}/counter`);
    setCount(await response.text()); 
  }
  useEffect(() => {
    getCount();
}, []);
```
**Note:** To use `useEffect`, you need to import it from React as well:
```ts
import { useState, useEffect } from 'react';
```
3. Now, let's trigger the `incrementCount` function when the user clicks to increment the counter:
```ts
   <button onClick={incrementCount}>
```

For convenience, here is the entire `App.tsx` file:

```ts
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const API_URL = window.wing.env.API_URL;
  const [count, setCount] = useState("NA")
  const incrementCount = async () => {
    const response = await fetch(`${API_URL}/counter`, {
      method: "POST"
    });
    setCount(await response.text()); 
  };
  const getCount = async () => {
    const response = await fetch(`${API_URL}/counter`);
    setCount(await response.text()); 
  };
  useEffect(() => {
    getCount();
  }, []);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{window.wing.env.title}</h1>
      <div className="card">
        <button onClick={incrementCount}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
```
4. Once you save the code, you can examine both the webpage and the Simulator to see how the counter gets incremented.

## Step 4 - Create a broadcasting service using `@winglibs/websockets` 

In the current implementation when we open two browser side by side, we only
see the counter latest value upon refresh. In this step we will be deploying a broadcasting service
that utilize a websocket server on the backend, and connecting to that websocket from the clients. 

When the counter is incremented, the broadcaster service will notify all clients that they need to fetch a 
new value from our API.

### Create a Broadcaster class

The Broadcaster class contains two public API endpoints:
- a public websocket URL that will be sent to clients
- an `inflight` broadcast message, that sends a message to all connected clients

1. We will be using `@winglibs/websockets`, so lets first install it
```sh
npm i -s @winglibs/websockets
```
2. Lets create a new file `backend/broadcaster.w`, and implement it:
```ts
bring cloud;
bring websockets;

pub class Broadcaster {
  pub wsUrl: str;
  wb: websockets.WebSocket;
  db: cloud.Bucket;
  new() {
    this.wb = new websockets.WebSocket(name: "MyWebSocket") as "my-websocket";
    this.wsUrl = this.wb.url;
    this.db = new cloud.Bucket();
  
    this.wb.onConnect(inflight(id: str): void => {
      this.db.put(id, "");
    });

    this.wb.onDisconnect(inflight(id: str): void => {
      this.db.delete(id);
    });

  }
  pub inflight broadcast(messgae: str) {
    for id in this.db.list() {
      this.wb.sendMessage(id, messgae);
    }
  }
}
```
3. In our `backend/main.w` file lets instantiate the broadcasting service:
```ts
bring "./broadcaster.w" as b;

let broadcaster = new b.Broadcaster();
```
4. Send the websocket url to the client
```ts
new vite.Vite(
  root: "../frontend",
  publicEnv: {
    title: "Wing + Vite + React",
    API_URL: api.url,
    WS_URL: broadcaster.wsUrl // <-- This is new
  }
);
```
5. Also, lets send a broadcast "refresh" message every time we increment the counter, 
in `backend/main.w` `post` endpoint:
```ts
api.post("/counter", inflight () => {
  let oldValue = counter.inc();
  broadcaster.broadcast("refresh");
  return {
    status: 200, 
    body: "{oldValue + 1}"
  };
});
```

6. For convenience, here is the entire `backend/main.w` file:
```ts
bring vite;
bring cloud;
bring "./broadcaster.w" as b;

let broadcaster = new b.Broadcaster();
let api = new cloud.Api(cors: true);

new vite.Vite(
  root: "../frontend",
  publicEnv: {
    title: "Wing + Vite + React",
    API_URL: api.url,
    WS_URL: broadcaster.wsUrl
  }
);
let counter = new cloud.Counter();
api.get("/counter", inflight () => {
  return {
    status: 200, 
    body: "{counter.peek()}"
  };
});

api.post("/counter", inflight () => {
  let oldValue = counter.inc();
  broadcaster.broadcast("refresh");
  return {
    status: 200, 
    body: "{oldValue + 1}"
  };
});
```


### Listen to ws message and trigger data refresh

On the client side we are going to use `react-use-websocket` and listen to any
event from the broadcaster, once an event is received we will read the counter value from 
the API. 

1. Start by installing `react-use-websocket` on the `frontend/`:
```sh
cd ~/shared-counter/frontend
npm i -s react-use-websocket
```
2. Lets import and use it inside `frontend/App.tsx`:
```ts
import useWebSocket from 'react-use-websocket';
```
3. And use it inside the `App()` function body: 
```ts
useWebSocket(window.wing.env.WS_URL, {
  onMessage: () => {
    getCount();
  }
});
```
4. For convenience, here is the entire `App.tsx` file:

```ts
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useWebSocket from 'react-use-websocket';


function App() {
  const API_URL = window.wing.env.API_URL;
  const [count, setCount] = useState("NA")
  const incrementCount = async () => {
    const response = await fetch(`${API_URL}/counter`, {
      method: "POST"
    });
    setCount(await response.text()); 
  };
  const getCount = async () => {
    const response = await fetch(`${API_URL}/counter`);
    setCount(await response.text()); 
  };
  useWebSocket(window.wing.env.WS_URL, {
    onMessage: () => {
      getCount();
    }
  });
  useEffect(() => {
    getCount();
  }, []);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{window.wing.env.title}</h1>
      <div className="card">
        <button onClick={incrementCount}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
```
5. Play arround with multiple tabs of the website, they should be automatically updated upon counter increment. 


## Step 5 - Deploy on AWS

Once deployed, the above code translates to the following (simplified) AWS architectue

![AWS Architecture](./vite-react-websockets-AWS-diagram.png 'AWS Architecture')

###  Prerequisites

In order to deploy to AWS, you will need:

* [Terraform](https://terraform.io/downloads)
* AWS CLI with configured credentials. See
[here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
for more information.

1. Compile to Terraform/AWS

We will use the `tf-aws` platform to tell the compiler to bind all of our resources
to the default set of AWS resources and use Terraform as the provisioning engine.

```sh
cd ~/shared-counter/backend
wing compile --platform tf-aws main.w
```

2. Run Terraform Init and Apply 

```sh
cd ./target/main.tfaws
terraform init
terraform apply # this take some time
```



