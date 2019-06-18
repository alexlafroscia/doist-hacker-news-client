import React, { useMemo } from "react";
import styled, { createGlobalStyle } from "styled-components";

import { HackerNewsItem as BaseHackerNewsItem } from "./components/HackerNewsItem";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { LiveData } from "./components/LiveData";
import {
  Header,
  Title as HeaderTitle,
  Link as HeaderLink
} from "./components/Header";
import { ExternalLink } from "./components/ExternalLink";
import { useBrowserOffline } from "./hooks/useBrowserOffline";

import { HackerNewsClient } from "./HackerNewsClient";
import { systemFont } from "./theme";
import { OfflineBanner } from "./components/OfflineBanner";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    margin: 0;
  }

  body {
    font-family: ${systemFont};
  }
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Feed = styled(LiveData)`
  flex-grow: 1;
  padding: 1em;
`;

const HackerNewsItem = styled(BaseHackerNewsItem)`
  margin-bottom: 20px;
`;

const NoMoreData = styled.div`
  color: darkslategray;
  font-size: 1.1em;
  font-style: italic;
  text-align: center;

  &::before {
    content: "~";
    padding-right: 0.5em;
  }

  &::after {
    content: "~";
    padding-left: 0.5em;
  }
`;

const NoPosts = styled.div`
  background: lightgray;
  padding: 2em;
  font-size: 2em;
  margin: 0 auto;
  text-align: center;
  border-radius: 10px;
  width: 40%;
`;

type Props = {
  client: HackerNewsClient;
};

const App: React.FC<Props> = ({ client }) => {
  const isOffline = useBrowserOffline();
  const iterator = useMemo(() => client.fetchNewStories(), [client]);

  return (
    <Page>
      <GlobalStyles />
      <Header>
        <HeaderTitle>Doist Hacker News Client</HeaderTitle>
        <HeaderLink as={ExternalLink} href="https://alexlafroscia.com">
          Created by Alex LaFroscia
        </HeaderLink>
        <HeaderLink
          as={ExternalLink}
          href="https://github.com/alexlafroscia/doist-hacker-news-clone"
        >
          Source Code
        </HeaderLink>
      </Header>
      {isOffline ? <OfflineBanner /> : null}
      <Feed
        LoadingIndicator={LoadingIndicator}
        iterator={iterator}
        buffer={{ bottom: 200 }}
      >
        {(items, isDone) => {
          return (
            <>
              {items.map(item => (
                <HackerNewsItem key={item.id} item={item} />
              ))}
              {isDone &&
                (items.length ? (
                  <NoMoreData>Fin</NoMoreData>
                ) : (
                  <NoPosts>No Posts to Show</NoPosts>
                ))}
            </>
          );
        }}
      </Feed>
    </Page>
  );
};

export default App;
