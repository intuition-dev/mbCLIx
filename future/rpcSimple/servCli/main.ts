'use strict';


const callServer = function(request, callback) {
  const options = {
    method: 'POST',
    body: request,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  fetch('http://localhost:3000', options)
    .then(function(res) { return res.text(); })
    .then(function(text) { callback(null, text); })
    .catch(function(err) { callback(err); });
};



client.request('multiply', [5, 5], function(err, error, result) {
  if(err) throw err;
  console.log(result); // 25
});

rpc = new rpc(url,port)
rpc.user
rpc.pswd

pro = rpc.request(ent,method,params)


Response(errorLevelAndMsg,result, type:array, ispacked)

class RpcSimple {// requires promise and fetch for ie11
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

  /**
   * 
   * @param ent Ent would be the pageUrl or componentUrl or such
   */
  request(ent, method, params) { // returns promise

    params.pswd = this.pswd
    params.user = this.user
    params.method = method
    
    let data = JSON.stringify(params)
    
    fetch(this.urlRoot+ent+':'+this.port, {
        body: btoa(data) // decode first than json
        ,headers: {
          "Content-Type": "application/json",
        }

      })//fetch
  }

}

//if array, return as array