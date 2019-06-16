import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import { HackerNewsItem as BaseHackerNewsItem } from "./components/HackerNewsItem";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { LiveData } from "./components/LiveData";
import {
  Header,
  Title as HeaderTitle,
  Link as HeaderLink
} from "./components/Header";

import { HackerNewsClient } from "./HackerNewsClient";
import { systemFont } from "./theme";
import { ExternalLink } from "./components/ExternalLink";

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

type Props = {
  client: HackerNewsClient;
};

const App: React.FC<Props> = ({ client }) => (
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
    <Feed
      LoadingIndicator={LoadingIndicator}
      iterator={client.fetchNewStories()}
      buffer={{ bottom: 200 }}
    >
      {items => items.map(item => <HackerNewsItem key={item.id} item={item} />)}
    </Feed>
  </Page>
);

export default App;
