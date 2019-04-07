const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');
const serviceApp = express();
serviceApp.use(bodyParser.urlencoded({ extended: false }));
serviceApp.use(formidable());
class CustomCors {
    cors() {
        return (request, response, next) => {
            console.log('.');
            response.setHeader('Access-Control-Allow-Origin', '*');
            return next();
        };
    }
}
const customCors = new CustomCors();
serviceApp.use(customCors.cors());
serviceApp.post('/pageOne', (req, res) => {
    console.log(req.fields);
    const user = req.fields.user;
    const pswdH = req.fields.pswdH;
    const method = req.fields.method;
    const params = JSON.parse(req.fields.params);
    const resp = {};
    if ('multiply' == method) {
        let a = params.a;
        let b = params.b;
        resp.result = a * b;
        resp.type = '';
        resp.ispacked = false;
        console.log(resp);
        res.json(resp);
    }
    else {
        resp.errorLevel = -1;
        resp.errorMessage = 'mismatch';
        console.log(resp);
        res.json(resp);
    }
    console.info();
});
serviceApp.listen(8888, () => {
    console.info('8888');
});
