bring cloud;
bring ex;
bring util;

bring "./cloud2.w" as cloud2;
bring "./extern2.w" as ex2;
bring "./utils.w" as util2;

let getFiles = (repo:str, sha:str) => {
  let files = Array<Json> [{filename: "index.html"}, {filename: "index.main.w"}];
  return files;
};

let dns = new cloud2.DNS() as "DNS";
let flyIo = new ex2.FlyIO() as "FlyIO";

class Dashboard {
  api: cloud.Api;
  users: ex.Table;
  previews: ex.Table;
  website: cloud.Website;
  
  init() {
    this.api = new cloud.Api() as "API";
    this.users = new ex.Table(ex.TableProps{
      name: "users",
      primaryKey: "userId",
      columns: {
        "userId" => ex.ColumnType.STRING,
        "ghToken" => ex.ColumnType.STRING,
      },
    }) as "Users";

    this.previews = new ex.Table(ex.TableProps{
      name: "previews",
      primaryKey: "id",
      columns: {
        "id" => ex.ColumnType.STRING,
        "url" => ex.ColumnType.STRING,
        "environment" => ex.ColumnType.STRING,
      },
    }) as "Previews";
    
    this.api.get("/api/preview-environments", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
      let response = cloud.ApiResponse {
        body: Json.stringify(this.previews.list()),
        headers: {
          "Access-Control-Allow-Headers" => "Content-Type",
          "Access-Control-Allow-Origin" => "*",
          "Access-Control-Allow-Methods" => "OPTIONS,POST,GET",
          "content-type" => "application/json"
        },
        status: 200,
      };
      return response;
    });
    
    this.website = new cloud.Website(path: "public") as "wing.cloud.dashboard";
    this.website.addJson(
      "config.json",
      {
        apiUrl: this.api.url,
      }
    );
  }
  
  inflight createPreview(
    cloneUrl: str,
    sha: str,
    repoName: str,
    branchName: str,
    entryPoint: str,
  ) {
    let id = "${entryPoint}-${branchName}-${repoName}";
    let url = flyIo.create(id, cloneUrl, sha, entryPoint);
    let domain = "${id}.wingcloud.app";
    dns.add(domain, url);
    
    let preview: Json? = this.previews.get(id);
        
    if preview? {
      this.previews.update(id, {
        url: url,
        environment: "",
      });
    }
    else {
      this.previews.insert(id, {
        url: url,
        environment: "",
      });
    }
  }
  
  inflight listPreviews(): Array<Json> {
    return this.previews.list();
  }
}

let dashboard = new Dashboard();

let processEventsFn = new cloud.Function(inflight (event:str) => {
  let pr = Json.tryParse(event);
  
  let headData = pr?.get("head");
  let repoData = headData?.get("repo");
  
  let cloneUrl = repoData?.get("clone_url")?.asStr() ?? "";
  let sha = headData?.get("sha")?.asStr() ?? "";
  let repoName = repoData?.get("name")?.asStr() ?? "";
  let branchName = headData?.get("ref")?.asStr() ?? "";
  
  
   // TODO:  https://github.com/winglang/wing/issues/1796
  // let files = Array<Json>.fromJson(pr?.get("head.repo.files"));
  let files = util2.jsonToArray(repoData?.get("files"));
  
  let entryPoints = MutArray<str> [];
  for file in files {
    let filename = file.get("filename").asStr();
    if (filename.endsWith("main.w")) {
      entryPoints.push(filename);
    }
  }
  for entryPoint in entryPoints {
    dashboard.createPreview(cloneUrl, sha, repoName, branchName, entryPoint);
  }
});

class Github {
  events: cloud.Schedule;
  login: cloud.Api;
  
  init() {
    this.events = new cloud.Schedule(cron: "* * * * ?") as "github-events";
    this.login = new cloud.Api() as "github-login";
    
    this.events.onTick(inflight () => {
      let event = {
        "head": {
          "sha": "123",
          "ref": "feat-new-feature",
          "repo": {
            "name": "wing",
            "clone_url": "https://api.github.com/repos/winglang/wing",
            "files": [
              {
                "filename": "main.w"
              }
            ]
          }
        }
      };
      processEventsFn.invoke("${event}");
    });
  }
}

let github = new Github();

// TODO: how are we going to connect github event to a cloud.Function?
// TODO: Json Array to Array https://github.com/winglang/wing/issues/1796
// TODO: DNS resource
// TODO: FlyIO ext resource
// TODO: Github ext resource ?
// TODO: Tsuf is working on adding React app compatibility to the website resource
