const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

const convertToMP4 = (inputFile, outputFile) => {
    ffmpeg(inputFile)
        .output(outputFile)
        .videoCodec("libx264") // Usa o codec padrão para MP4
        .audioCodec("aac") // Usa o codec de áudio padrão para MP4
        .on("progress", (progress) => {
            console.log(`Conversão: ${progress.percent}% concluída`);
        })
        .on("end", () => {
            const extension = path.extname(req.file.originalname);

            const videoPath = path.join(__dirname, '..', 'uploads', `filme${extension}`);

            const fileName = path.basename(videoPath)

            return { message: 'Arquivo convertido com sucesso!', fileUrl: `/video/${fileName}` };
        })
        .on("error", (err) => {
            console.error("Erro ao converter vídeo:", err);
        })
        .run();
}

module.exports = convertToMP4