import { cloud, lift, main } from "@wingcloud/framework";

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
main((root) => {
  let noteBucket = new cloud.Bucket(root, "Bucket");
  
  const api = new cloud.Api(root, "Api");

  api.get('/note', lift({noteBucket}).inflight(async ({noteBucket}, request) => {
    let noteName = request.query.name; 
    const note = await noteBucket.get(noteName);

    return {
      statusCode: 200,
      body: note
    }
  }));

  api.put('/note/:name', lift({noteBucket}).inflight(async ({noteBucket}, request) => {
    let note = request.body;
    let noteName = request.vars.name;

    if (!note) {
      return {
        statusCode: 400,
        body: "note is required"
      }
    }

    await noteBucket.put(noteName, note ?? "");

    return {
      statusCode: 200,
      body: `note: "${noteName}" saved!`
    }
  }));



  // Consumer functions (not required for the app to work, but useful for testing)
  new cloud.Function(root, "Consumer-PUT", lift({url: api.url}).inflight(async ({url}, event) => {
    if (!event) {
      return "event is required `NAME:NOTE`"
    }
    const [name, note] = event!.split(":");
    const response = await fetch(`${url}/note/${name}`, {
      method: 'PUT',
      body: JSON.stringify(note)
    });

    return await response.text();
  }))

  new cloud.Function(root, "Consumer-GET", lift({url: api.url}).inflight(async ({url}, event) => {
    if (!event) {
      return "event is required `NAME`"
    }

    const response = await fetch(`${url}/note?name=${event}`);

    return await response.text();
  }));
});
