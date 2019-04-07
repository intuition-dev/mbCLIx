

class RPCSimple {// requires promise and fetch for ie11
  // uses simple auth
  urlRoot
  port
  constructor(urlRoot, port) {
    this.urlRoot = urlRoot
    this.port = port

    this.user = 'guest' // default is guest user
  }
  user
  pswdH

  setUser(user,pswdH) { // simple auth, pass an isomorphic salted hash of password via crypto
    this.user = user
    this.pswdH = pswdH // eg https://github.com/brix/crypto-js
  }

  static uniq = '--X'
  /**
   * 
   * @param ent Ent would be the pageUrl or componentUrl or such
   */
  request(ent, method, params) { // returns promise
    //if array, return as array

    params['pswdH'+RPCSimple.uniq] = btoa(this.pswdH)
    params['user'+RPCSimple.uniq] = btoa(this.user)
    params['method'+RPCSimple.uniq] = method
   
    let data = JSON.stringify(params)
   
    return new Promise(function(resolve, reject) {
      console.info(data)
      fetch(this.urlRoot+ent+':'+this.port, {
            body: data 
            ,headers: {
              'Content-Type': 'application/json',
            }
            ,method: 'post',
          })//fetch
          .then(function(response) {
            console.log('here1')
            return response.json()
          })
          .then(function(respJSON) {
            const resp:any = JSON.stringify(respJSON)
            console.log(resp)
            if(resp.errorMessage) {
              reject(resp)
            }

            resolve(resp.result)

          })//fetch
      })//pro
    }//req()
}//class


const rpc = new RPCSimple('http://localhost/',8888)

const pro:any = rpc.request('pageOne','multiply',{a:5, b:2})
pro.then(function(result) {
  console.log(result)
})