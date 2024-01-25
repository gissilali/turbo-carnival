const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.get("/static", express.static(path.resolve(__dirname, "static")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
