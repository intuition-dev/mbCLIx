
// from mbake
import { ExpressRPC, iAuth } from 'mbake/lib/Serv'

let allowedDomains = []
allowedDomains.push('one.com') // get from config.yaml, should never be '*'
allowedDomains.push('two.org') // XXX host or local would match localhost

// makes a configured express instance
const serviceApp = new ExpressRPC()
serviceApp.makeInstance(['*'])


serviceApp.handleRRoute('api', 'pageOne', (req, res) => { // post only

   console.log(req.fields)
   const user = req.fields.user // user, for example to check if allowed to work with company in params
   const pswd = req.fields.pswd

   const method = req.fields.method
   const params = JSON.parse( req.fields.params )

   if('multiply'==method) { // RPC for the page could handle several methods, eg one for each of CRUD
      let a = params.a
      let b = params.b

      const resp:any= {} // new response
      resp.result = multiply(a,b)

      resp.type = ''//eg array
      resp.ispacked = false
      console.log(resp)
      res.json(resp)
   } else {
      
      const resp:any= {} // new response
      resp.errorLevel = -1
      resp.errorMessage = 'mismatch'
      console.log(resp)
      res.json(resp)
   }
   console.info()
})

// should be class - maybe used by multiple routes
function multiply(a,b) {
   return a*b
}

serviceApp.listen(8888)

// example impl
class Check implements iAuth {

   auth(user:string, pswd:string, resp?, ctx?):Promise<string> {
      return new Promise( function (resolve, reject) {
         // check db to see if user and password match and then return level
         resolve('NO')
      })
   }//()

}//class