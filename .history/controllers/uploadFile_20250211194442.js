const path = require("path");

const UploadFile = (file) => {
    const extension = path.extname(req.file.originalname);

    if (extension !== '.mp4') {
        convertToMP4()
    }

    const videoPath = path.join(__dirname, req.file.destination, 'filme');

    fs.renameSync(req.file.path, videoPath);
}

module.exports = UploadFile