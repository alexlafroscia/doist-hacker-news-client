import { LocalStorageMap as LSMap } from "../LocalStorageMap";
import { BasicStorage } from "../../types";

class FakeStorage implements BasicStorage {
  private store = Object.create(null);

  getItem(key: string) {
    return this.store[key];
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }
}

test("knowing when an item is present", () => {
  const storage = new FakeStorage();
  storage.setItem("type:foo", "{}");

  const map = new LSMap("type", storage);

  expect(map.has("foo")).toBe(true);
  expect(map.has("bar")).toBe(false);

  const otherMap = new LSMap("otherType", storage);

  expect(otherMap.has("foo")).toBe(false);
});

test("setting items", () => {
  const storage = new FakeStorage();
  const map = new LSMap("type", storage);

  map.set("foo", {});

  expect(storage.getItem("type:foo")).toEqual("{}");
});

test("getting items", () => {
  const storage = new FakeStorage();
  storage.setItem("type:foo", '{ "foo": "bar" }');

  const map = new LSMap("type", storage);

  expect(map.get("foo")).toMatchObject({ foo: "bar" });
  expect(map.get("bar")).toBeUndefined();
});
