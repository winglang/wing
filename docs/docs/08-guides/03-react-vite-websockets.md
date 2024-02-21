---
title: React, Vite & Websockets 
id: react-vite-websockets
keywords: [Websockets, React, Vite, Local, Wing]
---

# React, Vite & Websockets 

In this guide we will go through building a simple react webpage that is connected to wing backend. 

The webpage will be showcasing a counter that can be incremented by clicking on it. The counter will increment a distributed counter deployed via Wing backend, we will also demo how to get realtime updates from the backend to the browser every time the counter is updated from any other webpage, using websockets.

## Prerequisites

Node.js v20 or later.
Wing has extended support for two IDEs. They provide syntax highlighting, completions, go-to-definition, etc. and embedded Wing Console support:

- [VSCode](https://marketplace.visualstudio.com/items?itemName=Monada.vscode-wing) - Official extension
- [IntelliJ](https://plugins.jetbrains.com/plugin/22353-wing) - Community extension

## Step 1 - Installations & Scaffolding
In this step, we will be creating our project.
We will use this by creating two folders:
 - `backend` - The place for Wing's backend code
 - `frontend` - The place for our react app code

### Creating React app with Vite
1. Create root project folder:
```sh
mkdir /tmp/confjs-wing-react
cd /tmp/confjs-wing-react
```
2. Create a new React app using vite under `frontend` folder
```sh
npm create vite frontend -- --template react-ts
```
3. Run your React app and make sure it works
```sh
cd frontend
npm install
npm run dev
```
> The result should be a very simple webpage that runs locally, and works without any backend (notice the counter is not shared between tabs)
4. Ctrl-C to go back to CLI prompt.


### Creating a new Wing app 
1. Install Wing
```sh
npm install -g winglang
# Verify installation
wing -V 
```
2. Create `backend` directory under project root
```sh
mkdir /tmp/confjs-wing-react/backend
cd /tmp/confjs-wing-react/backend
```
3. Generate a new empty Wing project
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
In the previous step we used `npm run dev` to start the local webserver, in this step we will be installing the `@winglibs/vite` package that will be responsile for starting the dev server. We will also pass information from the backend to the frontend 

### Install and Use `@winglibs/vite`

1. Install `@winglibs/vite`
```sh
cd /tmp/confjs-wing-react/backend
npm i -s @winglibs/vite
```
1. Bring and Instantiate vite in `backend/main.w`
```wing
bring vite;

new vite.Vite(
  root:"../frontend"
);
```
3. Run this project inside Wing Simulator
```sh
wing run main.w
```
> You should have 2 webpage open, the browser and Wing Console that is showing the simulator

### Using `publicEnv` for Constant data 
Now when we have our backend instantiate the Vite resource, we would like to see how we can pass constant data from the backend to the frontend.
1. Use `publicEnv` for the Title in `backend/main.w`
```wing
bring vite;

new vite.Vite(
  root:"../frontend",
  publicEnv: {
    title: "Wing + Vite + React"
  }
);
```
2. Notice that the react webpage now has 
3. `window.wing.env` now contains this title. 
4. Read `window.wing.env.title` in `frontend/src/App.tsx`

    Look for `<h1>Vite + React</h1>` and replace it with `<h1>{window.wing.env.title}</h1>`.

4. Upon saving both the wing file and the typescript you should be seeing the new title.

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



