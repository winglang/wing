/* eslint-disable @typescript-eslint/no-require-imports */
import {
  API_TYPE,
  BUCKET_TYPE,
  COUNTER_TYPE,
  FUNCTION_TYPE,
  QUEUE_TYPE,
  TABLE_TYPE,
  TEST_RUNNER_TYPE,
  TOPIC_TYPE,
  REDIS_TYPE,
  WEBSITE_TYPE,
  SECRET_TYPE,
  EVENT_MAPPING_TYPE,
  SCHEDULE_TYPE,
  SERVICE_TYPE,
  ON_DEPLOY_TYPE,
  REACT_APP_TYPE,
  DYNAMODB_TABLE_TYPE,
  SIMULATOR_STATE_TYPE,
} from "./schema-resources";
import type {
  ISimulatorFactory,
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../simulator/simulator";

export class DefaultSimulatorFactory implements ISimulatorFactory {
  /**
   * Creates a new simulator runtime resource
   * @param path resource path
   * @param type type id
   * @param props resource properties
   * @param context simulator context
   * @returns a new instance
   */
  public resolve(
    type: string,
    props: any,
    context: ISimulatorContext
  ): ISimulatorResourceInstance {
    switch (type) {
      case API_TYPE:
        const Api = require("./api.inflight").Api;
        return new Api(props, context);
      case BUCKET_TYPE:
        const Bucket = require("./bucket.inflight").Bucket;
        return new Bucket(props, context);
      case FUNCTION_TYPE:
        const Function = require("./function.inflight").Function;
        return new Function(props, context);
      case QUEUE_TYPE:
        const Queue = require("./queue.inflight").Queue;
        return new Queue(props, context);
      case COUNTER_TYPE:
        const Counter = require("./counter.inflight").Counter;
        return new Counter(props, context);
      case TABLE_TYPE:
        const Table = require("./table.inflight").Table;
        return new Table(props, context);
      case TOPIC_TYPE:
        const Topic = require("./topic.inflight").Topic;
        return new Topic(props, context);
      case TEST_RUNNER_TYPE:
        const TestRunnerClient =
          require("./test-runner.inflight").TestRunnerClient;
        return new TestRunnerClient(props, context);
      case REDIS_TYPE:
        const Redis = require("./redis.inflight").Redis;
        return new Redis(props, context);
      case WEBSITE_TYPE:
        const Website = require("./website.inflight").Website;
        return new Website(props, context);
      case REACT_APP_TYPE:
        const ReactApp = require("./react-app.inflight").ReactApp;
        return new ReactApp(props, context);
      case SECRET_TYPE:
        const Secret = require("./secret.inflight").Secret;
        return new Secret(props, context);
      case EVENT_MAPPING_TYPE:
        const EventMapping = require("./event-mapping.inflight").EventMapping;
        return new EventMapping(props, context);
      case SCHEDULE_TYPE:
        const Schedule = require("./schedule.inflight").Schedule;
        return new Schedule(props, context);
      case SERVICE_TYPE:
        const Service = require("./service.inflight").Service;
        return new Service(props, context);
      case ON_DEPLOY_TYPE:
        const OnDeploy = require("./on-deploy.inflight").OnDeploy;
        return new OnDeploy(props, context);
      case DYNAMODB_TABLE_TYPE:
        const DynamodbTable =
          require("./dynamodb-table.inflight").DynamodbTable;
        return new DynamodbTable(props, context);
      case SIMULATOR_STATE_TYPE:
        const StateClient = require("./state.inflight").State;
        return new StateClient(props, context);
      default:
        throw new Error(`Type ${type} not implemented by the simulator.`);
    }
  }
}
