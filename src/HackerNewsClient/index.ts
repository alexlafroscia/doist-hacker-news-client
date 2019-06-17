import { Item, createItem } from "./Item";

const BASE_URL = "https://hacker-news.firebaseio.com/v0/";

function createItemURL(id: string): string {
  return `${BASE_URL}/item/${id}.json`;
}

type FeedCache = Map<string, Array<string>>;
type ItemCache = Map<string, Item>;

export class HackerNewsClient {
  private feedCache: FeedCache;
  private itemCache: ItemCache;

  constructor(feedCache: FeedCache, itemCache: ItemCache) {
    this.feedCache = feedCache;
    this.itemCache = itemCache;
  }

  /**
   * Fetches a single "Item" from the Hacker News API
   *
   * @param id the ID of a HackerNews item
   */
  private async fetchItem(id: string): Promise<Item> {
    // Only request the item once
    if (this.itemCache.has(id)) {
      return this.itemCache.get(id)!;
    }

    const res = await fetch(createItemURL(id));
    const payload = await res.json();
    const item = createItem(payload);

    this.itemCache.set(id, item);

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
    let ids;

    if (this.feedCache.has(url)) {
      ids = this.feedCache.get(url)!;
    } else {
      const resp = await fetch(url);
      ids = (await resp.json()) as Array<string>;

      this.feedCache.set(url, ids);
    }

    for (const id of ids) {
      const item = await this.fetchItem(id);
      yield item;
    }
  }

  fetchNewStories() {
    return this.fetchCollection(BASE_URL + "newstories.json");
  }
}
