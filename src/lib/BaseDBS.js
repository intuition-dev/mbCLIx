"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// All rights reserved by Cekvenich|INTUITION.DEV) |  Cekvenich, licensed under LGPL 3.0
const terse_b_1 = require("terse-b/terse-b");
const fs = require('fs-extra');
/**
 * Native SQLite. There is also a reglar SQLite, so don't be confused with this native SQLite
 */
class BaseDBS {
    constructor() {
        this.MAXINT = 9223372036854775807;
        this.log = new terse_b_1.TerseB(this.constructor.name);
        this.BDatabase = require('better-sqlite3');
    }
    /**
     * connect with defaults, not using RAM as default
     * @param path
     * @param fn
     * @param mem  defaults to 256000000000 // 256 meg in cache and file map
     */
    defCon(path, fn, mem) {
        this._fn = path + fn;
        this.log.info(this._fn);
        this._db = new this.BDatabase(this._fn);
        if (!mem)
            mem = '256000000000';
        this._db.pragma('cache_size = -' + mem); //
        this.log.info(this._db.pragma('cache_size', { simple: true }));
        this._db.pragma('busy_timeout=' + 120 * 1000); // 2 minutes
        this._db.pragma('mmap_size=' + mem); // 
        this._db.pragma('synchronous=OFF');
        this._db.pragma('journal_mode=MEMORY'); // or WAL
        this._db.pragma('wal_checkpoint=TRUNCATE'); // release memory used for rollback
        this._db.pragma('temp_store=MEMORY');
        this._db.pragma('automatic_index=false');
        this._db.pragma('foreign_keys=false');
        this._db.pragma('secure_delete=false');
        this._db.pragma('read_uncommitted=true'); // no locking
        this._db.pragma('cache_spill=false');
        this._db.pragma('locking_mode=NORMAL'); // 3rd party connection,  NORMAL or EXCLUSIVE
        this.log.info(this._db.pragma('locking_mode', { simple: true }));
    } //()
    tableExists(tab) {
        try {
            const row = this.readOne("SELECT name FROM sqlite_master WHERE type=\'table\' AND name= ?", tab);
            if (row['name'] == tab)
                return true;
            return false;
        }
        catch (err) {
            return false;
        }
    } //()
    // returns # of rows changed
    write(sql, ...args) {
        const stmt = this._db.prepare(sql);
        const info = stmt.run(args);
        return info.changes;
    }
    read(sql, ...args) {
        const stmt = this._db.prepare(sql);
        return stmt.all(args);
    }
    /**
    like read, but returns only the first row
    */
    readOne(sql, ...args) {
        const stmt = this._db.prepare(sql);
        return stmt.get(args);
    }
    BEGIN() {
        this.write('BEGIN');
    }
    COMMIT() {
        this.write('COMMIT');
    }
    ROLLBACK() {
        this.write('ROLLBACK');
    }
    delDB() {
        try {
            this._db.close();
            fs.removeSync(this._fn);
        }
        catch (err) {
            this.log.warn(err);
        }
    } //()
    async backup(newName) {
        await this._db.backup(newName, { progress({ totalPages: t, remainingPages: r }) {
                this.log.info(r);
            } });
    } //()
} //class
exports.BaseDBS = BaseDBS;
