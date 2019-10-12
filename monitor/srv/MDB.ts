

export class MDB {

    static mysql = require('mysql2/promise')

    static pool 

    constructor() {
        MDB.pool = MDB.mysql.createPool({
            host: 'localhost',
            user: 'root',
            password : '123123',
            database: 'db1',

            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })
    }

    schema() {

    }

    async tst() {

        const ret = await MDB.pool.execute('SELECT 1 + 1 AS solution')

        const rows = ret[0]

        const row = rows[0]

        console.log(row)
        console.log(Object.keys(row))

        console.log('OK')

        process.exit()
    }
}//()