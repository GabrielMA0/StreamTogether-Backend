
const deleteFile = () => {
    const filePath = path.join(__dirname, '..', 'uploads', fs.readdirSync(path.join(__dirname, '..', 'uploads'))[0]);

    if (fs.existsSync(filePath)) {

        fs.unlinkSync(filePath);

        res.json({ message: "Arquivo apagado com sucesso!" });
    } else {
        res.status(404).json({ message: "Arquivo não encontrado." });
    }
}
