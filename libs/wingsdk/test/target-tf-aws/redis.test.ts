import { describe, it, expect } from "vitest";
import { Function } from "../../src/cloud";
import { inflight } from "../../src/core";
import * as ex from "../../src/ex";
import * as tfaws from "../../src/target-tf-aws";
import {
  mkdtemp,
  getTfResource,
  tfResourcesOf,
  tfResourcesOfCount,
  tfSanitize,
} from "../util";

const INFLIGHT_CODE = inflight(async (_, name) => {
  console.log("Hello, " + name);
});

describe("When creating a Redis resource", () => {
  it("should create an elasticache cluster and required vpc networking resources", () => {
    // GIVEN
    const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
    new ex.Redis(app, "Redis");

    // WHEN
    const output = app.synth();

    // THEN
    expect(tfResourcesOf(output)).toEqual([
      "aws_eip", // Elastic IP for NAT Gateway
      "aws_elasticache_cluster", // Elasticache cluster
      "aws_elasticache_subnet_group", // Elasticache subnet group
      "aws_internet_gateway", // Internet Gateway
      "aws_nat_gateway", // NAT for internet egress from private subnet
      "aws_route_table", // Route tables for subnets
      "aws_route_table_association", // Route table associations for subnets
      "aws_security_group", // Security group for Elasticache cluster access
      "aws_subnet", // App wide subnets
      "aws_vpc", // VCP for app
    ]);
    expect(tfSanitize(output)).toMatchSnapshot();
  });

  it("should only contain a single instance of the vpc resources", () => {
    // GIVEN
    const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
    new ex.Redis(app, "Redis");

    // WHEN
    const output = app.synth();

    // THEN
    expect(tfResourcesOfCount(output, "aws_vpc")).toEqual(1);
    expect(tfResourcesOfCount(output, "aws_subnet")).toEqual(2);
    expect(tfResourcesOfCount(output, "aws_route_table")).toEqual(2);
    expect(tfResourcesOfCount(output, "aws_nat_gateway")).toEqual(1);
    expect(tfResourcesOfCount(output, "aws_internet_gateway")).toEqual(1);
  });

  describe("that is used by a function", () => {
    it("lambda function should have access to the redis cluster", () => {
      // GIVEN
      const app = new tfaws.App({
        outdir: mkdtemp(),
        entrypointDir: __dirname,
      });
      const redisCluster = new ex.Redis(app, "Redis") as ex.Redis;
      const func = new Function(app, "Function", INFLIGHT_CODE);
      redisCluster.onLift(func, ["set", "get"]);

      // WHEN
      const output = app.synth();

      const lambda = getTfResource(output, "aws_lambda_function");
      const vpcConfig = lambda.vpc_config;

      // THEN
      expect(vpcConfig.security_group_ids).toBeDefined();
      expect(vpcConfig.subnet_ids).toBeDefined();
    });
  });
});

describe("When creating multiple Redis resources", () => {
  it("should only contain a single instance of the vpc resources", () => {
    // GIVEN
    const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
    new ex.Redis(app, "RedisOne");
    new ex.Redis(app, "RedisTwo");

    // WHEN
    const output = app.synth();

    // THEN
    // 2 clusters, 2 security groups, 1 vpc, 2 subnets, 2 route tables, 1 nat gateway, 1 internet gateway
    expect(tfResourcesOfCount(output, "aws_elasticache_cluster")).toEqual(2);
    expect(tfResourcesOfCount(output, "aws_security_group")).toEqual(2);
    expect(tfResourcesOfCount(output, "aws_vpc")).toEqual(1);
    expect(tfResourcesOfCount(output, "aws_subnet")).toEqual(2);
    expect(tfResourcesOfCount(output, "aws_route_table")).toEqual(2);
    expect(tfResourcesOfCount(output, "aws_nat_gateway")).toEqual(1);
    expect(tfResourcesOfCount(output, "aws_internet_gateway")).toEqual(1);
  });

  describe("that are used by a function", () => {
    it("the function should have access to both clusters", () => {
      // GIVEN
      const app = new tfaws.App({
        outdir: mkdtemp(),
        entrypointDir: __dirname,
      });
      const redisCluster = new ex.Redis(app, "Redis") as ex.Redis;
      const otherCluster = new ex.Redis(app, "OtherRedis") as ex.Redis;
      const func = new Function(app, "Function", INFLIGHT_CODE);
      redisCluster.onLift(func, ["set", "get"]);
      otherCluster.onLift(func, ["set", "get"]);

      // WHEN
      const output = app.synth();

      const lambda = getTfResource(output, "aws_lambda_function");
      const vpcConfig = JSON.parse(JSON.stringify(lambda.vpc_config));

      // THEN
      expect(vpcConfig.security_group_ids.length).toEqual(2);
      expect(vpcConfig.subnet_ids.length).toEqual(2);
    });
  });
});
