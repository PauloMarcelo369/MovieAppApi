const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(cors());

app.get("/video/:id", (req, res) => {
  const videoId = req.params.id;

  console.log("nova requisição chegou");

  const videoPath = path.join(__dirname, "videos", `${videoId}.mp4`);

  if (fs.existsSync(videoPath)) {
    const stat = fs.statSync(videoPath);
    res.writeHead(200, {
      "content-type": "video/mp4",
      "content-length": stat.size,
    });

    const readStream = fs.createReadStream(videoPath);
    readStream.pipe(res);
  } else {
    res.status(404).send("O video não foi encontrado");
  }
});

app.listen(22, () => {
  console.log("servidor rodando da porta 22");
});
