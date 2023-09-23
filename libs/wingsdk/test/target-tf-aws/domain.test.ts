import path from "path";
import { expect, test } from "vitest";
import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/target-tf-aws";
import {
  mkdtemp,
  tfResourcesOf,
  tfResourcesWithProperty,
  tfSanitize,
  treeJsonOf,
} from "../util";

const containCertificate = (config: any, certificate: string): boolean => {
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

test("default domain behavior when passing values on the command line", () => {
  // GIVEN
  process.env.WING_VALUES =
    "root/Default/Domain.hostedZoneId=Z0111111111111111111F,root/Default/Domain.acmCertificateArn=arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const app = new tfaws.App({ outdir: mkdtemp() });
  const domain = cloud.Domain._newDomain(app, "Domain", {
    domainName: "www.example.com",
  });
  cloud.Website._newWebsite(app, "Website", {
    path: path.resolve(__dirname, "website"),
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

test("default domain behavior when passing values from file", () => {
  // GIVEN
  process.env.WING_VALUES_FILE = __dirname + "/domain.values.yaml";
  const app = new tfaws.App({ outdir: mkdtemp() });
  const domain = cloud.Domain._newDomain(app, "Domain", {
    domainName: "www.example.com",
  });
  cloud.Website._newWebsite(app, "Website", {
    path: path.resolve(__dirname, "website"),
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
  process.env.WING_VALUES_FILE = "";
});

test("default domain behavior without hostedZoneId and certificate information", () => {
  expect(() => {
    // GIVEN
    process.env.WING_VALUES = "";
    const app = new tfaws.App({ outdir: mkdtemp() });
    cloud.Domain._newDomain(app, "Domain", {
      do: "www.example.com",
    });
  }).toThrowError(`
  - 'iamCertificate' or 'acmCertificateArn' is missing from root/Default/Domain
  - 'hostedZoneId' is missing from root/Default/Domain

These are required properties of platform-specific types. You can set these values
either through '-v | --value' switches or '--values' file.`);
});
