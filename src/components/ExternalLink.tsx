import React, { ComponentProps, FC } from "react";

type Props = Omit<ComponentProps<"a">, "target" | "rel">;

export const ExternalLink: FC<Props> = ({ children, ...props }) => (
  <a target="_blank" rel="noopener" {...props}>
    {children}
  </a>
);
