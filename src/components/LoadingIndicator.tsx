import React, { forwardRef } from "react";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 1em 0;
  margin-bottom: 1em;
`;

const bounce = keyframes`
  25% {
    transform: translateY(10px);
  }

  50%, 100% {
    transform: translateY(0px);
  }
`;

type DotProps = {
  delay: number;
};

const Dot = styled.span`
  animation: 1s ease-in-out ${(props: DotProps) => props.delay}s infinite
    ${bounce};
  background: lightgrey;
  border-radius: 10px;
  height: 10px;
  width: 10px;

  &:not(:last-child) {
    margin-right: 0.5em;
  }
`;

type Props = {};

const LoadingIndicator = forwardRef<HTMLDivElement, Props>((_props, ref) => (
  <Wrapper ref={ref}>
    <Dot delay={0} />
    <Dot delay={1 / 3} />
    <Dot delay={2 / 3} />
  </Wrapper>
));

export { LoadingIndicator };
