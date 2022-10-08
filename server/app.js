const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/public", express.static("public"));
app.use("/api", require("../router/api"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use((ex, req, res, next) => {
  res.status(500).send(ex);
});

module.exports = app;
