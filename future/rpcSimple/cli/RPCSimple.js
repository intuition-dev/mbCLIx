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
        var formData = new FormData();
        formData.append('params', JSON.stringify(params));
        formData.append('user', btoa(this.user));
        formData.append('pswdH', btoa(this.pswdH));
        formData.append('method', method);
        var THIZ = this;
        return new Promise(function (resolve, reject) {
            console.info(formData.get('method'));
            var url = THIZ.httpOrs + '://' + THIZ.host + ':' + THIZ.port + ent;
            console.log(url);
            fetch(url, {
                body: formData,
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
                resolve(resp.result);
            });
        });
    };
    return RPCSimple;
}());
var rpc = new RPCSimple('http', 'localhost', 8888);
var pro = rpc.request('/pageOne', 'multiply', { a: 5, b: 2 });
pro.then(function (result) {
    console.log(result);
});
