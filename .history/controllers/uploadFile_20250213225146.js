const path = require("path");
const fs = require("fs");

const UploadFile = (req, res) => {

    const videoPath = path.join(__dirname, '..', 'uploads', 'filme');

    fs.renameSync(req.file.path, videoPath);

    const fileName = path.basename(videoPath)

    res.json({ message: "Arquivo recebido com sucesso!", fileUrl: `/uploads/${fileName}` })
}

module.exports = UploadFile