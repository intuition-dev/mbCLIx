const express = require('express');
const bodyParser = require('body-parser');
const serviceApp = express();
serviceApp.use(bodyParser.json());
serviceApp.use(bodyParser.json());
class CustomCors {
    cors() {
        return (request, response, next) => {
            console.log('cors');
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Headers', '*');
            if (request.method === 'OPTIONS') {
                response.status(204).send();
            }
            else {
                return next();
            }
        };
    }
}
const customCors = new CustomCors();
serviceApp.use(customCors.cors());
const uniq = '--X';
serviceApp.post('/pageOne', (req, res) => {
    const user = req.body['user' + uniq];
    const pswdH = req.body['pswdH' + uniq];
    console.info(req.body);
    const method = req.body['method' + uniq];
    const resp = {};
    if ('multiply' == method) {
        let a = req.body.a;
        let b = req.body.b;
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
});
serviceApp.listen(8888, () => {
    console.info('8888');
});
