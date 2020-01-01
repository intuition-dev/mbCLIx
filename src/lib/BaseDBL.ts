// All rights reserved by Cekvenich|INTUITION.DEV) |  Cekvenich, licensed under LGPL 3.0

const bunyan = require('bunyan')
const bformat = require('bunyan-format2')  
const formatOut = bformat({ outputMode: 'short' })
const log = bunyan.createLogger({src: true, stream: formatOut, name: "Base DB"})
const fs = require('fs-extra')

export class BaseDBL {
   protected _fn
   protected _db

   static Database = require('better-sqlite3')

   /**
   connect with defaults, not using RAM
   */
   defCon(path,  fn) {
      this._fn = path + fn
      log.info(this._fn)
      this._db = new BaseDBL.Database(this._fn)

      this._db.pragma('cache_size = 5000')//20meg in 4K
      log.info(this._db.pragma('cache_size', { simple: true }))

      this._db.pragma('synchronous=OFF')
      this._db.pragma('count_changes=OFF')
      this._db.pragma('journal_mode=DELETE') 
      this._db.pragma('temp_store=MEMORY')

      this._db.pragma('automatic_index=false')
      this._db.pragma('foreign_keys=false')
      this._db.pragma('secure_delete=false')

      this._db.pragma('read_uncommitted=true') // no locking
      this._db.pragma('cache_spill=false')
      this._db.pragma('busy_timeout=60000')
      this._db.pragma('mmap_size=102400000') // 100meg in B

      this._db.pragma('locking_mode=EXCLUSIVE') // 3rd party connection, or NORMAL
      log.info(this._db.pragma('locking_mode', { simple: true }))
 
   }

   tableExists(tab): boolean { 
      try {
         const row = this.readOne("SELECT name FROM sqlite_master WHERE type=\'table\' AND name= ?", tab)
         if(row['name'] == tab) return true
         return false
      } catch(err) {
         return false
      }   
   }//()

   // returns # of rows changed
   write(sql:string, ...args):number {
         const stmt = this._db.prepare(sql)
         const info= stmt.run(args)
         return info.changes
   }

   read(sql:string, ...args):Array<Object> {
      const stmt = this._db.prepare(sql)
      return stmt.all(args)
   }

   /**
   like read, but returns only the first row
   */
   readOne(sql:string, ...args):Object {
      const stmt = this._db.prepare(sql)
      return stmt.get(args)
   }

   BEGIN() {
      this.write('BEGIN')
   }
   COMMIT() {
      this.write('COMMIT')
   }
   ROLLBACK() {
      this.write('ROLLBACK')
   }

  delDB() {
      try {
         this._db.close()
         fs.removeSync(this._fn)

      } catch(err) {
         log.warn(err)
      }
  }//()

  async backup(newName:string) {
      await this._db.backup(newName, {progress({ totalPages: t, remainingPages: r }) {
         log.info(r)
      }})
   }//()

}//class

module.exports = {
   BaseDBL
}