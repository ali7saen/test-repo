require("dotenv").config();
const express = require("express");
const multer = require('multer');
const fs = require('fs');
const path = require("path")


const app = express();
app.set("view engine", "ejs");
app.use(express.static("uploads"));

// main middlewares
app.use(express.json())



app.get("/", async (req, res)=>{
    res.render("index.ejs");
});


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "./uploads"))
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    }
});


const upload = multer({
    storage
});


app.post('/upload', upload.single('sound'), (req, res) => {
    res.status(200).json({});
});


app.get('/sounds',  (req, res) => {
    res.render("listen.ejs");
});


app.get('/sounds/get', (req, res) => {
    const filePath = path.join(__dirname, `/uploads/2024-02-13T06-14-54.983ZØ§ÙÙØ±Ø§Ù Ø§ÙÙØ±ÙÙ Ø¨ØµÙØª Ø¹Ø§ÙØ± Ø§ÙÙØ§Ø¸ÙÙ - Ø§ÙØ¬Ø²Ø¡ Ø§ÙØ§ÙÙ - alquran alkareem -juz 1 Amer Alkadhmay [TubeRipper.com].mp3`);

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});

const PORT = process.env.PORT || 9000;
app.listen(PORT,() => console.log(`server is up on port ${PORT}`));