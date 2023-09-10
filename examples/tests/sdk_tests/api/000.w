bring cloud;
bring http;

// let api = new cloud.Api();
let ApiCorsOptions = cloud.ApiCorsOptions{ allowCredentials: false };

let api = new cloud.Api(true)