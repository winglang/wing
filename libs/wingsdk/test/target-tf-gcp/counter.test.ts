import * as cdktf from "cdktf";
import { test, expect } from "vitest";
import { Counter, CounterInflightMethods, Function } from "../../src/cloud";
import { Testing } from "../../src/simulator";
import { App } from "../../src/target-tf-gcp";
import {
  mkdtemp,
  sanitizeCode,
  tfResourcesOf,
  tfResourcesOfCount,
  tfSanitize,
  treeJsonOf,
} from "../util";

const GCP_APP_OPTS = {
  projectId: "my-project",
  entrypointDir: __dirname,
  storageLocation: "US",
  region: "us-central1",
  zone: "us-central1",
};

function checkDatastorePermissions(
  output: string,
  expectedPermissions: string[]
) {
  const outputObject = JSON.parse(output);
  const customRoleName = Object.keys(
    outputObject.resource.google_project_iam_custom_role
  ).find((name) => name.startsWith("Function_CustomRole"));
  const customRole =
    outputObject.resource.google_project_iam_custom_role[customRoleName!];

  const datastorePermissions = customRole.permissions.filter((perm) =>
    perm.startsWith("datastore.entities.")
  );
  expect(datastorePermissions).toEqual(
    expect.arrayContaining(expectedPermissions)
  );
  expect(datastorePermissions).toHaveLength(expectedPermissions.length);
}

test("counter name valid", () => {
  // GIVEN
  const app = new App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const counter = new Counter(app, "The.Amazing-Counter_01");
  const output = app.synth();

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "google_firestore_database",
      {
        name: `wing-counter-the-amazing-counter-01-${counter.node.addr.substring(
          0,
          8
        )}`,
      }
    )
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("replace invalid character from counter name", () => {
  // GIVEN
  const app = new App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const counter = new Counter(app, "The*Amazing%Counter@01");
  const output = app.synth();
  console.log(output);

  // THEN
  expect(
    cdktf.Testing.toHaveResourceWithProperties(
      output,
      "google_firestore_database",
      {
        name: `wing-counter-the-amazing-counter-01-${counter.node.addr.substring(
          0,
          8
        )}`,
      }
    )
  ).toEqual(true);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("default counter behavior", () => {
  // GIVEN
  const app = new App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  new Counter(app, "Counter");
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "google_firestore_database",
    "google_project_service",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
});

test("counter with initial value", () => {
  // GIVEN
  const app = new App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  new Counter(app, "Counter", {
    initial: 9991,
  });
  const output = app.synth();

  // THEN
  expect(tfResourcesOf(output)).toEqual([
    "google_firestore_database",
    "google_project_service",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("function with a counter binding", () => {
  // GIVEN
  const app = new App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const counter = new Counter(app, "Counter");
  const inflight = Testing.makeHandler(
    `async handle(event) {
    const val = await this.my_counter.inc(2);
    console.log(val);
  }`,
    {
      my_counter: {
        obj: counter,
        ops: [CounterInflightMethods.INC],
      },
    }
  );
  new Function(app, "Function", inflight);
  const output = app.synth();

  // THEN
  expect(sanitizeCode(inflight._toInflight())).toMatchSnapshot();
  expect(tfResourcesOf(output)).toEqual([
    "google_cloudfunctions_function",
    "google_firestore_database",
    "google_project_iam_custom_role",
    "google_project_iam_member",
    "google_project_service",
    "google_service_account",
    "google_storage_bucket",
    "google_storage_bucket_object",
    "random_id",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("inc() IAM permissions", () => {
  // GIVEN
  const app = new App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const counter = new Counter(app, "Counter");
  const inflight = Testing.makeHandler(
    `async handle(event) {
    const val = await this.my_counter.inc(2);
    console.log(val);
  }`,
    {
      my_counter: {
        obj: counter,
        ops: [CounterInflightMethods.INC],
      },
    }
  );
  new Function(app, "Function", inflight);
  const output = app.synth();

  // THEN
  checkDatastorePermissions(output, [
    "datastore.entities.get",
    "datastore.entities.create",
    "datastore.entities.update",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("dec() IAM permissions", () => {
  // GIVEN
  const app = new App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const counter = new Counter(app, "Counter");
  const inflight = Testing.makeHandler(
    `async handle(event) {
  const val = await this.my_counter.dec(2);
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [CounterInflightMethods.DEC],
      },
    }
  );
  new Function(app, "Function", inflight);
  const output = app.synth();

  // THEN
  checkDatastorePermissions(output, [
    "datastore.entities.get",
    "datastore.entities.create",
    "datastore.entities.update",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("peek() IAM permissions", () => {
  // GIVEN
  const app = new App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const counter = new Counter(app, "Counter");
  const inflight = Testing.makeHandler(
    `async handle(event) {
  const val = await this.my_counter.peek();
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [CounterInflightMethods.PEEK],
      },
    }
  );
  new Function(app, "Function", inflight);
  const output = app.synth();

  // THEN
  checkDatastorePermissions(output, [
    "datastore.entities.get",
    "datastore.entities.create",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});

test("set() IAM permissions", () => {
  // GIVEN
  const app = new App({ outdir: mkdtemp(), ...GCP_APP_OPTS });
  const counter = new Counter(app, "Counter");
  const inflight = Testing.makeHandler(
    `async handle(event) {
  const val = await this.my_counter.set();
  console.log(val);
}`,
    {
      my_counter: {
        obj: counter,
        ops: [CounterInflightMethods.SET],
      },
    }
  );
  new Function(app, "Function", inflight);
  const output = app.synth();

  // THEN
  checkDatastorePermissions(output, [
    "datastore.entities.create",
    "datastore.entities.update",
  ]);
  expect(tfSanitize(output)).toMatchSnapshot();
  expect(treeJsonOf(app.outdir)).toMatchSnapshot();
});
