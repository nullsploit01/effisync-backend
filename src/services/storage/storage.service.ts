import NodeCache from 'node-cache'

const ONE_DAY = 60 * 60 * 24

class StorageService {
  private cache: NodeCache

  constructor() {
    this.cache = new NodeCache()
  }

  set(key: string, value: any, ttl = ONE_DAY) {
    if (!value) return false

    return this.cache.set(key, value, ttl)
  }

  get(key: string) {
    const data = this.cache.get(key)
    return data ? data : null
  }

  delete(key: string) {
    return this.cache.del(key)
  }

  has(key: string) {
    return this.cache.has(key)
  }

  flush() {
    return this.cache.flushAll()
  }
}

const storageService = new StorageService()
export { storageService }
