
const URL = require('url')

// from mbake
import { BaseRPCMethodHandler, ExpressRPC, iAuth } from "mbake/lib/Serv"

let allowedDomains = []
allowedDomains.push('one.com') // get from config.yaml, should never be '*'
allowedDomains.push('two.org') // XXX host or local would match localhost

// makes a configured express instance
const serviceApp = new ExpressRPC()
serviceApp.makeInstance(['*'])

const handler = new BaseRPCMethodHandler()

serviceApp.routeRPC('api', 'pageOne', (req, res) => { 

   const params = URL.parse(req.url, true).query
   //console.log(params)
   const method = params.method

   if('multiply'==method) { // RPC for the page could handle several methods, eg one for each of CRUD
      let a = params.a
      let b = params.b

      const resp:any= {} // new response

      handler.ret(res, resp, 4, 3)
   } else {
      const resp:any= {} // new response
      resp.errorMessage = 'mismatch'
      handler.retErr(res, resp, 4, 3)
   }

})



serviceApp.listen(8888)
