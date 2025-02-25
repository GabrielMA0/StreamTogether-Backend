require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const UploadFile = require('../controllers/uploadFile');
const upload = multer({ dest: "uploads/" });
const convertToMP4 = require('../controllers/convertmp4')

router.use(express.static(path.join(__dirname, 'uploads')));

router.post("/upload", upload.single("file"), (req, res) => {
    if (req.file) {

        const extension = path.extname(req.file.originalname);

        if (extension !== '.mp4') return convertToMP4(req.file.originalname, 'filme.mp4')

        res.json(UploadFile(req.file));

    } else {
        res.status(400).json({ message: "Nenhum arquivo enviado." });
    }
});

router.get("/", (req, res) => {

    const uploadDir = path.join(__dirname, '..', 'uploads');

    console.log("uploadDir", uploadDir)

    if (fs.existsSync(uploadDir)) {
        const files = fs.readdirSync(uploadDir);

        if (files.length > 0) {
            const filePath = path.join(uploadDir, files[0]);

            res.json({
                message: "Arquivo encontrado com sucesso!",
                fileUrl: `/video/${path.basename(filePath)}`
            });
        } else {
            res.status(404).json({ message: "Nenhum arquivo encontrado no diretório." });
        }
    } else {
        res.status(404).json({ message: "Diretório 'uploads' não encontrado." });
    }

});

router.delete("/", (req, res) => {
    const filePath = path.join(__dirname, 'uploads', fs.readdirSync(path.join(__dirname, 'uploads'))[0]);

    console.log("filePath", filePath)

    if (fs.existsSync(filePath)) {

        fs.unlinkSync(filePath);

        res.json({ message: "Arquivo apagado com sucesso!" });
    } else {
        res.status(404).json({ message: "Arquivo não encontrado." });
    }
});

module.exports = router