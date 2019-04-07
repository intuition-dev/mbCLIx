const express = require('express')

const bodyParser = require("body-parser")
const serviceApp = express()
serviceApp.use(bodyParser.json())


serviceApp.use(bodyParser.json())


serviceApp.get("/", (req, res) => {
   res.send('Nothing to see here, move along')
})


const uniq = '--A'
serviceApp.post("/pageOne", (req, res) => {
   const user = req.body['user'+uniq]
   const pswdH = req.body['pswdH'+uniq]
   console.log(user,pswdH)
   const method = req.body['method'+uniq]
   console.log(method)

   const resp:any= {} // new response
   if('multiply'==method) {
      let a = req.body.a
      let b = req.body.b

      resp.result = a*b

      resp.type = ''//eg array
      resp.ispacked = false     
      res.json(resp)
   } else {
      resp.errorLevel = -1
      resp.errorMessage = 'mismatch'
      res.json(resp)
   }
})


serviceApp.listen(8888, () => {
   console.info('8888');
})
