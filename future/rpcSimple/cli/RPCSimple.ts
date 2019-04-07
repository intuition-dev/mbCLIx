
// FormData
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

  /**
   * 
   * @param ent Ent would be the pageUrl or componentUrl or such
   */
  request(ent, method, params) { // returns promise
    //if array, return as array

    let formData = new FormData()
    formData.append('params',JSON.stringify(params))

    formData.append('user', btoa(this.user))
    formData.append('pswdH', btoa(this.pswdH))

    formData.append('method', method)

    const THIZ = this
    return new Promise(function(resolve, reject) {
      console.info(formData.get('method'))
      const url = THIZ.httpOrs+'://'+THIZ.host + ':'+THIZ.port + ent
      console.log(url)
      fetch(url, {
            body: formData 
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