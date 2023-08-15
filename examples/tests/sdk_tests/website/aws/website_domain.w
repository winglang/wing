/*\
skip: true
\*/
// this example only works on AWS (intentionally)

bring cloud;
bring http;
bring aws;

let domain = "www.example.com";

/* The values of domain, hostedZoneId, and acmCertificateArn are fictitious
 * only for the purpose of illustrating how to configure a domain for a 
 * website on AWS */
let w = new cloud.Website(aws.AwsWebsiteProps {
  path: "./website",
  domain: domain,
  hostedZoneId: "Z111111111AAAA1A111AA",
  acmCertificateArn: "arn:aws:acm:us-east-1:111111111111:certificate/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
});

test "access files on the website" {
    let var url = w.url;
    if (!url.startsWith("http")) {
      url = "http://" + url;
    }
    
    assert(http.get(url).status == 200);
    assert(http.get("https://" + domain).status == 200);
}  
