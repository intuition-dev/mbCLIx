


export class MDB {

    static pool

    static uuid = require('uuid/v4')

    constructor() {
   
   
    }

    schema() { `
// using C locale
CREATE UNLOGGED TABLE mon2 (
    guid        UUID NOT NULL,
    data        jsonb NOT NULL,
    dt          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (guid)
)

CREATE INDEX ihostd ON mon1((data->>'host'), dt) 

`    }

    async tst() {



        console.log('OK')
        process.exit()
    }
}//()