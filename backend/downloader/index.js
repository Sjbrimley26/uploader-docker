const express = require("express");
const fs = require("fs");
const { promisify } = require("util");
const mime = require("mime");

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const app = express();

app.get("/download", async (req, res, next) => {
  try {
    const {
      filename
    } = req.query;
    const src = fs.createReadStream(`files/${filename}`);
    const type = mime.getType(filename);
    const st = await stat("files/" + filename);
    res.writeHead(200, {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": stat.size
    });
    src.pipe(res);
    src.on("error", err => {
      console.log("Error!", err);
    });
  } catch (err) {
    console.log("ERROR!", err.message);
    next(err);
  }
});

app.get("/", async (req, res, next) => {
  try {
    const files = await readdir("files/");
    console.log("files", files);
    res.status(200).send(JSON.stringify(files));
  } catch (err) {
    console.log("ERROR!", err.message);
    next(err);
  }
});

app.listen(3005, () => console.log("Downloader listening on port 3005!"));
