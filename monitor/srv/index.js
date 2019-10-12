"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const URL = require('url');
const Serv_1 = require("mbake/lib/Serv");
const MDB_1 = require("./MDB");
const m = new MDB_1.MDB();
m.tst();
const serviceApp = new Serv_1.ExpressRPC();
serviceApp.makeInstance(['*']);
const handler = new Serv_1.BaseRPCMethodHandler();
serviceApp.routeRPC('monitor', 'monitor', (req, res) => {
    const params = URL.parse(req.url, true).query;
    console.log(params);
    handler.ret(res, 'OK', 0, 0);
});
