

class RPCSimple {// requires promise and fetch for ie11
  // uses simple auth
  urlRoot
  port
  constructor(urlRoot, port) {
    this.urlRoot = urlRoot
    this.port = port

    this.user = 'guest' // default is guest user
    this.pswd = 'guest'
  }
  user
  pswd

  setUser(user,pswd) { // simple auth
    this.user = user
    this.pswd = pswd
  }

  static uniq = '--A'
  /**
   * 
   * @param ent Ent would be the pageUrl or componentUrl or such
   */
  request(ent, method, params) { // returns promise
    //if array, return as array

    params['pswd'+RPCSimple.uniq] = btoa(this.pswd)
    params['user'+RPCSimple.uniq] = btoa(this.user)
    params['method'+RPCSimple.uniq] = method
   
    let data = JSON.stringify(params)
   
    return new Promise(function(resolve, reject) {
        fetch(this.urlRoot+ent+':'+this.port, {
            body: data 
            ,headers: {
              "Content-Type": "application/json",
            }
            ,method: 'post',
          })//fetch
          .then(function(response) {
            return response.json()
          })
          .then(function(respJSON) {
            const resp = JSON.stringify(respJSON)
            console.log(resp)
            resolve(resp)

          })//fetch
      })//pro
    }//req()
}//class


const rpc = new RPCSimple('http://localhost/',8888)

const pro:any = rpc.request('pageOne','multiply',{a:5, b:5})
pro.then(function(result) {
  console.log(result)
})