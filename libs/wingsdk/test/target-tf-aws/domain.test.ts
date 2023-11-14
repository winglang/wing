import path from "path";
import { beforeEach, describe, expect, test } from "vitest";
import * as cloud from "../../src/cloud";
import * as ex from "../../src/ex";
import * as tfaws from "../../src/target-tf-aws";
import {
  mkdtemp,
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
      "root/Default/Domain.hostedZoneId=Z0111111111111111111F,root/Default/Domain.acmCertificateArn=arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
    const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
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
    const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
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

  test("react website with a domain when passing values on the command line", () => {
    // GIVEN
    const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
    process.env.WING_VALUES =
      "root/Default/Domain.hostedZoneId=Z0111111111111111111F,root/Default/Domain.acmCertificateArn=arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
    const domain = new cloud.Domain(app, "Domain", {
      domainName: "www.example.com",
    });
    // this isn't a React App, but a website with a package json and a build command
    new ex.ReactApp(app, "Website", {
      projectPath: "../test-files/react-website",
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

  test("react website with a domain when passing values from file", () => {
    // GIVEN
    const app = new tfaws.App({ outdir: mkdtemp(), entrypointDir: __dirname });
    process.env.WING_VALUES_FILE = __dirname + "/domain.values.yaml";
    const domain = new cloud.Domain(app, "Domain", {
      domainName: "www.example.com",
    });
    // this isn't a React App, but a website with a package json and a build command
    new ex.ReactApp(app, "Website", {
      projectPath: "../test-files/react-website",
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
      const app = new tfaws.App({
        outdir: mkdtemp(),
        entrypointDir: __dirname,
      });
      new cloud.Domain(app, "Domain", {
        domainName: "www.example.com",
      });
    }).toThrowError(`
  - 'iamCertificate' or 'acmCertificateArn' is missing from root/Default/Domain
  - 'hostedZoneId' is missing from root/Default/Domain

These are required properties of platform-specific types. You can set these values
either through '-v | --value' switches or '--values' file.`);
  });
});
