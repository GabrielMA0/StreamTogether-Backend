const path = require("path");
const fs = require("fs");

const UploadFile = (file) => {
    const extension = path.extname(file.originalname);

    console.log("extension", extension)

    if (extension !== '.mp4') {
        convertToMP4()
    }

    const videoPath = path.join(__dirname, file.destination, 'filme');

    fs.renameSync(file.path, videoPath);

    return { message: "Arquivo recebido com sucesso!", fileUrl: `/video/filme` }
}

module.exports = UploadFile