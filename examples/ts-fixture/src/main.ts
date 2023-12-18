import { wing } from 'ts4wing';
import { cloud } from "@winglang/sdk";

wing((app) => {
  new cloud.Bucket(app, "Bucket");
});