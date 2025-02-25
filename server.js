require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const videoRoutes = require('./routes/videoRoutes');

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
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

app.use('/video', videoRoutes);

server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
