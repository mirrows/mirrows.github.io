
type DBParams = {
  version?: number
  name: string
  table: string
}

export class DBls {
  constructor() {
    this.db = null
    this.table = '';
  }
  db: IDBDatabase | null
  table: ''
  init({name, version = 1, table }: DBParams) {
    return new Promise((res, rej) => {
      console.log(this)
      if(!this.db) {
        const request = indexedDB?.open(name, version)
        request.onupgradeneeded = () => {
          this.db = request.result
          if (!this.db?.objectStoreNames.contains(table)) {
            // 创建对象仓库，简单说就是建立一张表
            this.db?.createObjectStore(table, { keyPath: 'id' });
          }
        }
        request.onsuccess = () => {
          this.db = request.result
          res(this)
          return
        }
        request.onerror = (err) => {
          rej(err);
          return
        };
      }
    })
  }
  create<T>(name: string, data: T) {
    return new Promise((res, rej) => {
      if(!this.db) {
        rej('db not found')
        return
      }
      console.log(this.db)
      const request = this.db.transaction(name, 'readwrite').objectStore(name).add(data);
      request.onsuccess = () => {
        res(this)
        return
      }
      request.onerror = (err) => {
        rej(err);
        return
      };
    })
  }
  del(name: string, id: number) {
    return new Promise((res, rej) => {
      if(!this.db) {
        rej('db not found')
        return
      }
      const request = this.db.transaction(name, 'readwrite').objectStore(name).delete(id);
      request.onsuccess = () => {
        res(this)
        return
      }
      request.onerror = (err) => {
        rej(err);
        return
      };
    })
  }
  update<T>(name: string, data: T) {
    return new Promise((res, rej) => {
      if(!this.db) {
        rej('db not found')
        return
      }
      const request = this.db.transaction(name, 'readwrite').objectStore(name).put(data);
      request.onsuccess = () => {
        res(this)
        return
      }
      request.onerror = (err) => {
        rej(err);
        return
      };
    })
  }
  query(name: string, id: number) {
    return new Promise((res, rej) => {
      if(!this.db) {
        rej('db not found')
        return
      }
      const request = this.db.transaction(name).objectStore(name).get(id);
      request.onsuccess = () => {
        res(request.result)
        return
      }
      request.onerror = (err) => {
        rej(err);
        return
      };
    })
  }
  each<T = any>(name: string, cb: (cur: T) => any) {
    return new Promise((res, rej) => {
      if(!this.db) {
        rej('db not found')
        return
      }
      const request = this.db.transaction(name).objectStore(name).openCursor();
      request.onsuccess = async (e) => {
        const cursor = (e.target as IDBRequest).result;
        if (cursor) {
          // to do
          await cb(cursor.value)
          cursor.continue();
        } else {
          res('finish')
        }
        return
      }
    })
  }

}