const express = require('express')

const bodyParser = require("body-parser");
const serviceApp = express();
serviceApp.use(bodyParser.json())


serviceApp.use(bodyParser.json());


// Response(errorLevelAndMsg, result, type:array, ispacked)


serviceApp.get("/", (req, res) => {
   res.send('Nothing to see here, move along');
})

const uniq = '--A'
serviceApp.post("/pageOne", (req, res) => {
   const user = req.body['user'+uniq]
   const pswd = req.body['pswd'+uniq]
   console.log(user,pswd)
   const method = req.body['method'+uniq]
   console.log(method)


   const resp:any= {} // new response
   if('multiply'==method) {


   
      res.json(resp)
   } else {
      resp.errorLevel = 1
      resp.errorMessage = 'mismatch'
      res.json(resp)
   }
})


serviceApp.listen(8888, () => {
   console.info('8888');
});
