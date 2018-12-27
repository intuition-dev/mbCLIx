var express = require("express");
var cors = require('cors');
var fileUpload = require('express-fileupload');
var port = 3001;
var app = express();
// app.use('/', express.static('tmp'));
app.use(fileUpload());
app.use(cors());
app.post('/upload', function (req, res) {
    var uploadPath;
    console.log('req: ', req.files);
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    var sampleFile = req.files.sampleFile;
    uploadPath = 'tmp/' + sampleFile.name;
    console.log('uploadPath: ', uploadPath);
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
        res.send('File uploaded!');
    });
});
app.listen(port, function () {
    console.log("app listening on port " + port + "!");
});
