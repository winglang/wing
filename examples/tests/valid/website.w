bring cloud;

let w = new cloud.Website(cloud.WebsiteProps {
    path: "./website"
});

log("website is up and running on ${w.url}!");

