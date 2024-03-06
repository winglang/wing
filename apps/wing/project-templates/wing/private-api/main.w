bring cloud;
bring http;
bring util;

/**
 * The example below is a simple note-taking app.
 * It uses a cloud.Bucket to store notes and a cloud.Api to expose a RESTful interface.
 * 
 * The api has two endpoints:
 * - GET /note?name=NAME to get a note by name
 * - PUT /note/:NAME to save a note by name
 * 
 * The app also includes two cloud.Functions to consume the api.
 * - Consumer-PUT reads a string like: `NAME:NOTE` and calls the api to save it.
 * - Consumer-GET reads a string like: `NAME` and calls the api to get the note.
 * 
 * These consumer functions are not required for the app to work, but since our api is private, they are useful for testing.
 * As an example, if you deploy this app to AWS, you can use the AWS CLI to invoke these functions
 * by running the following commands, you can test the api:
 * `aws lambda invoke --cli-binary-format raw-in-base64-out --function-name <function-name> --payload "\"n1:this is my note\"" response.json`
 * `cat response.json`
 * 
 * And retrieve the note:
 * `aws lambda invoke --cli-binary-format raw-in-base64-out --function-name <function-name> --payload "\"n1\"" response.json`
 * `cat response.json`
 *
 * If you have not made changes to this template you can find your function names in AWS using the following command:
 * `aws lambda list-functions --query "Functions[?starts_with(FunctionName, 'Consumer')].FunctionName"`
 */
 class NoteService {
  pub api: cloud.Api;
  notes: cloud.Bucket;

  new() {
    this.notes = new cloud.Bucket() as "my-notes";
    this.api = new cloud.Api() as "notes-api";


    let notes = this.notes;

    this.api.get("/note", inflight(request) => {
      let noteName = request.query.get("name");
      let note = notes.tryGet(noteName);

      if let note = note {
        return {
          status: 200,
          body: "{note}"
        };
      } else {
        return {
          status: 400,
          body: "Unable to find note named: {noteName}"
        };
      }
    });

    this.api.post("/note/:name", inflight (request) => {
      let note = request.body;
      let noteName = request.vars.get("name");

      if (note == "") {
        return {
          status: 400,
          body: "note is required!"
        };
      }

      if let note = note {
        notes.put(noteName, note);
        return {
          status: 200,
          body: "note: {noteName} saved!"
        };
      }
    });

    this.api.delete("/note/:name", inflight(request) => {
      let noteName = request.vars.get("name");

      if notes.tryDelete(noteName) {
        return {
          status: 200,
          body: "note: {noteName} was deleted!"
        };
      }

      return {
        status: 404,
        body: "Unable to find note named: {noteName}"
      };
    });
  }
}

let noteService = new NoteService();

// Consumer functions (not required for the app to work, but useful for testing)
if util.env("WING_TARGET") == "tf-aws" {
  new cloud.Function(inflight (event: str?) => {
    if let event = event {
      let parts = event.split(":");
      let name = parts.at(0);
      let note = parts.at(1);
  
      let response = http.post("{noteService.api.url}/note/{name}", {
        body: "{note}"
      });
      return response.body;
    }
  
    return "event is required `NAME:NOTE`";
  }) as "Consumer-PUT";
  
  new cloud.Function(inflight (event: str?) => {
    if let event = event {
      let response = http.delete("{noteService.api.url}/note/{event}");
      return response.body;
    }
  
    return "event is required `NAME`";
  }) as "Consumer-DELETE";
  
  new cloud.Function(inflight (event: str?) => {
    if let event = event {
      return http.get("{noteService.api.url}/note?name={event}").body;
    }
  
    return "event is required `NAME`";
  }) as "Consumer-GET";
}