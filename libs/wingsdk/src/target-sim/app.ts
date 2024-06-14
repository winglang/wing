import * as fs from "fs";
import * as path from "path";
import { IConstruct } from "constructs";
import { SIM_CONTAINER_FQN } from "./container";
import { EVENT_MAPPING_FQN } from "./event-mapping";
import { POLICY_FQN } from "./policy";
import { SIM_RESOURCE_FQN, isSimulatorResource } from "./resource";
import { STATE_FQN } from "./state";
import { TestRunner } from "./test-runner";
import { SimTokens } from "./tokens";
import {
  API_FQN,
  BUCKET_FQN,
  DOMAIN_FQN,
  ENDPOINT_FQN,
  FUNCTION_FQN,
  ON_DEPLOY_FQN,
  QUEUE_FQN,
  SCHEDULE_FQN,
  SECRET_FQN,
  SERVICE_FQN,
  TOPIC_FQN,
  WEBSITE_FQN,
} from "../cloud";
import { SDK_VERSION } from "../constants";
import * as core from "../core";
import { preSynthesizeAllConstructs } from "../core/app";
import { registerTokenResolver } from "../core/tokens";
import { REDIS_FQN, TABLE_FQN } from "../ex";
import {
  BaseResourceSchema,
  TypeSchema,
  WingSimulatorSchema,
} from "../simulator";
import { resolveTokens } from "../simulator/tokens";
import { TEST_RUNNER_FQN } from "../std";

/**
 * Path of the simulator configuration file in every .wsim tarball.
 */
export const SIMULATOR_FILE_PATH = "simulator.json";

const SIMULATOR_CLASS_DATA = {
  [API_FQN]: "Api",
  [BUCKET_FQN]: "Bucket",
  [DOMAIN_FQN]: "Domain",
  [ENDPOINT_FQN]: "Endpoint",
  [EVENT_MAPPING_FQN]: "EventMapping",
  [FUNCTION_FQN]: "Function",
  [ON_DEPLOY_FQN]: "OnDeploy",
  [POLICY_FQN]: "Policy",
  [QUEUE_FQN]: "Queue",
  [REDIS_FQN]: "Redis",
  [SCHEDULE_FQN]: "Schedule",
  [SECRET_FQN]: "Secret",
  [SERVICE_FQN]: "Service",
  [STATE_FQN]: "State",
  [SIM_CONTAINER_FQN]: "Container",
  [SIM_RESOURCE_FQN]: "Resource",
  [TABLE_FQN]: "Table",
  [TEST_RUNNER_FQN]: "TestRunner",
  [TOPIC_FQN]: "Topic",
  [WEBSITE_FQN]: "Website",
};

/**
 * A construct that knows how to synthesize simulator resources into a
 * Wing simulator (.wsim) file.
 */
export class App extends core.App {
  public readonly outdir: string;
  public readonly _target = "sim";

  private synthed = false;

  constructor(props: core.AppProps) {
    // doesn't allow customize the root id- as used hardcoded in the code
    super(undefined as any, "root", props);
    this.outdir = props.outdir ?? ".";
    registerTokenResolver(new SimTokens());

    TestRunner._createTree(this, props.rootConstruct);
  }

  /** @internal */
  public _inflightClientForFqn(fqn: string): string | undefined {
    switch (fqn) {
      case API_FQN:
        return require.resolve("./api.inflight");

      case BUCKET_FQN:
        return require.resolve("./bucket.inflight");

      case DOMAIN_FQN:
        return require.resolve("./domain.inflight");

      case ENDPOINT_FQN:
        return require.resolve("./endpoint.inflight");

      case EVENT_MAPPING_FQN:
        return require.resolve("./event-mapping.inflight");

      case FUNCTION_FQN:
        return require.resolve("./function.inflight");

      case ON_DEPLOY_FQN:
        return require.resolve("./on-deploy.inflight");

      case POLICY_FQN:
        return require.resolve("./policy.inflight");

      case QUEUE_FQN:
        return require.resolve("./queue.inflight");

      case REDIS_FQN:
        return require.resolve("./redis.inflight");

      case SCHEDULE_FQN:
        return require.resolve("./schedule.inflight");

      case SECRET_FQN:
        return require.resolve("./secret.inflight");

      case SERVICE_FQN:
        return require.resolve("./service.inflight");

      case STATE_FQN:
        return require.resolve("./state.inflight");

      case TABLE_FQN:
        return require.resolve("./table.inflight");

      case TEST_RUNNER_FQN:
        return require.resolve("./test-runner.inflight");

      case TOPIC_FQN:
        return require.resolve("./topic.inflight");

      case WEBSITE_FQN:
        return require.resolve("./website.inflight");

      case SIM_CONTAINER_FQN:
        return require.resolve("./container.inflight");

      case SIM_RESOURCE_FQN:
        return require.resolve("./resource.inflight");
    }

    return undefined;
  }

  /**
   * Synthesize the app. This creates a tree.json file and a .wsim file in the
   * app's outdir, and returns a path to the .wsim directory.
   */
  public synth(): string {
    if (this.synthed) {
      return this.outdir;
    }

    fs.mkdirSync(this.outdir, { recursive: true });

    // call preSynthesize() on every construct in the tree
    preSynthesizeAllConstructs(this);

    if (this._synthHooks?.preSynthesize) {
      this._synthHooks.preSynthesize.forEach((hook) => hook(this));
    }

    // write simulator.json file into workdir
    const spec = this.synthSimulatorFile(this.outdir);

    this.addTokenConnections(spec);

    // write tree.json file into workdir
    core.synthesizeTree(this, this.outdir);

    // write `outdir/connections.json`
    core.Connections.of(this).synth(this.outdir);

    this.synthed = true;

    if (this._synthHooks?.postSynthesize) {
      this._synthHooks.postSynthesize.forEach((hook) => hook(this));
    }

    return this.outdir;
  }

  /**
   * Scans the app spec for token references and adds connections to reflect
   * this relationship.
   *
   * @param spec The simulator spec
   */
  private addTokenConnections(spec: WingSimulatorSchema) {
    const map: Record<string, IConstruct> = {};
    for (const c of this.node.findAll()) {
      map[c.node.path] = c;
    }

    for (const [from, resource] of Object.entries(spec.resources)) {
      resolveTokens(resource.props, (to) => {
        // skip references to the "handle" of the target resource because it would be reflected by
        // the connections created by inflight method calls.
        if (to.attr !== "handle") {
          core.Connections.of(this).add({
            source: map[from],
            target: map[to.path],
            targetOp: to.attr,
            name: "<ref>",
          });
        }
        return "<TOKEN>"; // <-- not used
      });
    }
  }

  private synthSimulatorFile(outdir: string) {
    const resources: Record<string, BaseResourceSchema> = {};
    for (const r of new core.DependencyGraph(this.node).topology()) {
      if (isSimulatorResource(r)) {
        const deps = r.node.dependencies.map((d) => d.node.path);
        resources[r.node.path] = {
          ...r.toSimulator(),
          path: r.node.path,
          addr: r.node.addr,
          deps: deps.length === 0 ? undefined : deps,
          attrs: undefined as any,
        };
      }
    }

    const types: { [fqn: string]: TypeSchema } = {};
    for (const [fqn, className] of Object.entries(SIMULATOR_CLASS_DATA)) {
      const sourcePath = this._inflightClientForFqn(fqn);
      if (!sourcePath) {
        throw new Error(`No source path for ${fqn}`);
      }
      types[fqn] = {
        className,
        sourcePath,
      };
    }

    const contents: WingSimulatorSchema = {
      types,
      resources,
      sdkVersion: SDK_VERSION,
    };

    // write simulator.json file
    fs.writeFileSync(
      path.join(outdir, SIMULATOR_FILE_PATH),
      JSON.stringify(contents, undefined, 2),
      { encoding: "utf8" }
    );

    return contents;
  }
}
