// @flow
import * as React from "react";
import styled from "styled-components";
import type { SlateNodeProps } from "../types";

type Props = SlateNodeProps & {
  level: number,
  hasPretitle: boolean,
  className: string,
};

function Heading(props: Props) {
  const { editor, children, level = 1, attributes, className } = props;

  const Component = `h${level + (editor.props.headingsOffset || 0)}`;

  return (
    <Component {...attributes} className={className}>
      {children}
    </Component>
  );
}

export const StyledHeading = styled(Heading)`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Heading1 = (props: SlateNodeProps) => (
  <StyledHeading level={1} {...props} />
);
export const Heading2 = (props: SlateNodeProps) => (
  <StyledHeading level={2} {...props} />
);
export const Heading3 = (props: SlateNodeProps) => (
  <StyledHeading level={3} {...props} />
);
export const Heading4 = (props: SlateNodeProps) => (
  <StyledHeading level={4} {...props} />
);
export const Heading5 = (props: SlateNodeProps) => (
  <StyledHeading level={5} {...props} />
);
export const Heading6 = (props: SlateNodeProps) => (
  <StyledHeading level={6} {...props} />
);
