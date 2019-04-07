const express = require('express')
const bodyParser = require('body-parser')
const serviceApp = express()
const formidable = require("express-formidable");


class CustomCors {
   cors() {
      return (request, response, next) => {
         response.setHeader('Access-Control-Allow-Origin', '*')
         response.setHeader('Access-Control-Allow-Headers', '*')

         if (request.method === 'OPTIONS') {
            console.log('cors')
            response.setHeader('Access-Control-Max-Age', 600) // 10 minutes
            response.status(204)
            console.log('e cors')
            response.send()
         } else {
            return next()
         }
      }
   }
}
const customCors = new CustomCors()
serviceApp.use(customCors.cors())


serviceApp.use(bodyParser.urlencoded({ extended: false }))
serviceApp.use(formidable());


serviceApp.post('/pageOne', (req, res) => {

   console.log(req.fields)

   
   const user = req.fields.user
   const pswdH = req.fields.pswdH
   console.log(user,pswdH)

   const method = req.fields.method
   const params = JSON.parse( req.fields.params )
   console.log(method, params)

   const resp:any= {} // new response
   if('multiply'==method) {
      let a = params.a
      let b = params.b

      resp.result = a*b

      resp.type = ''//eg array
      resp.ispacked = false     
      console.log(resp)
      res.json(resp)
   } else {
      resp.errorLevel = -1
      resp.errorMessage = 'mismatch'
      console.log(resp)
      res.json(resp)
   }
   console.info()
})


serviceApp.listen(8888, () => {
   console.info('8888');
})
