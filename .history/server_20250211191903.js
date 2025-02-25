require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use('/video', express.static(path.join(__dirname, 'uploads')));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
    if (req.file) {

        console.log(req.file)

        const extension = path.extname(req.file.originalname);

        if (extension !== '.mpa') {

        }

        const videoPath = path.join(__dirname, req.file.destination, 'filme');

        fs.renameSync(req.file.path, videoPath);

        res.json({ message: "Arquivo recebido com sucesso!", fileUrl: `/video/filme` });


    } else {
        res.status(400).json({ message: "Nenhum arquivo enviado." });
    }
});

app.get("/video", (req, res) => {

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

app.delete("/video", (req, res) => {
    const filePath = path.join(__dirname, 'uploads', fs.readdirSync(path.join(__dirname, 'uploads'))[0]);

    if (fs.existsSync(filePath)) {

        fs.unlinkSync(filePath);

        res.json({ message: "Arquivo apagado com sucesso!" });
    } else {
        res.status(404).json({ message: "Arquivo não encontrado." });
    }
});

io.on("connection", (socket) => {
    console.log("Novo usuário conectado:", socket.id);

    socket.on("sync-video", (data) => {
        socket.broadcast.emit("sync-video", data);
    });

    socket.on("disconnect", () => {
        console.log("Usuário desconectado:", socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
