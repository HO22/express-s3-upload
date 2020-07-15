const http = require("http");
const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const httpServer = http.createServer(app);
const muster1 = require("multer");

const PORT = 3000;

httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

const upload = muster1({
    dest: "Your Path"
    // ex) /Users/WebstormProjects/express-s3-upload/uploads
});


app.get("/", express.static(path.join(__dirname, "./public")));

app.post("/upload", upload.single("file"), (req, res) => {
        console.log(req)
        const tempPath = req.file.path;
        const filename = './uploads/' + req.file.originalname
        const targetPath = path.join(__dirname, filename);
        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
            res.send(req.file.originalname);
        });
    }
);

app.get("/:media", (req, res) => {
    const {media} = req.params;

    const filename = "./uploads/" + media
    res.sendFile(path.join(__dirname, filename));
});
