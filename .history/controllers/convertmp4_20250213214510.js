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
            return { message: };
        })
        .on("error", (err) => {
            console.error("Erro ao converter vídeo:", err);
        })
        .run();
}

module.exports = convertToMP4