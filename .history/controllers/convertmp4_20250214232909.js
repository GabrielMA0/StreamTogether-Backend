const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

const convertToMP4 = (inputFile, outputFile) => {
    ffmpeg(inputFile)
        .output(outputFile)
        .videoCodec("libx264") // Usa o codec padrão para MP4
        .audioCodec("aac") // Usa o codec de áudio padrão para MP4
        .outputOptions('-preset ultrafast')
        .outputOptions('-vf scale=1280:-1') // Reduz resolução (opcional)
        .outputOptions('-threads 4') // Usa mais núcleos do processador
        .on("progress", (progress) => {
            console.log(`Conversão: ${progress.percent}% concluída`);
        })
        .on("end", () => {
            console.log("Arquivo convertido com sucesso!")
            resolve(outputFile);
        })
        .on("error", (err) => {
            console.error("Erro ao converter vídeo:", err);
        })
        .run();
}

module.exports = convertToMP4