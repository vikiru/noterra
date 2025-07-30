import superjson from 'superjson';
import type { PersistStorage, StorageValue } from 'zustand/middleware';

export function createCustomStorage<T>(): PersistStorage<T> {
  return {
    getItem: (key): StorageValue<T> | null => {
      const str = localStorage.getItem(key);
      return str ? superjson.parse<StorageValue<T>>(str) : null;
    },
    setItem: (key, value: StorageValue<T>): void => {
      localStorage.setItem(key, superjson.stringify(value));
    },
    removeItem: (key): void => {
      localStorage.removeItem(key);
    },
  };
}
