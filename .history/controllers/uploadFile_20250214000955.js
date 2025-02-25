const path = require("path");
const fs = require("fs").promises; // <-- Aqui está a mudança

const UploadFile = async (req, res) => {
    try {
        const extension = path.extname(req.file.originalname);
        const videoPath = path.join(__dirname, '..', 'uploads', `filme${extension}`);

        await fs.rename(req.file.path, videoPath); // <-- Agora `await` funciona corretamente

        const fileName = path.basename(videoPath);
        res.json({ message: "Arquivo recebido com sucesso!", fileUrl: `/video/${fileName}` });
    } catch (error) {
        res.status(500).json({ message: "Erro ao processar o arquivo", error: error.message });
    }
};

module.exports = UploadFile;
