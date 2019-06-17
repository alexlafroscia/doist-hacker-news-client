import { BasicMap } from "../types";

type Checker = () => boolean;

export class ConditionalMapReader<K, V> implements BasicMap<K, V> {
  /**
   * Used to determine if we should read from the cache
   *
   * If the function returns `false` then we avoid accessing the cache
   */
  private checker: Checker;

  /**
   * Internal Map to read/write from
   */
  private map: BasicMap<K, V>;

  constructor(checker: Checker, map: BasicMap<K, V>) {
    this.checker = checker;
    this.map = map;
  }

  has(key: K) {
    if (this.checker()) {
      return this.map.has(key);
    } else {
      return false;
    }
  }

  get(key: K) {
    if (this.checker()) {
      return this.map.get(key);
    }
  }

  set(key: K, value: V) {
    this.map.set(key, value);
  }
}
