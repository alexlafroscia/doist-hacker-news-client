/**
 * Represents just the subset of the `Map` implementation
 * that are used by the `HackerNewsClient`
 */
export interface BasicMap<KeyType, ValueType> {
  has(key: KeyType): boolean;
  get(key: KeyType): ValueType | undefined;
  set(key: KeyType, value: ValueType): void;
}

/**
 * Represents just the subset of the `Storage` implementation
 * that are used by the `LocalStorageMap`
 */
export interface BasicStorage extends Pick<Storage, "getItem" | "setItem"> {}
