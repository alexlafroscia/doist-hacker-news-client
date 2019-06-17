import styled from "styled-components";

import { hackerNewsOrange } from "../theme";

export const Header = styled.header`
  align-items: center;
  background: ${hackerNewsOrange};
  color: white;
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 1em;
  padding: 1em;

  & > *:not(:last-child) {
    margin-right: 1em;
  }

  @media (min-width: 600px) {
    flex-wrap: nowrap;
  }
`;

export const Title = styled.h1`
  flex-grow: 1;
  font-size: 1.1em;
  padding-bottom: 0.5em;
  margin: 0;
  width: 100%;

  @media (min-width: 600px) {
    padding-bottom: 0;
    width: auto;
  }
`;

export const Link = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: inherit;
  }
`;
