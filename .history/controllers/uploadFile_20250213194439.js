const path = require("path");
const fs = require("fs");

const UploadFile = (file) => {

    const videoPath = path.join(__dirname, '..', 'uploads', 'filme');

    fs.renameSync(file.path, videoPath);

    const fileName = path.basename(videoPath)

    return { message: "Arquivo recebido com sucesso!", fileUrl: `/video/${fileName}` }
}

module.exports = UploadFile