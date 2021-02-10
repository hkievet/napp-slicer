const express = require("express");
const app = express();

app.use("/static", express.static("audio"));

const port = 3333;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
