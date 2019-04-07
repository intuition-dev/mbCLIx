var RPCSimple = (function () {
    function RPCSimple(httpOrs, host, port) {
        this.httpOrs = httpOrs;
        this.host = host;
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
        var THIZ = this;
        return new Promise(function (resolve, reject) {
            console.info(data);
            var url = THIZ.httpOrs + '://' + THIZ.host + ':' + THIZ.port + ent;
            console.log(url);
            fetch(url, {
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'post',
            })
                .then(function (respJSON) {
                return respJSON.json();
            })
                .then(function (resp) {
                console.info(resp);
                if (resp.errorMessage) {
                    reject(resp);
                }
                console.log(resp.result);
                resolve(resp.result);
            });
        });
    };
    RPCSimple.uniq = '--X';
    return RPCSimple;
}());
var rpc = new RPCSimple('http', 'localhost', 8888);
var pro = rpc.request('/pageOne', 'multiply', { a: 5, b: 2 });
pro.then(function (result) {
    console.log(result);
});
