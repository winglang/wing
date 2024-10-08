// This file was auto generated from an example found in: 33-http-client.md_example_1
// Example metadata: {"valid":true}
bring http;
bring cloud;

struct Pokemon {
  id: num;
  name: str;
  order: num;
  weight: num;
}

new cloud.Function(inflight () => {
  let x = http.get("https://pokeapi.co/api/v2/pokemon/ditto");

  // response status
  log(x.status);

  // parse string response as a JSON object
  let data = Json.parse(x.body);

  // cast JSON response into struct
  let ditto = Pokemon.fromJson(data);
  log(ditto.name);
});
