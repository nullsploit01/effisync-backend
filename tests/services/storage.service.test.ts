import { storageService } from '../../src/services/storage/storage.service'

describe('Storage Service', () => {
  describe('set', () => {
    it('should set a value in storage', () => {
      const stored = storageService.set('key', 'value')
      expect(stored).toBe(true)
    })

    it('should set a value in storage with custom TTL', () => {
      const stored = storageService.set('key', 'value', 1)
      expect(stored).toBe(true)
    })

    it('stored value should expire after TTL', async () => {
      const stored = storageService.set('key', 'value', 2)
      expect(stored).toBe(true)

      await new Promise((resolve) => setTimeout(resolve, 2500)) // wait for 2.5 seconds

      const value = storageService.get('key')
      expect(value).toBeNull()
    })

    it('should return false if value is not set', () => {
      const stored = storageService.set('key', undefined)
      expect(stored).toBe(false)
    })
  })

  describe('get', () => {
    beforeAll(() => {
      storageService.set('key', 'value')
    })

    it('should return a value from storage', () => {
      const value = storageService.get('key')
      expect(value).toBe('value')
    })

    it('should return null if value is not found', () => {
      const value = storageService.get('unknown')
      expect(value).toBeNull()
    })

    it('should return null if value is expired', async () => {
      const stored = storageService.set('key', 'value', 1)
      expect(stored).toBe(true)

      await new Promise((resolve) => setTimeout(resolve, 1500)) // wait for 1.5 seconds

      const value = storageService.get('key')
      expect(value).toBeNull()
    })
  })

  describe('delete', () => {
    beforeAll(() => {
      storageService.set('key', 'value')
    })

    it('should delete a value from storage', () => {
      const deleted = storageService.delete('key')
      expect(deleted).toBe(1)
    })

    it('should return false if value is not found', () => {
      const deleted = storageService.delete('unknown')
      expect(deleted).toBe(0)
    })

    describe('has', () => {
      beforeAll(() => {
        storageService.set('key', 'value')
      })

      it('should return true if value exists', () => {
        const exists = storageService.has('key')
        expect(exists).toBe(true)
      })

      it('should return false if value does not exist', () => {
        const exists = storageService.has('unknown')

        expect(exists).toBe(false)
      })

      it('should return false if value is expired', async () => {
        const stored = storageService.set('key2', 'value', 1)
        expect(stored).toBe(true)

        await new Promise((resolve) => setTimeout(resolve, 1500)) // wait for 1.5 seconds

        const hasValue = storageService.has('key2')
        expect(hasValue).toBe(false)
      })
    })

    describe('flush', () => {
      beforeAll(() => {
        storageService.set('key', 'value')
        storageService.set('key2', 'value', 1)
      })

      it('should flush all values from storage', () => {
        storageService.flush()

        const value = storageService.get('key')
        expect(value).toBeNull()

        const value2 = storageService.get('key2')
        expect(value2).toBeNull()
      })

      it('should get new values after flush', () => {
        storageService.flush()

        storageService.set('key', 'newValue')
        const value = storageService.get('key')
        expect(value).toBe('newValue')
      })
    })
  })
})
