const express = require("express");
const {join} = require("path");

const app = express();

app.use("/", express.static(join(__dirname, "/public")));

app.listen(process.env.PORT ?? 3000, () => console.log("app is running!"));
