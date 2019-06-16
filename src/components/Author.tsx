import React, { FC } from "react";
import styled from "styled-components";

import { Author as IAuthor } from "../HackerNewsClient/Item";

import { ExternalLink } from "./ExternalLink";

const AuthorLink = styled(ExternalLink)`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

type Props = {
  author: IAuthor;
};

export const Author: FC<Props> = ({ author }) => (
  <AuthorLink href={author.url}>{author.name}</AuthorLink>
);
