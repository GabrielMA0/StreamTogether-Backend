require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: "uploads/" });

const UploadFile = require('../controllers/uploadFile');
const recoverFile = require('../controllers/recoverFile');
const deleteFile = require('../controllers/deleteFile');

router.use(express.static(path.join(__dirname, '..', 'uploads')));

router.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado." });
    }
    UploadFile(req, res);
});


router.get("/", (req, res) => {
    recoverFile(req, res)
});

router.delete("/", (req, res) => {
    deleteFile(req, res)
});

module.exports = router