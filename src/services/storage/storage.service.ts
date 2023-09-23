import { Redis } from 'ioredis'

class StorageService {
  redis: Redis

  constructor() {
    this.redis = new Redis()
  }

  async get(key: string) {
    const data = await this.redis.get(key)
    return data ? JSON.parse(data) : null
  }

  async set(key: string, value: any) {
    return await this.redis.set(key, JSON.stringify(value))
  }

  async del(key: string) {
    return await this.redis.del(key)
  }

  async flush() {
    return await this.redis.flushall()
  }
}

const storageService = new StorageService()
export { storageService }
