
const URL = require('url')

// from mbake
import { BaseRPCMethodHandler, ExpressRPC } from "mbake/lib/Serv"
import { MDB } from "./MDB"

const m = new MDB()

m.tst()

// makes a configured express instance

const serviceApp = new ExpressRPC()
serviceApp.makeInstance(['*'])

const handler = new BaseRPCMethodHandler()

serviceApp.routeRPC('monitor', 'monitor', (req, res) => { 

   const params = URL.parse(req.url, true).query
   console.log(params)

   handler.ret(res, 'OK', 0, 0)

})


// serviceApp.listen(8888)
