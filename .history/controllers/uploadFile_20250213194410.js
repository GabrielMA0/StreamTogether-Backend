const path = require("path");
const fs = require("fs");

const UploadFile = (file) => {

    const videoPath = path.join(__dirname, '..', 'uploads', 'filme');

    fs.renameSync(file.path, videoPath);

    const fileName = path.basename(videoPath)

    console.log(fileName);

    return { message: "Arquivo recebido com sucesso!", fileUrl: `/video/filme` }
}

module.exports = UploadFile