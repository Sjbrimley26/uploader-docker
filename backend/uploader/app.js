const express = require("express");
const fileUploadMW = require("express-fileupload");
const fs = require("fs");
const { promisify } = require("util");
const appendFile = promisify(fs.appendFile);
const hostname = require("os").hostname();
// const readdir = promisify(fs.readdir);

const app = express();

app.use(fileUploadMW());

app.post("/", async (req, res) => {
  // console.log("POST received!");
  try {
    let errorSent = false;
    const { file } = req.files;
    if (!req.query.id) {
      return res.status(200).send(hostname);
    }
    const id = req.query.id.slice(0, 6);
    const filename = "files/" + id + file.name;
    await appendFile(filename, file.data);
    res.sendStatus(200);
  } catch (err) {
    console.log("Error!", err);
    return res.status(300).send(err);
  }
});

app.get("/", (req, res) => {
  // console.log("GET received!");
  res.status(300).send(hostname);
})

app.listen(4000, () => {
  console.log("Now listening on port 4000");
});
