const ytdl = require("ytdl-core");

const getTitle = async (url) => {
    return new Promise( async (resolve, reject) => {
        const info = await ytdl.getInfo(url);
        if (!info) reject(new Error());
        resolve(info.videoDetails.title);
    });
}

const download = async (url) => {
    return new Promise( async (resolve, reject) => {
        const videoStream = await ytdl(url, {
            filter: "audioonly"
        })

        if (!videoStream) reject(new Error());
        resolve(videoStream);
    });
};

module.exports = { getTitle, download };