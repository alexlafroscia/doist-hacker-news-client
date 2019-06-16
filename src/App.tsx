import React from "react";
import styled from "styled-components";

import { LoadingIndicator } from "./components/LoadingIndicator";
import { LiveData } from "./components/LiveData";
import { HackerNewsClient } from "./HackerNewsClient";


const Feed = styled(LiveData)`
  height: 100vh;
`;

type Props = {
  client: HackerNewsClient;
};

const App: React.FC<Props> = ({ client }) => {
  const Loading = <LoadingIndicator>Loading...</LoadingIndicator>;

  return (
    <Feed
      LoadingIndicator={Loading}
      iterator={client.fetchNewStories()}
      buffer={{ bottom: 100 }}
    >
      {items => items.map(item => <p key={item.id}>{item.id}</p>)}
    </Feed>
  );
};

export default App;
