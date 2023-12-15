bring cloud;
bring util;
bring http;

struct Address {
  port: num;
}

interface IHttpServer {
  inflight address(): Address;
  inflight close(): void;
}


// hack: only supported in the "sim" target for now
if util.env("WING_TARGET") == "sim" {
  class MyService {
    b: cloud.Bucket;
    body: str;

    pub s: cloud.Service;

    new(body: str) {
      this.b = new cloud.Bucket();
      this.body = body;

      this.s = new cloud.Service(inflight () => {
        log("starting service");
        let server = MyService.createServer(this.body);
        let port = server.address().port;
        log("listening on port {port}");
        this.b.put("port", "{port}");
  
        return () => {
          log("closing server...");
          server.close();
        };
      });
    }

    pub inflight port(): num {
      return num.fromStr(this.b.get("port"));
    }

    extern "./http-server.js" static inflight createServer(body: str): IHttpServer;
  }

  let foo = new MyService("bang bang!");

  test "http server is started with the service" {
    let response = http.get("http://localhost:{foo.port()}");
    log(response.body);
    assert(response.body == "bang bang!");
  }

  test "service.stop() closes the http server" {
    let before = http.get("http://localhost:{foo.port()}");
    assert(before.ok);
    
    foo.s.stop();

    // now the http server is expected to be closed
    let var error = false;
    try {
      http.get("http://localhost:{foo.port()}");
    } catch {
      error = true;
    }
    assert(error);
  }
}
