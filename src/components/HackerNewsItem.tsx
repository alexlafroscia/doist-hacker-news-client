import React, { FC } from "react";
import styled from "styled-components";

import { Item } from "../HackerNewsClient/Item";
import { getDateFormatter } from "../utils/createDateFormatter";

import { Author } from "./Author";
import { ExternalLink } from "./ExternalLink";

type HackerNewsItemProps = {
  item: Pick<Item, "author" | "time" | "title" | "url">;
};

const Title = styled(ExternalLink)`
  color: blue;
  font-size: 1.2em;
  margin-bottom: 0.2em;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: darkblue;
  }
`;

const Details = styled.div`
  align-items: center;
  display: flex;
`;

const Seperator = styled.span`
  margin-right: 0.5em;
  margin-left: 0.5em;

  &::after {
    content: "•";
    display: block;
    font-size: 0.8em;
  }
`;

const TimeStamp = styled.time`
  font-style: italic;
`;

export const HackerNewsItem: FC<HackerNewsItemProps> = ({ item, ...rest }) => {
  const formatter = getDateFormatter(navigator.language);

  return (
    <div {...rest}>
      <Title href={item.url}>{item.title}</Title>
      <Details>
        <Author author={item.author} />
        <Seperator />
        <TimeStamp>{formatter.format(item.time)}</TimeStamp>
      </Details>
    </div>
  );
};
