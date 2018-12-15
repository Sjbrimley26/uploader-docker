const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();

app.options("*", cors());
app.use(cors());

app.use("/allFiles", (req, res) => {
  console.log("file request");
  req.pipe(request("http://downloader:3005")).pipe(res);
});

app.use("/download", async (req, res, next) => {
  console.log("download request");
  try {
    const {
      filename
    } = req.query;
    req.pipe(request(`http://downloader:3005/download?filename=${filename}`)).pipe(res);
  } catch (err) {
    console.log("ERROR", err.message);
    next(err);
  }
});

app.use("/", (req, res) => {
  try {
    console.log("root request");
    const {
      resumableChunkNumber,
      resumableTotalChunks,
      resumableFilename,
      resumableIdentifier
    } = req.query;
    req.pipe(request(`http://uploader:4000?id=${resumableIdentifier}`)).pipe(res);
  } catch (err) {
    console.log(err);
    res.sendStatus(502);
  }
});

app.listen(3000, () => {
  console.log("Now listening on port 3000");
});
