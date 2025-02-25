
const path = require("path");
const fs = require("fs");

const recoverFile = () => {
    const uploadDir = path.join(__dirname, '..', 'uploads');

    if (fs.existsSync(uploadDir)) {
        const files = fs.readdirSync(uploadDir);

        if (files.length > 0) {
            const filePath = path.join(uploadDir, files[0]);

            return filePath
        } else {
            return false
        }
    } else {
        return false
    }
}

module.exports = recoverFile