const path = require("path");
const fs = require("fs");

const UploadFile = (file) => {

    const videoPath = path.join(__dirname, file.destination, 'filme');

    console.log("__dirname", __dirname);
    console.log("destination", file.destination);

    fs.renameSync(file.path, videoPath);

    return { message: "Arquivo recebido com sucesso!", fileUrl: `/video/filme` }
}

module.exports = UploadFile