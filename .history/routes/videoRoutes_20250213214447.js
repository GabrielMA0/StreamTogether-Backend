require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: "uploads/" });

const UploadFile = require('../controllers/uploadFile');
const convertToMP4 = require('../controllers/convertmp4');
const recoverFile = require('../controllers/recoverFile');
const deleteFile = require('../controllers/deleteFile');

router.use(express.static(path.join(__dirname, 'uploads')));

router.post("/upload", upload.single("file"), (req, res) => {
    if (req.file) {

        const extension = path.extname(req.file.originalname);

        if (extension !== '.mp4') return res.json(convertToMP4(req.file.originalname, 'filme.mp4'))

        UploadFile(req, res);

    } else {
        res.status(400).json({ message: "Nenhum arquivo enviado." });
    }
});

router.get("/", (req, res) => {
    recoverFile(req, res)
});

router.delete("/", (req, res) => {
    deleteFile(req, res)
});

module.exports = router