const path = require("path");
const fs = require("fs");

const UploadFile = async (req, res) => {
    try {
        const extension = path.extname(req.file.originalname);
        const videoPath = path.join(__dirname, '..', 'uploads', `filme${extension}`);

        await fs.rename(req.file.path, videoPath);

        const fileName = path.basename(videoPath);
        res.json({ message: "Arquivo recebido com sucesso!", fileUrl: `/video/${fileName}` });
    } catch (error) {
        res.status(500).json({ message: "Erro ao processar o arquivo", error: error.message });
    }
};

module.exports = UploadFile