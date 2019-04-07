var RPCSimple = (function () {
    function RPCSimple(urlRoot, port) {
        this.urlRoot = urlRoot;
        this.port = port;
        this.user = 'guest';
    }
    RPCSimple.prototype.setUser = function (user, pswdH) {
        this.user = user;
        this.pswdH = pswdH;
    };
    RPCSimple.prototype.request = function (ent, method, params) {
        params['pswdH' + RPCSimple.uniq] = btoa(this.pswdH);
        params['user' + RPCSimple.uniq] = btoa(this.user);
        params['method' + RPCSimple.uniq] = method;
        var data = JSON.stringify(params);
        return new Promise(function (resolve, reject) {
            fetch(this.urlRoot + ent + ':' + this.port, {
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'post',
            })
                .then(function (response) {
                return response.json();
            })
                .then(function (respJSON) {
                var resp = JSON.stringify(respJSON);
                console.log(resp);
                if (resp.errorMessage) {
                    reject(resp);
                }
                resolve(resp.result);
            });
        });
    };
    RPCSimple.uniq = '--A';
    return RPCSimple;
}());
var rpc = new RPCSimple('http://localhost/', 8888);
var pro = rpc.request('pageOne', 'multiply', { a: 5, b: 5 });
pro.then(function (result) {
    console.log(result);
});
