---
title: React, Vite & Websockets 
id: react-vite-websockets
keywords: [Websockets, React, Vite, Local, Wing]
---

# React, Vite & WebSockets 

In this guide, we will build a simple web application with React for our frontend and Wing for our backend.
We will develop and test our application using the Wing Simulator and deploy it to AWS using [Terraform](https://www.terraform.io/).

Our application will have a counter that can be incremented by clicking on it. This counter will be
synchronized in real-time across all users via a distributed cloud counter and WebSockets.

> 🚧 Wing is still under active development, so don't be (too) surprised if you run into issues or bugs
> along the way. You are invited to [join the Wing Slack](https://t.winglang.io/slack) to say hi, ask questions
> and help your fellow Wingnuts.

## How to use this guide?

This guide is written as a tutorial and intended to be followed step-by-step. At the end of each step, you should be able to find the 
full source code in a collapsable section.

To expedite the project creation process, consider leveraging the react-vite quickstart template. This quickstart option automates the generation of all the files demonstrated in this tutorial, providing a fast way to set up your project environment:

```bash
$ mkdir my-react-vite
$ cd my-react-vite
$ wing new react-vite
```

Let's check out what we now have in our project directory:

```bash
my-react-vite/
├── backend
├── frontned
├── package-lock.json
├── package.json
```

During this tutorial, we'll be focusing on editing the following files:

```bash
backend/
├── main.w
├── broadcaster.w
```

```bash
frontend/
├── src/App.tsx
```

You can also find the entire project in [GitHub](https://github.com/winglang/guide-react-vite-websockets).

## Prerequisites

- [Node.js](https://nodejs.org/en) v20 or later.
- IDE support (syntax highlighting, code completions and more):
  - [VSCode](https://marketplace.visualstudio.com/items?itemName=Monada.vscode-wing) - Official extension
  - [IntelliJ](https://plugins.jetbrains.com/plugin/22353-wing) - Community-supported

## Step 1 - Installation & Scaffolding

In this step, we will create our project.

### Creating a React App with Vite

1. Create our project folder:

    ```sh
    mkdir ~/shared-counter
    cd ~/shared-counter
    ```

2. Create a new React app using Vite under the `frontend` directory:
 
    ```sh
    npm create -y vite frontend -- --template react-ts
    ```

3. Let's ensure your new frontend works:

    ```sh
    cd frontend
    npm install
    npm run dev
    ```

    > The result should be a very simple webpage that runs locally and works without a backend. If you
    > open multiple browser tabs you'll see that the counter is not synchronized.

4. Press Ctrl-C to return to the CLI prompt.

### Creating a Wing backend

Now, we will create our backend for our app:

1. Install Wing:

    ```sh
    npm install -g winglang
    wing -V # should be >= 0.60.1
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

    > This will generate three files: `package.json`, `package-lock.json` and `main.w` file with a
    > simple "hello world" program

4. Let's run our new application in the Wing Simulator:

    ```sh
    wing it
    ```

    > The Wing Simulator will be opened in your browser and will show a map of your app with a single
    > function.
    >
    > ![image](https://github.com/winglang/wing/assets/598796/1ba40358-e833-4583-9c14-2efd160ffdc6)

5. Now, let's invoke our function from the interaction panel and check out the result.

    > ![image](https://github.com/winglang/wing/assets/598796/42c7820f-09ec-4fa2-abc6-18a717d60ab9)

6. Ctrl-C to go back to CLI prompt.

## Step 2 - Hello `@winglibs/vite` 

In the previous step, we used `npm run dev` to start the local web server.
In this step, we will install the `@winglibs/vite` package responsible for starting the dev server. 
We will also learn how to send static data from your backend to your frontend application.

### Install and use `@winglibs/vite`

1. Install `@winglibs/vite`:

    ```sh
    cd ~/shared-counter/backend
    npm i @winglibs/vite
    ```

2. Open up your IDE within the project root:

    ```sh
    cd ~/shared-counter
    code .
    ```

3. Clear `backend/main.w` from existing code, and add the following code to bring and instantiate
   Vite in `backend/main.w`:

    ```ts
    bring vite;
  
    new vite.Vite(
      root: "../frontend"
    );
    ```

3. Open the Wing Simulator again:

    ```sh
    cd ~/shared-counter/backend
    wing it
    ```

    > You'll notice you both the Wing Simulator and your Vite application opened.
    >
    > ![image](https://github.com/winglang/wing/assets/598796/6c9961bc-ac13-4ea2-a3f4-fc1e2a6543e4)
    >
    > You'll also notice that your Wing application has a Vite resource:
    >
    > ![image](https://github.com/winglang/wing/assets/598796/cbab9eab-2b9d-4523-b39d-e1fade8571c3)
`
### Sending data to your Vite app using `publicEnv`

Now that our backend has a Vite resource, let's explore how to send static data from the backend to
the frontend.

1. Edit your `backend/main.w` and add the `TITLE` environment variable to `publicEnv`:

    ```ts
    bring vite;
  
    new vite.Vite(
      root: "../frontend",
      publicEnv: {
        TITLE: "Wing + Vite + React"
      }
    );
    ```

2. Your web app can now access this environment variable through `window.wing.env`. You can verify
   this by opening the JavaScript console under Developer Tools and running
   `console.log(window.wing.env);`

    > ![image](https://github.com/winglang/wing/assets/598796/cda270e1-5b7b-402f-b533-68be131b5075)

3. Add this line at the top of `frontend/src/App.tsx`:

    ```ts
    import "../.winglibs/wing-env.d.ts"
    ```

4. Edit `frontend/src/App.tsx` and use replace:

    ```tsx
    <h1>Vite + React</h1>
    ```

    with:

    ```ts
    <h1>{window.wing.env.TITLE}</h1>
    ```

5. Upon saving both `main.w` and `App.tsx`, you should see the new title pop up!

    > ![image](https://github.com/winglang/wing/assets/598796/e6e5e8d9-52fc-4fdf-a600-ba00271b6ef6)

## Step 3 - Adding a counter

Now that we understand how to send static information from the backend to the frontend, we will create a backend API endpoint and provide the frontend code with its URL.
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
        TITLE: "Wing + Vite + React",
        API_URL: api.url
      }
    );
    ```

    > Notice that we added a new environment variable called `API_URL` to our frontend application
    > which points to the URL of our API endpoint.

2. Now, let's create a `cloud.Counter`:
 
    ```ts
    let counter = new cloud.Counter();
    ```

3. Add the following routes:

    - `GET /counter` will retrieve the counter value using `counter.peek()`:

    ```ts
    api.get("/counter", inflight () => {
      return {
        body: "{counter.peek()}"
      };
    });
    ```
    
    - `POST /counter` will increment the counter using `counter.inc()`:

    ```ts
    api.post("/counter", inflight () => {
      let prev = counter.inc();
      return {
        body: "{prev + 1}"
      };
    });
    ```

4. Jump over to the Wing Simulator to see that these routes work as expected.

    > You can click on the API and use the interaction panel to test your endpoints, you can also
    > examine the counter value and even modify it.
    >
    > ![image](https://github.com/winglang/wing/assets/598796/90fc5b61-610c-460d-8da1-4a4d23525f2a)

---

<details>
<summary>main.w</summary>

```js
bring vite;
bring cloud;

let api = new cloud.Api(cors: true);
let counter = new cloud.Counter();

api.get("/counter", inflight () => {
  return {
    body: "{counter.peek()}"
  };
});

api.post("/counter", inflight () => {
  let prev = counter.inc();
  return {
    body: "{prev + 1}"
  };
});

new vite.Vite(
  root: "../frontend",
  publicEnv: {
    TITLE: "Wing + Vite + React",
    API_URL: api.url
  }
);  
```

</details>


### Edit `App.tsx` to call our backend

Let's modify our frontend code to fetch and update the counter value using the routes defined above.

1. First, store the `API_URL` in a const at the top of `frontend/src/App.tsx`:

    ```ts
    const API_URL = window.wing.env.API_URL;
    ```

2. Then, let's use React hooks to update the counter data:

    - Import `useEffect`:

    ```ts
    import { useState, useEffect } from 'react';
    ```

    - Add the code inside the `App` function:

    ```ts
    function App() {
      const [count, setCount] = useState("NA")

      const incrementCount = async () => {
        const response = await fetch(`${API_URL}/counter`, {
          method: "POST"
        });
        setCount(await response.text()); 
      }

      const updateCount = async () => {
        const response = await fetch(`${API_URL}/counter`);
        setCount(await response.text()); 
      }
      
      useEffect(() => {
        updateCount();
      }, []);

      // ...
    ```

3. Let's trigger the `incrementCount()` function when the user clicks the button:

    ```ts
      <button key={count} onClick={incrementCount}>
    ```

4. Once you save the code, you can examine both the webpage and the Simulator to see how the counter
   gets incremented.

---

<details>
<summary>App.tsx</summary>

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

  const updateCount = async () => {
    const response = await fetch(`${API_URL}/counter`);
    setCount(await response.text()); 
  };

  useEffect(() => {
    updateCount();
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
      <h1>{window.wing.env.TITLE}</h1>
      <div className="card">
        <button key={count} onClick={incrementCount}>
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

</details>

## Step 4 - Synchronize browsers using `@winglibs/websockets` 

In the current implementation, if we open two browser side-by-side, we only see the counter latest
value upon refresh.

In this step we will create a broadcasting service which deploys a WebSocket server on the backend.
Clients then connect to this WebSocket to receive real-time notifications when the counter is
updated.

When the counter is incremented, the broadcaster service will notify all clients that they need to
fetch a new value from our API.

### Create a Broadcaster class

The `Broadcaster` class contains two public API endpoints:

- a static public WebSocket URL that will be sent to clients through `publicEnv`.
- an `inflight` broadcast message, that sends a message to all connected clients

1. First, let's install the `@winglibs/websockets` library:

    ```sh
    cd ~/shared-counter/backend
    npm i @winglibs/websockets
    ```

2. Create a new file `backend/broadcaster.w`, with the following implementation:

    ```ts
    bring cloud;
    bring websockets;

    pub class Broadcaster {
      pub url: str;
      server: websockets.WebSocket;
      clients: cloud.Bucket;

      new() {
        this.server = new websockets.WebSocket(name: "counter_updates");
        this.url = this.server.url;
        this.clients = new cloud.Bucket();
      
        // upon connection, add the client to the list
        this.server.onConnect(inflight(id: str): void => {
          this.clients.put(id, "");
        });

        // upon disconnect, remove the client from the list
        this.server.onDisconnect(inflight(id: str): void => {
          this.clients.delete(id);
        });
      }

      // send a message to all clients
      pub inflight broadcast(message: str) {
        for id in this.clients.list() {
          this.server.sendMessage(id, message);
        }
      }
    }
    ```

3. In `backend/main.w`, lets bring and instantiate our broadcaster service:

    ```ts
    bring "./broadcaster.w" as b;

    let broadcaster = new b.Broadcaster();
    ```

4. Send the WebSocket URL to the client:

    ```ts
    new vite.Vite(
      root: "../frontend",
      publicEnv: {
        TITLE: "Wing + Vite + React",
        WS_URL: broadcaster.url, // <-- add this
        API_URL: api.url,
      }
    );
    ```

5. Now, every time the counter is increment, let's send a broadcast `"refresh"` message to all our clients. Add this to the `POST /counter` handler:

    ```ts
    api.post("/counter", inflight () => {
      let oldValue = counter.inc();
      broadcaster.broadcast("refresh");

      return {
        body: "{oldValue + 1}"
      };
    });
    ```

---

<details>
<summary>main.w</summary>

```ts
bring vite;
bring cloud;
bring "./broadcaster.w" as b;

let broadcaster = new b.Broadcaster();

let api = new cloud.Api(cors: true);
let counter = new cloud.Counter();

api.get("/counter", inflight () => {
  return {
    body: "{counter.peek()}"
  };
});

api.post("/counter", inflight () => {
  let prev = counter.inc();
  broadcaster.broadcast("refresh");
  return {
    body: "{prev + 1}"
  };
});

new vite.Vite(
  root: "../frontend",
  publicEnv: {
    TITLE: "Wing + Vite + React",
    WS_URL: broadcaster.url,
    API_URL: api.url,
  }
);
```

</details>

### Listen to ws message and trigger data refresh

Let's move to the client.

On the client side we are going to use `react-use-websocket` and listen to any event from the
broadcaster, once an event is received we will read the counter value from the API. 

1. Start by installing `react-use-websocket` on the `frontend/`:
    ```sh
    cd ~/shared-counter/frontend
    npm i react-use-websocket
    ```

2. Lets import and use it inside `frontend/App.tsx`:

  ```ts
  import useWebSocket from 'react-use-websocket';
  ```

3. And use it inside the `App()` function body (after the definition of `updateCount()`):

    ```ts
    useWebSocket(window.wing.env.WS_URL, {
      onMessage: () => {
        updateCount();
      }
    });
    ```

5. Play around by opening multiple tabs of the website; they should automatically update when the
   counter increments.

---

<details>
<summary>App.tsx</summary>

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
  
  const updateCount = async () => {
    const response = await fetch(`${API_URL}/counter`);
    setCount(await response.text()); 
  };
  
  useWebSocket(window.wing.env.WS_URL, {
    onMessage: () => {
      updateCount();
    }
  });
  
  useEffect(() => {
    updateCount();
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
      <h1>{window.wing.env.TITLE}</h1>
      <div className="card">
        <button key={count} onClick={incrementCount}>
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

</details>

## Step 5 - Deploy on AWS

Once deployed, the above code translates into the following (simplified) AWS architecture.

![AWS Architecture](./vite-react-websockets-AWS-diagram.png 'AWS Architecture')

###  Prerequisites

In order to deploy to AWS, you will need:

* [Terraform](https://terraform.io/downloads)
* [AWS CLI](https://docs.aws.amazon.com/cli) with configured credentials. See
  [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) for more
  information.

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
    terraform apply # this takes some time
    ```
