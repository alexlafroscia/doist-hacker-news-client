# Doist Hacker News Client

This repository is a basic Hacker News "latest posts" feed, built as the primary technical component of the Doist interview process.

## Key Features

- View a list of the latest posts on Hacker News
- Mobile support
- Full "offline" support (as long as you've loaded the app once before)

## Local Setup

You can run the application locally by cloning the repository and running the following:

```bash
yarn
yarn start
```

It was developed against Node `10.15.3` and Yarn `1.16.0`.

## Technical Details

### Dependencies

The three runtime dependencies of the application are React, ReactDOM and `styled-components`. React was chosen as a library to help manage the translation of state and user interactions into DOM, since there are pretty complex interactions between the user scrolling the page and loading more data as they do. `styled-components` provides an easy way to manage the styles of React components and was chosen over other alternatives due to the great developer experience it provides.

### TypeScript

I chose to write the project using TypeScript because of the benefits to provides to the development experience of working with React. I really appreciate the feedback it provides around using components correctly and providing the correct properties.

Additionally, I like to think about interfaces (as in type systems) when designing my code. Building around an interface allowed me to swap out the implementation while being sure that things still work correctly. A good example of this is the caching layer, which I'll describe more later; because it adheres to a basic `Map` interface, I was able to write a first pass at the client using the `Map` object and later on replace it with a custom `Map` implementation that stores things in `localStorage` instead, without having to re-write anything about the Hacker News client at all.

### Hacker News Client

When I first started the project I explored using a full FireBase client to interact with the HackerNews API, which is the recommendation in the API documentation. However, after looking into the API calls that would be required for this application, I determined it would be overkill for the needs of the project to pull in a whole FireBase client when I could write a tiny client myself.

I designed a simple client that leverages an async generator to allow posts to be fetched from the API one at a time after loading the list of item IDs from a feed. Since each post needs to be fetched individually from the API, an async generator allows the UI code to request posts only when it needs them. This made it easy to load just enough posts to fill the initial page, but request additional posts as the user scrolls.

### Data Caching

In order to fascilitate offline support, I chose to store data in `localStorage`. Essentially I build a custom `Map`-like object that read and write data from a namespaced set of `localStorage` keys.

The application has two types of data that it fetches: feeds (lists of item IDs) and items. I realized early on that they required two different caching approaches in order to best suite the experience.

Items are easier to cache; once you've read an item from the API, you really never have to read it again. The information that we care about (author, posting date, title and URL) should not ever change, so we can aggressively cache that data and avoid going to the API again for it whenever possible.

Feeds are a little more tricky, though; as long as the user is online, we never want a cached feed. However, if we are offline, we want to use the most recent feed from our cache. To achieve this behavior I wrote another `Map`-like class that could proxy to our actual `localStorage` feed cache. This additional layer checked a condition before reading from the cache, allowing me to force a cache miss when desired (I always allow cache writes). This could be used to force cache misses when the computer is online, bypassing the cache in `localStorage` and reaching out to the API for the latest feed. When offline, though, the outer "caching layer" would not force a cache miss, reading instead from `localStorage` to get the stored data.

I ended up really happy with the way caching was built out because the solution is really composable. If you don't want any caching at all, the Hacker News client could easily be instantiated with regular `Map` objects so that you only have an in-memory cache. If you want to cache items less aggressively, that cache could be wrapped with the same conditional layer that the feed was given to read from the API unless you're offline. Additionally, if you want to cache even more aggressively, the feed cache could remove the conditional layer altogether. All of these changes can be made with no changes to the client itself.

### `LiveData` Component

The core of the scroll-to-load mechanism is the `LiveData` component. It accepts an async iterator and a component to display that indicates that data is being loaded. The async iterator allows the fetching of the data to be totally decoupled from the source itself; we could provide any kind of async iterator to load from, which is great for testing or reusability.

The component operates on the simple assumption that the data loaded by the component will be rendered into the "slot" (`children`) of the component. The loading indicator is also rendered inside the `LiveData` component and its position relative to the component root monitored using an `IntersectionObserver`. When enough data has been loaded, the loading indicator is pushed off screen, which signals that we can stop loading additional data. If the user scrolls the contents of the feed, the loading indicator will become visible again, triggering the component to continue reading from the iterator until the loading indicator is once again off-screen.

## Extension Opportunities

### Alternate Feeds

The way the Hacker News client was designed, it would be really easy to load other feeds, such as the "top stories" feed that the API also provides. While it was beyond the scope of the requirements, it would be really easy to provide different routes within the client that display the same feed interface, but with a different feed generator backing the view. With more time, this would be an easy "win" for making the project more useful.

### Better Offline Handling

Due to the time considerations, the offline support is not as great as it could be. Specifically, nothing is really done to handle the case where the feed points to items that have not been cached while online; we just allow the `fetch` call to fail and render nothing until we've exhausted the list of items in the feed. The experience isn't terrible but an improvement could be made to let the user know what is happening.

### More Robust Test Coverage

I wrote some tests using Jest around the caching logic, since that was harder to test manually by running the application. However, with more time I would like to write more unit tests for the `LiveData` component and the interaction with the loading indicator becoming visible and invisible.

## Challenges

### API Quirks

I realized while working on the project that the Hacker News API sometimes returns `null` for an item ID given by the feed. This isn't documented anywhere and I'm not sure what caused it, but it's something I had to work around in the implementation of the client.

## Deployment

Just for fun, I deployed the application to `now.sh` since they make it so delightfully easy. This made testing the app on a mobile device a lot easier.

You can find it running here: https://doist-hacker-news-client.alexlafroscia.now.sh
