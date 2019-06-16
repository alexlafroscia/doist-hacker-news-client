import { Item, createItem } from "./Item";

const BASE_URL = "https://hacker-news.firebaseio.com/v0/";

function createItemURL(id: string): string {
  return `${BASE_URL}/item/${id}.json`;
}

export class HackerNewsClient {
  private cache = new Map<string, Item>();

  /**
   * Fetches a single "Item" from the Hacker News API
   *
   * @param id the ID of a HackerNews item
   */
  private async fetchItem(id: string): Promise<Item> {
    // Only request the item once
    if (this.cache.has(id)) {
      return this.cache.get(id)!;
    }

    const res = await fetch(createItemURL(id));
    const payload = await res.json();
    const item = createItem(payload);

    this.cache.set(id, item);

    return item;
  }

  /**
   * Yields each Hacker News item from some collection
   *
   * A "collection" here is defined as an array of IDs that can be fetched
   * from a URL, such as the "new stories" or "top stories" lists
   *
   * @param url the URL to fetch the list of items from
   */
  private async *fetchCollection(url: string) {
    const resp = await fetch(url);
    const ids = (await resp.json()) as Array<string>;

    for (const id of ids) {
      const item = await this.fetchItem(id);
      yield item;
    }
  }

  fetchNewStories() {
    return this.fetchCollection(BASE_URL + "newstories.json");
  }
}
