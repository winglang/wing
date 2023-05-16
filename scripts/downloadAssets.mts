import { request } from "@octokit/request";
import fs from "node:fs/promises";
import { join } from 'path';

const authorization = `token ${process.env.GITHUB_TOKEN}`;

try {
  console.log("Creating dist directory...");
  const dir = "./dist";
  await fs.mkdir(dir);

  console.log("Downloading latest release...");
  const owner = "winglang";
  const repo = "wing";
  const release = await request(`GET /repos/${owner}/${repo}/releases/latest`, {
    headers: {
      authorization,
    },
  });
  console.log("Release:", release);
  console.log("Release version:", release.data.tag_name);

  console.log("Looking for assets...");
  const assets = release.data.assets.filter((asset) => {
    return (
      (!asset.name.endsWith(".gz") && asset.name !== "docs.tgz")
    );
  });

  console.log(`Found ${assets.length} assets.`);
  console.log(assets);

  for (const asset of assets) {
    console.log(`Downloading ${asset.name}...`);
    const response = await request(
      `GET /repos/${owner}/${repo}/releases/assets/${asset.id}`,
      {
        headers: {
          authorization,
          accept: "application/vnd.github+json",
        },
      }
    );
    const filePath = join(dir, asset.name);
    await fs.writeFile(filePath, Buffer.from(JSON.stringify(response.data)));
    console.log(`Downloaded ${asset.name}.`);
  }

  console.log("Downloaded all assets successfully.");
} catch (error) {
  console.error(error);
};