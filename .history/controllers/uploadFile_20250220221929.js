const path = require("path");
const fs = require("fs").promises;

const UploadFile = (req, res) => {
    const extension = path.extname(req.file.originalname);
    const videoPath = path.join(__dirname, '..', 'uploads', `filme${extension}`);
    const fileName = path.basename(videoPath);
    res.json({ message: "Arquivo recebido com sucesso!", fileUrl: `/video/${fileName}` });
};

module.exports = UploadFile;
