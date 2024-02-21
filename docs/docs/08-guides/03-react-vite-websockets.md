---
title: React, Vite & Websockets 
id: react-vite-websockets
keywords: [Websockets, React, Vite, Local, Wing]
---

# React, Vite & Websockets 

In this guide, we will go through the process of building a simple React webpage that connects to a Wing backend.

The webpage will showcase a counter that can be incremented by clicking on it. This counter will increment a distributed counter deployed via the Wing backend. We will also demonstrate how to get real-time updates from the backend to the browser every time the counter is updated from any other webpage, using Websockets.

## Prerequisites

- Node.js v20 or later.
- Wing has extended support for two IDEs. They provide syntax highlighting, completions, go-to-definition, etc. and embedded Wing Console support:

  - [VSCode](https://marketplace.visualstudio.com/items?itemName=Monada.vscode-wing) - Official extension
  - [IntelliJ](https://plugins.jetbrains.com/plugin/22353-wing) - Community extension

## Step 1 - Installation & Scaffolding
In this step, we will be creating our project by setting up two folders:

 - `backend` - The place for Wing's backend code
 - `frontend` - The place for our React app code

### Creating a React App with Vite

1. Create the root project folder:
 ```sh
 mkdir /tmp/confjs-wing-react
 cd /tmp/confjs-wing-react
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

### Creating a New Wing App

1. Install Wing:
 ```sh
 npm install -g winglang
 # Verify installation
 wing -V 
 ```
2. Create a `backend` directory under the project root:
 ```sh
 mkdir /tmp/confjs-wing-react/backend
 cd /tmp/confjs-wing-react/backend
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
5. Ctrl-C to go back to CLI prompt.

## Step 2 - Hello `@winglibs/vite` 

In the previous step, we used `npm run dev` to start the local web server. 
In this step, we will install the `@winglibs/vite` package responsible for starting the dev server. 
We will also pass information from the backend to the frontend.

### Install and Use `@winglibs/vite`

1. Install `@winglibs/vite`:
 ```sh
 cd /tmp/confjs-wing-react/backend
 npm i -s @winglibs/vite
 ```
1. Bring and instantiate Vite in `backend/main.w`:
 ```wing
 bring vite;
 
 new vite.Vite(
   root:"../frontend"
 );
 ```
3. Run this project inside the Wing Simulator:
 ```sh
 wing run main.w
 ```
> You should have 2 web pages open: the browser and the Wing Console, showing the simulator.

### Using `publicEnv` for Constant Data

Now that we have our backend instantiate the Vite resource, 
we would like to see how we can pass constant data from the backend to the frontend.

1. Use `publicEnv` for the title in `backend/main.w:
 ```wing
 bring vite;
 
 new vite.Vite(
   root:"../frontend",
   publicEnv: {
     title: "Wing + Vite + React"
   }
 );
 ```
2. Notice that the React webpage now has `window.wing.env` containing this title.
4. Read `window.wing.env.title` in `frontend/src/App.tsx` by looking for `<h1>Vite + React</h1>` and replacing it with `<h1>{window.wing.env.title}</h1>`.
5. Upon saving both the wing file and the TypeScript file, you should see the new title.

## Step 3 - Connect the Counter
Now that we know how pass information from the backend the the frontend we will create an Api Gateway on the backend and provide the frontend code a url.

On the frontend, we will replace the use of a local counter to a backend based counter. 

### Creating a Counter and Access/Modify Routes 
1. Instantiate an API gateway on `backend/main.w`, by adding the following
```wing
bring vite;
bring cloud;

let api = new cloud.Api(cors:true);

new vite.Vite(
  root:"../frontend",
  publicEnv: {
    title: "Wing + Vite + React",
    api_url: api.url
  }
);
```
Notice that we've added api_url to the client's env vars
2. Now lets also instantiate a `cloud.Counter` 
```wing
let counter = new cloud.Counter();
``` 
3. Now, lets add two routes:
  - A `GET /counter` for retrieving the counter value (using `counter.peek()`)
  ```wing
  api.get("/counter", inflight () => {
    return {
      status:200, 
      body: "{counter.peek()}"
    };
  });
  ```
  - A `POST /counterInc` for incrementing the counter (using `counter.inc()`)
  ```wing
  api.post("/counterInc", inflight () => {
    let oldValue = counter.inc();
    return {
      status:200, 
      body: "{oldValue + 1}"
    };
  });
  ```
4. play with the Wing Simulator to see that these routes actually work.

### Setup `App.tsx` Code to use the above routes
Lets modify our frontend code to fetch/update the 
counter value using the above routes.

1. First, store the `api_url` in some variable
```ts
const API_URL = window.wing.env.api_url;
```
2. Then lets use react hooks to update the counter data
```ts
function App() {
  const API_URL = window.wing.env.api_url;
  const [count, setCount] = useState("NA")
  const incrementCount = async () => {
    const response = await fetch(`${API_URL}/counterInc`, {
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
** Notice that in order to use `useEffect` you need to import it from react as well 
```ts
import { useState, useEffect } from 'react'
```
3. Now, when the user is clicking to increment the counter, lets trigger the `incrementCount` function.
```ts
   <button onClick={incrementCount}>
```

For convinience here is the entire `App.tsx` file
```ts
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const API_URL = window.wing.env.api_url;
  const [count, setCount] = useState("NA")
  const incrementCount = async () => {
    const response = await fetch(`${API_URL}/counterInc`, {
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
  )
}

export default App
```
4. One you have the code update you can play with 
both the webpage and the console to see how the counter
gets incremented.

## Step 4 - Use `@winglibs/websockets`
WIP
## Step 5 - Deploy on AWS

###  Prerequisites

In order to deploy to AWS, you will need:

* [Terraform](https://terraform.io/downloads)
* AWS CLI with configured credentials. See
[here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
for more information.

1.Compile to Terraform/AWS

We will use the `tf-aws` platform to tell the compiler to bind all of our resources
to the default set of AWS resources and use Terraform as the provisioning engine.

```sh
cd /tmp/confjs-wing-react/backend
wing compile --platform tf-aws main.w
```

2. Run Terraform Init and Apply 

```sh
cd ./target/main.tfaws
terraform init
terraform apply # this take some time
```



