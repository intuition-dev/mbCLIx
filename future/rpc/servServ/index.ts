const express = require('express')
const basicAuth = require('express-basic-auth')
const bodyParser = require("body-parser");
const adminApp = express();
adminApp.use(bodyParser.json())


adminApp.use(basicAuth({
   users: { 'admin': '123' }
}))


adminApp.use(bodyParser.json());


adminApp.get("/", (req, res) => {
   res.send('Hello world');
});
adminApp.post("/editors", (req, res) => {
   let email = req.body.email;
   let password = req.body.password;
   if (typeof email !== 'undefined' &&
      typeof name !== 'undefined' &&
      typeof password !== 'undefined'
   ) {

   } else {
      res.status(400);
      res.send({ error: 'parameters missing' });
   }
});


adminApp.listen(8888, () => {
   console.info('8888');
});
