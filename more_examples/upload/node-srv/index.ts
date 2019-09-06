
////declare let require: any
//declare let console: Console;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const fileUpload = require('express-fileupload')

const port = 3001;

const app = express();
// app.use('/', express.static('tmp'));
app.use(fileUpload())
app.use(cors())


app.post('/upload', function (req, resp) {
   let uploadPath;

   if (Object.keys(req.files).length == 0) {
      return resp.status(400).send('No files were uploaded.');
   }

   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
   let sampleFile = req.files.sampleFile;
   console.log('sampleFile: ', sampleFile, sampleFile.name, sampleFile.path);
   uploadPath = __dirname + '/uploads/' + sampleFile.name
   console.log('uploadPath: ', uploadPath);

   // Use the mv() method to place the file somewhere on your server
   sampleFile.mv(uploadPath, function (err) {
      if (err) 
         return resp.status(500).send(err);
      resp.send({status: "OK"});
   })
});


app.listen(port, () => {
   console.info(`app listening on port ${port}!`);
});