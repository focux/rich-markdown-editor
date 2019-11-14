// @flow
import * as React from "react";
import styled from "styled-components";
import type { SlateNodeProps } from "../types";
import CopyToClipboard from "./CopyToClipboard";

type Props = SlateNodeProps & {
  level: number,
  hasPretitle: boolean,
  className: string,
};

function Heading(props: Props) {
  const { node, editor, children, level = 1, attributes, className } = props;

  const firstNode = editor.value.document.nodes.first() === node;
  const Component = `h${level + (editor.props.headingsOffset || 0)}`;
  const pretitle = editor.props.pretitle || "";
  const title = node.text.trim();
  const startsWithPretitleAndSpace =
    pretitle && title.match(new RegExp(`^${pretitle}\\s`));

  return (
    <Component {...attributes} className={className}>
      <Wrapper hasPretitle={firstNode && startsWithPretitleAndSpace}>
        {children}
      </Wrapper>
    </Component>
  );
}

const CollapseToggle = styled.a`
  text-decoration: none;
  opacity: ${props => (props.disabled ? "0" : "1")};
  pointer-events: ${props => (props.disabled ? "none" : "all")};
  visibility: ${props => (props.collapsed ? "visible" : "hidden")};
  user-select: none;
  cursor: pointer;
  width: 24px;
  height: 24px;

  svg {
    ${props => props.collapsed && "transform: rotate(-90deg);"};
    fill: ${props =>
      props.collapsed ? props.theme.text : props.theme.placeholder};
    transition: transform 100ms ease-in-out;
  }

  &:hover {
    text-decoration: none;

    svg {
      fill: ${props => props.theme.text};
    }
  }
`;

const Wrapper = styled.div`
  display: inline;
  margin-left: ${(props: Props) => (props.hasPretitle ? "-1.2em" : 0)};
`;

const Anchor = styled(CopyToClipboard)`
  visibility: hidden;
  padding-left: 0.25em;
`;

export const StyledHeading = styled(Heading)`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: -24px;

  &:hover {
    ${CollapseToggle} {
      visibility: visible;
    }

    ${Anchor} {
      color: ${props => props.theme.placeholder};
      visibility: visible;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: ${props => props.theme.text};
      }
    }
  }
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
