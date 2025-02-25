const path = require("path");
const fs = require("fs");

const UploadFile = (req, res) => {

    const extension = path.extname(req.file.originalname);

    const videoPath = path.join(__dirname, '..', 'uploads', `filme${extension}`);

    fs.renameSync(req.file.path, videoPath);

    const fileName = path.basename(videoPath)

    res.json({ message: "Arquivo recebido com sucesso!", fileUrl: `/video/${fileName}` })
}

module.exports = UploadFile