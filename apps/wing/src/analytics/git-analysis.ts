import { execFile } from "child_process";
import { GitData } from "./event";

export async function getDevStats(): Promise<GitData> {
  const getContribCount = (lines: string) => {
    return lines.split("\n").filter((line: string) => line.trim() !== "").length;
  }

  const formatGitURL = (url: string) => {
    if (url.startsWith("http")) {
      return url;
    }
    // This means the user used SSH to clone so we need to format it to HTTPS
    return url.replace(":", "/").replace("git@", "https://");
  }

  const gitVersion = await runCommand("git", ["--version"]);
  
  // If git is not installed then we just return an empty object
  if (gitVersion.trim() === "") {
    return {} as GitData;
  }

  // If the user is not in a git repo then we just return an empty object
  if (!await isGitRepo()) {
    return {} as GitData;
  }

  const totalContribs = await runCommand(
    "git", 
    [
      "--no-pager",
      "shortlog",
      "-sn",
      "--all",
    ]
  );

  const last90days = await runCommand(
    "git", 
    [
      "--no-pager",
      "shortlog",
      "-sn",
      "--since='90 days ago'",
      "--all",
    ]
  );

  const originUrl = await runCommand(
    "git",
    [
      "config",
      "--get",
      "remote.origin.url",
    ]
  );
  
  return {
    contributors: {
      total: getContribCount(totalContribs),
      last90Days: getContribCount(last90days),
    },
    version: gitVersion.trim(),
    originUrl: formatGitURL(originUrl).trim(),
  }
}

async function isGitRepo(): Promise<boolean> {
  const inGitTree = await runCommand("git", ["rev-parse", "--is-inside-work-tree"]);
  if (inGitTree.trim() === "true") {
    return true;
  }
  return false;
}


// Helper function to run commands when querying git data. 
// because we cant be sure that the user has git installed or is even
// in a git repo this function just returns an empty string if something fails
async function runCommand(cmd: string, args: string[]): Promise<any> {
  try {
    const raw = await new Promise((resolve, reject) => {
      execFile(cmd, args, (error, stdout, stderr) => {
        if (error) {
          stderr;
          reject(error);
        }
        resolve(stdout);
      });
    });
    return raw;
  } catch (error) {
    // We dont want this to cause any issues for users if something failed
    // so we just return an empty string
    return "";
  }
}