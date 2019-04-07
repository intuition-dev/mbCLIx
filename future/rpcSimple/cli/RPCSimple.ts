

class RPCSimple {// requires promise and fetch for ie11
  // uses simple auth
  httpOrs
  host
  port
  constructor(httpOrs, host, port) {
    this.httpOrs = httpOrs
    this.host = host
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
   
    const THIZ = this
    return new Promise(function(resolve, reject) {
      console.info(data)
      const url = THIZ.httpOrs+'://'+THIZ.host + ':'+THIZ.port + ent
      console.log(url)
      fetch(url, {
            body: data 
            ,headers: {
              'Content-Type': 'application/json',
            }
            ,method: 'post',
          })//fetch
          .then(function(respJSON) {
            return respJSON.json()
          })
          .then(function(resp) {
            console.info(resp)
            if(resp.errorMessage) {
              reject(resp)
            }
            console.log(resp.result)
            resolve(resp.result)
          })//fetch
      })//pro
    }//req()
}//class


const rpc = new RPCSimple('http','localhost',8888)

const pro:any = rpc.request('/pageOne','multiply',{a:5, b:2})
pro.then(function(result) {
  console.log(result)
})