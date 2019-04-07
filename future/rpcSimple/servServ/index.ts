const express = require('express')

const bodyParser = require("body-parser");
const adminApp = express();
adminApp.use(bodyParser.json())


adminApp.use(bodyParser.json());


// Response(errorLevelAndMsg, result, type:array, ispacked)


adminApp.get("/", (req, res) => {
   res.send('Nothing to see here, move along');
})

adminApp.post("/pageOne", (req, res) => {
   const user = req.body.user;
   const pswd = req.body.pswd;
   console.log(user,pswd)

   const method = req.body.method
   if('multiply'==method) {


   

   } else {
      res.status(400);
      res.send({ error: 'mismatch' });
   }
});


adminApp.listen(8888, () => {
   console.info('8888');
});
