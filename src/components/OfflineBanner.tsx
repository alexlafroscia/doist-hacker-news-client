import React, { FC } from "react";
import styled from "styled-components";

const Banner = styled.div`
  background: red;
  color: white;
  padding: 0.5em 1em;
`;

export const OfflineBanner: FC = () => (
  <Banner>
    Browser is offline. Please reconnect and refresh the page for new posts!
  </Banner>
);
