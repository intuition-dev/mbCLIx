"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require('pg');
const perfy = require('perfy');
class MDB {
    constructor() {
        MDB.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'db1',
            password: '123123',
            port: '5432',
            ssl: false
        });
    }
    schema() {
        `
// using C locale
CREATE TEMPORARY TABLE mon2 (
    guid        UUID NOT NULL,
    data        jsonb NOT NULL,
    dt          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (guid)
)

CREATE INDEX ihostd ON mon1((data->>'host'), dt) 

`;
    }
    async tst() {
        const obj = { host: 'host', a: 'b' };
        const query = {
            text: 'INSERT INTO mon2 VALUES($1, $2)',
            values: [MDB.uuid(), JSON.stringify(obj)]
        };
        await MDB.pool.query(query);
        console.log('OK');
        process.exit();
    }
}
exports.MDB = MDB;
MDB.uuid = require('uuid/v4');
