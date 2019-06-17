import { BasicMap, BasicStorage } from "../types";

export class LocalStorageMap<T> implements BasicMap<string, T> {
  /**
   * Used to namespace the keys for this map within LocalStorage
   */
  private type: string;
  private storage: BasicStorage;

  constructor(type: string, storage: BasicStorage = localStorage) {
    this.type = type;
    this.storage = storage;
  }

  private createKey(key: string) {
    return `${this.type}:${key}`;
  }

  has(key: string) {
    return !!this.storage.getItem(this.createKey(key));
  }

  get(key: string) {
    const cached = this.storage.getItem(this.createKey(key));

    if (cached) {
      return JSON.parse(cached);
    }
  }

  set(key: string, value: T) {
    const serialized = JSON.stringify(value);

    this.storage.setItem(this.createKey(key), serialized);

    return this;
  }
}
