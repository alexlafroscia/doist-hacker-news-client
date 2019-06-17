import { ConditionalMapReader } from "../ConditionalMapReader";

describe("has", () => {
  test("when the condition is `true`", () => {
    const map = new Map();
    const conditionalMap = new ConditionalMapReader(() => true, map);

    map.set("foo", "bar");

    expect(conditionalMap.has("foo")).toBe(true);
  });

  test("when the condition is `false`", () => {
    const map = new Map();
    const conditionalMap = new ConditionalMapReader(() => false, map);

    map.set("foo", "bar");

    expect(conditionalMap.has("foo")).toBe(false);
  });
});

describe("get", () => {
  test("when the condition is `true`", () => {
    const map = new Map();
    const conditionalMap = new ConditionalMapReader(() => true, map);

    map.set("foo", "bar");

    expect(conditionalMap.get("foo")).toBe("bar");
  });

  test("when the condition is `false`", () => {
    const map = new Map();
    const conditionalMap = new ConditionalMapReader(() => false, map);

    map.set("foo", "bar");

    expect(conditionalMap.get("foo")).toBeUndefined();
  });
});

describe("set", () => {
  test("when the condition is `true`", () => {
    const map = new Map();
    const conditionalMap = new ConditionalMapReader(() => true, map);

    conditionalMap.set("foo", "bar");

    expect(map.get("foo")).toBe("bar");
  });

  test("when the condition is `false`", () => {
    const map = new Map();
    const conditionalMap = new ConditionalMapReader(() => false, map);

    conditionalMap.set("foo", "bar");

    expect(map.get("foo")).toBe("bar");
  });
});
