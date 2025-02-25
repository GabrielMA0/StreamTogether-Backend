require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

router.use(express.static(path.join(__dirname, 'uploads')));

router.post("/upload", upload.single("file"), (req, res) => {
    if (req.file) {



        res.json({ message: "Arquivo recebido com sucesso!", fileUrl: `/video/filme` });


    } else {
        res.status(400).json({ message: "Nenhum arquivo enviado." });
    }
});

router.get("/", (req, res) => {

    const uploadDir = path.join(__dirname, 'uploads');

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

    if (fs.existsSync(filePath)) {

        fs.unlinkSync(filePath);

        res.json({ message: "Arquivo apagado com sucesso!" });
    } else {
        res.status(404).json({ message: "Arquivo não encontrado." });
    }
});

module.exports = router