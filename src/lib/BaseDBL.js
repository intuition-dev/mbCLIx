"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require('bunyan');
const bformat = require('bunyan-format2');
const formatOut = bformat({ outputMode: 'short' });
const log = bunyan.createLogger({ src: true, stream: formatOut, name: "Base DB" });
const fs = require('fs-extra');
class BaseDBL {
    defCon(path, fn) {
        this._fn = path + fn;
        log.info(this._fn);
        this._db = new BaseDBL.Database(this._fn);
        this._db.pragma('cache_size = 5000');
        log.info(this._db.pragma('cache_size', { simple: true }));
        this._db.pragma('busy_timeout=120000');
        this._db.pragma('synchronous=OFF');
        this._db.pragma('journal_mode=WAL');
        this._db.pragma('temp_store=MEMORY');
        this._db.pragma('automatic_index=false');
        this._db.pragma('foreign_keys=false');
        this._db.pragma('secure_delete=false');
        this._db.pragma('read_uncommitted=true');
        this._db.pragma('cache_spill=false');
        this._db.pragma('mmap_size=102400000');
        this._db.pragma('locking_mode=EXCLUSIVE');
        log.info(this._db.pragma('locking_mode', { simple: true }));
    }
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
    }
    write(sql, ...args) {
        const stmt = this._db.prepare(sql);
        const info = stmt.run(args);
        return info.changes;
    }
    read(sql, ...args) {
        const stmt = this._db.prepare(sql);
        return stmt.all(args);
    }
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
            log.warn(err);
        }
    }
    async backup(newName) {
        await this._db.backup(newName, { progress({ totalPages: t, remainingPages: r }) {
                log.info(r);
            } });
    }
}
exports.BaseDBL = BaseDBL;
BaseDBL.Database = require('better-sqlite3');
module.exports = {
    BaseDBL
};
