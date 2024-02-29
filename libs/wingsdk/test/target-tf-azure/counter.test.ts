import * as cdktf from "cdktf";
import { test, expect } from "vitest";
import * as cloud from "../../src/cloud";
import { Testing } from "../../src/simulator";
import * as tfAzure from "../../src/target-tf-azure";
import { StorageAccountPermissions } from "../../src/target-tf-azure/counter";
import {
  mkdtemp,
  sanitizeCode,
  tfResourcesOf,
  tfSanitize,
  treeJsonOf,
} from "../util";

const appProps = {
  location: "East US",
  entrypointDir: __dirname,
};

test("default counter behavior", () => {
  const app = new tfAzure.App({ outdir: mkdtemp(), ...appProps });
  new cloud.Counter(app, "Counter");
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual([
    "azurerm_resource_group",
    "azurerm_storage_account",
    "azurerm_storage_table",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("counter with initial value", () => {
  const app = new tfAzure.App({ outdir: mkdtemp(), ...appProps });
  new cloud.Counter(app, "Counter", {
    initial: 9991,
  });
  const output = app.synth();

  expect(tfResourcesOf(output)).toEqual([
    "azurerm_resource_group",
    "azurerm_storage_account",
    "azurerm_storage_table",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("function with a counter binding", () => {
  const app = new tfAzure.App({ outdir: mkdtemp(), ...appProps });
  const counter = new cloud.Counter(app, "Counter");
  const inflight = Testing.makeHandler(
    `async handle(event) {
  const val = await this.my_counter.inc(2);
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [cloud.CounterInflightMethods.INC],
      },
    },
  );
  new cloud.Function(app, "Function", inflight);
  const output = app.synth();

  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
  expect(tfResourcesOf(output)).toEqual([
    "azurerm_application_insights",
    "azurerm_linux_function_app",
    "azurerm_log_analytics_workspace",
    "azurerm_resource_group",
    "azurerm_role_assignment",
    "azurerm_service_plan",
    "azurerm_storage_account",
    "azurerm_storage_blob",
    "azurerm_storage_container",
    "azurerm_storage_table",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("inc() policy statement", () => {
  const app = new tfAzure.App({ outdir: mkdtemp(), ...appProps });
  const counter = new cloud.Counter(app, "Counter");
  const inflight = Testing.makeHandler(
    `async handle(event) {
  const val = await this.my_counter.inc(2);
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [cloud.CounterInflightMethods.INC],
      },
    },
  );
  new cloud.Function(app, "Function", inflight);
  const output = app.synth();

  expect(output).toContain(StorageAccountPermissions.READ_WRITE);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("dec() policy statement", () => {
  const app = new tfAzure.App({ outdir: mkdtemp(), ...appProps });
  const counter = new cloud.Counter(app, "Counter");
  const inflight = Testing.makeHandler(
    `async handle(event) {
  const val = await this.my_counter.dec(2);
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [cloud.CounterInflightMethods.DEC],
      },
    },
  );
  new cloud.Function(app, "Function", inflight);
  const output = app.synth();

  expect(output).toContain(StorageAccountPermissions.READ_WRITE);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("peek() policy statement", () => {
  const app = new tfAzure.App({ outdir: mkdtemp(), ...appProps });
  const counter = new cloud.Counter(app, "Counter");
  const inflight = Testing.makeHandler(
    `async handle(event) {
  const val = await this.my_counter.peek();
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [cloud.CounterInflightMethods.PEEK],
      },
    },
  );
  new cloud.Function(app, "Function", inflight);
  const output = app.synth();

  expect(output).toContain(StorageAccountPermissions.READ);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("set() policy statement", () => {
  const app = new tfAzure.App({ outdir: mkdtemp(), ...appProps });
  const counter = new cloud.Counter(app, "Counter");
  const inflight = Testing.makeHandler(
    `async handle(event) {
  const val = await this.my_counter.set();
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [cloud.CounterInflightMethods.SET],
      },
    },
  );
  new cloud.Function(app, "Function", inflight);
  const output = app.synth();
  expect(output).toContain(StorageAccountPermissions.READ_WRITE);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("counter name valid", () => {
  // GIVEN
  const app = new tfAzure.App({ outdir: mkdtemp(), ...appProps });
  const counter = new cloud.Counter(app, "wingcounter");
  const output = app.synth();
  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "azurerm_storage_table",
      {
        name: `wingcounterx${counter.node.addr.substring(0, 8)}`,
      },
    ),
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("replace invalid character from counter name", () => {
  // GIVEN
  const app = new tfAzure.App({ outdir: mkdtemp(), ...appProps });
  const counter = new cloud.Counter(app, "The*Amazing%Counter@01");
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "azurerm_storage_table",
      {
        name: `thexamazingxcounterx01x${counter.node.addr.substring(0, 8)}`,
      },
    ),
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
