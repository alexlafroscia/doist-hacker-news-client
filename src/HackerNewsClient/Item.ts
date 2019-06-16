const MS_PER_SECOND = 1000;

export interface Author {
  name: string;
  url: string;
}

export interface Item {
  id: number;
  time: Date;
  title: string;
  url: string;
  author: Author;
}

/**
 * Generate the Hacker News website's URL for an "Ask HN" "Item"
 *
 * @param id the ID for the item
 */
function createAskURL(id: string): string {
  return `https://news.ycombinator.com/item?id=${id}`;
}

function createAuthorURL(by: string): string {
  return `https://news.ycombinator.com/user?id=${by}`;
}

/**
 * Parse an "Item" from the Hacker News API into the format needed by the application
 */
export function createItem(payload: any): Item {
  return {
    id: payload.id,
    title: payload.title,
    url: payload.url ? payload.url : createAskURL(payload.id),
    time: new Date(payload.time * MS_PER_SECOND),
    author: {
      name: payload.by,
      url: createAuthorURL(payload.by)
    }
  };
}
