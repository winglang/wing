import { cpSync, writeFileSync, readdirSync } from "fs";
import { join, basename } from "path";
import { test, expect } from "vitest";
import { Function, IFunctionClient } from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { Container } from "../../src/target-sim/container";
import { SimApp } from "../sim-app";
import { mkdtemp } from "../util";

test("simple container from registry", async () => {
  const app = new SimApp();

  const c = new Container(app, "Container", {
    name: "http-echo",
    image: "hashicorp/http-echo",
    containerPort: 5678,
    args: ["-text=bang"],
  });

  new Function(
    app,
    "Function",
    Testing.makeHandler(
      `
      async handle() {
        const url = "http://localhost:" + this.hostPort;
        const res = await fetch(url);
        return res.text();
      }
      `,
      { hostPort: { obj: c.hostPort, ops: [] } }
    )
  );

  const sim = await app.startSimulator();
  sim.onTrace({ callback: (trace) => console.log(">", trace.data.message) });

  const fn = sim.getResource("root/Function") as IFunctionClient;
  const response = await fn.invoke();
  expect(response).toStrictEqual("bang\n");

  await sim.stop();
});

test("simple container from a dockerfile", async () => {
  // TODO: fix this test
  const app = new SimApp();

  const c = new Container(app, "Container", {
    name: "my-app",
    image: join(__dirname, "my-docker-image"),
    containerPort: 3000,
  });

  new Function(
    app,
    "Function",
    Testing.makeHandler(
      `
      async handle() {
        const url = "http://localhost:" + this.hostPort;
        const res = await fetch(url);
        return res.text();
      }
      `,
      { hostPort: { obj: c.hostPort, ops: [] } }
    )
  );

  const sim = await app.startSimulator();
  sim.onTrace({ callback: (trace) => console.log(">", trace.data.message) });

  const fn = sim.getResource("root/Function") as IFunctionClient;
  const response = await fn.invoke();
  expect(response).toStrictEqual("Hello, Wingnuts!");

  await sim.stop();
});

test("no port, no urls", async () => {
  const app = new SimApp();
  const c = new Container(app, "Container", {
    name: "my-app",
    image: "bla",
  });
  expect(c.hostPort).toBeUndefined();
});

test("no public url", async () => {
  const app = new SimApp();
  const c = new Container(app, "Container", {
    name: "my-app",
    image: "bla",
  });
  expect(c.hostPort).toBeUndefined();
});

test("rebuild only if content had changes", async () => {
  const workdir = mkdtemp();
  cpSync(join(__dirname, "my-docker-image"), workdir, { recursive: true });

  class MyApp extends SimApp {
    constructor() {
      super();

      const c = new Container(this, "Container", {
        name: "my-app",
        image: workdir,
        containerPort: 3000,
      });
    }

    public async cycle() {
      const sim = await this.startSimulator();
      await sim.stop();
      return sim.listTraces().map((t) => t.data.message);
    }
  }

  const app1 = new MyApp();
  const r1 = await app1.cycle();

  const app2 = new MyApp();
  const r2 = await app2.cycle();

  expect(r2[0]).toBe(
    "image my-app:a9ae83b54b1ec21faa1a3255f05c095c already exists"
  );

  // add a file to the workdir and see that we are rebuilding
  writeFileSync(
    join(workdir, "new-file"),
    `${new Date().toISOString()}-${Math.random() * 9999}`
  );

  const app3 = new MyApp();
  const r3 = await app3.cycle();

  expect(r3[0].startsWith(`building locally from ${workdir}`)).toBeTruthy();
});

test("simple container with a volume", async () => {
  const app = new SimApp();

  const c = new Container(app, "Container", {
    name: "my-app",
    image: join(__dirname, "my-docker-image.volume"),
    containerPort: 3000,
    volumes: [`${__dirname}:/tmp`],
  });

  new Function(
    app,
    "Function",
    Testing.makeHandler(
      `
      async handle() {
        const url = "http://localhost:" + this.hostPort;
        const res = await fetch(url);
        return res.text();
      }
      `,
      { hostPort: { obj: c.hostPort, ops: [] } }
    )
  );

  const sim = await app.startSimulator();
  sim.onTrace({ callback: (trace) => console.log(">", trace.data.message) });

  const fn = sim.getResource("root/Function") as IFunctionClient;
  const response = await fn.invoke();
  expect(response).contains(basename(__filename));

  await sim.stop();
});

test("anonymous volume can be reused across restarts", async () => {
  const app = new SimApp();

  const c = new Container(app, "Container", {
    name: "my-app",
    image: join(__dirname, "my-docker-image.mounted-volume"),
    containerPort: 3000,
    volumes: ["/tmp"],
  });

  new Function(
    app,
    "Function",
    Testing.makeHandler(
      `
      async handle() {
        const url = "http://localhost:" + this.hostPort;
        const res = await fetch(url);
        return res.text();
      }
      `,
      { hostPort: { obj: c.hostPort, ops: [] } }
    )
  );

  const sim = await app.startSimulator();
  sim.onTrace({ callback: (trace) => console.log(">", trace.data.message) });

  const fn = sim.getResource("root/Function") as IFunctionClient;
  const response = await fn.invoke();
  expect(response?.split("\n").filter((s) => s.endsWith(".txt"))).toEqual([
    "hello.txt",
  ]);

  await sim.stop();
  await sim.start();

  const fn2 = sim.getResource("root/Function") as IFunctionClient;
  const response2 = await fn2.invoke();
  expect(response2?.split("\n").filter((s) => s.endsWith(".txt"))).toEqual([
    "hello.txt",
    "world.txt",
  ]);
});
