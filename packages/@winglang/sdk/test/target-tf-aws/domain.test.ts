import path from "path";
import { beforeEach, describe, expect, test } from "vitest";
import { AwsApp } from "./aws-util";
import * as cloud from "../../src/cloud";
import {
  tfResourcesOf,
  tfResourcesWithProperty,
  tfSanitize,
  treeJsonOf,
} from "../util";

export const containCertificate = (
  config: any,
  certificate: string
): boolean => {
  const website = config.resource.aws_cloudfront_distribution;

  for (const distribution of Object.keys(website)) {
    const viewerCertificate = website[distribution].viewer_certificate;
    if (
      !viewerCertificate ||
      (viewerCertificate.acm_certificate_arn !== certificate &&
        viewerCertificate.iamCertificate !== certificate)
    ) {
      continue;
    }
    return true;
  }
  return false;
};

describe("cloud.Domain for tf-aws", () => {
  beforeEach(() => {
    delete process.env.WING_VALUES;
    delete process.env.WING_VALUES_FILE;
  });

  test("website with a domain when passing values on the command line", () => {
    // GIVEN
    process.env.WING_VALUES =
      "root/Default/Domain/hostedZoneId=Z0111111111111111111F,root/Default/Domain/acmCertificateArn=arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
    const app = new AwsApp();
    const domain = new cloud.Domain(app, "Domain", {
      domainName: "www.example.com",
    });
    new cloud.Website(app, "Website", {
      path: path.resolve(__dirname, "../test-files/website"),
      domain: domain,
    });
    const output = app.synth();

    // THEN
    expect(tfResourcesOf(output)).toEqual([
      "aws_cloudfront_distribution",
      "aws_cloudfront_origin_access_control",
      "aws_route53_record",
      "aws_s3_bucket",
      "aws_s3_bucket_policy",
      "aws_s3_bucket_website_configuration",
      "aws_s3_object",
    ]);
    const hasCertificate = containCertificate(
      JSON.parse(output),
      "arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
    );
    expect(hasCertificate).toEqual(true);
    expect(
      tfResourcesWithProperty(output, "aws_route53_record", {
        zone_id: "Z0111111111111111111F",
      })
    ).not.toBeUndefined();
    expect(tfSanitize(output)).toMatchSnapshot();
    expect(treeJsonOf(app.outdir)).toMatchSnapshot();
  });

  test("website with a domain when passing values from file", () => {
    // GIVEN
    process.env.WING_VALUES_FILE = __dirname + "/domain.values.yaml";
    const app = new AwsApp();
    const domain = new cloud.Domain(app, "Domain", {
      domainName: "www.example.com",
    });
    new cloud.Website(app, "Website", {
      path: path.resolve(__dirname, "../test-files/website"),
      domain: domain,
    });
    const output = app.synth();

    // THEN
    expect(tfResourcesOf(output)).toEqual([
      "aws_cloudfront_distribution",
      "aws_cloudfront_origin_access_control",
      "aws_route53_record",
      "aws_s3_bucket",
      "aws_s3_bucket_policy",
      "aws_s3_bucket_website_configuration",
      "aws_s3_object",
    ]);
    const hasCertificate = containCertificate(
      JSON.parse(output),
      "arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
    );
    expect(hasCertificate).toEqual(true);
    expect(
      tfResourcesWithProperty(output, "aws_route53_record", {
        zone_id: "Z0111111111111111111F",
      })
    ).not.toBeUndefined();
    expect(tfSanitize(output)).toMatchSnapshot();
    expect(treeJsonOf(app.outdir)).toMatchSnapshot();
  });

  test("default domain behavior without hostedZoneId and certificate information", () => {
    expect(() => {
      // GIVEN
      const app = new AwsApp();
      new cloud.Domain(app, "Domain", {
        domainName: "www.example.com",
      });
      app.synth();
    }).toThrowError(
      new RegExp(
        `Parameter validation errors:\\s*` +
          `- must have required property 'root' \\s*`.replace(/\s+/g, "\\s*") // Normalize whitespace for comparison
      )
    );
  });
});
