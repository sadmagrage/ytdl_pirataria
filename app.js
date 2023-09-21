const express = require('express');
const path = require("path");

const { getTitle, download } = require("./utils/download");

const app = express();
const port = 3000

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static/index.html"));
});

app.post("/", express.urlencoded(), async (req, res) => {
    const { url } = req.body;

    const title = await getTitle(url);

    try {
        res.setHeader("Content-Disposition", `attachment; filename=${ title }.mp3`);   
    } catch (error) {
        res.setHeader("Content-Disposition", `attachment; filename=no_title.mp3`);
    }
    
    res.setHeader("Content-Type", 'audio/mpeg');

    const videoStream = await download(url);

    videoStream.pipe(res);
});

app.listen(port, () => console.log('running on port ' + port));