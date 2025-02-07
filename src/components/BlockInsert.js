// @flow
import * as React from "react";
import { Portal } from "react-portal";
import { Node } from "slate";
import { Editor, findDOMNode } from "slate-react";
import { isEqual } from "lodash";
import styled, { withTheme } from "styled-components";
import { PlusIcon } from "outline-icons";

type Props = {
  editor: Editor,
  theme: Object,
};

function findClosestRootNode(value, ev) {
  let previous;

  for (const node of value.document.nodes) {
    const element = findDOMNode(node);
    const bounds = element.getBoundingClientRect();
    if (bounds.top > ev.clientY) return previous;
    previous = { node, element, bounds };
  }

  return previous;
}

type State = {
  closestRootNode: ?Node,
  active: boolean,
  top: number,
  left: number,
};

class BlockInsert extends React.Component<Props, State> {
  mouseMoveTimeout: ?TimeoutID;
  ref: ?HTMLSpanElement;

  state = {
    top: -1000,
    left: -1000,
    active: false,
    closestRootNode: undefined,
  };

  componentDidMount = () => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", this.handleMouseMove);
    }
  };

  componentWillUnmount = () => {
    if (this.mouseMoveTimeout) clearTimeout(this.mouseMoveTimeout);
    if (typeof window !== "undefined") {
      window.removeEventListener("mousemove", this.handleMouseMove);
    }
  };

  setInactive = () => {
    this.setState({ active: false });
  };

  handleMouseMove = (ev: SyntheticMouseEvent<>) => {
    const triggerPoint = this.ref
      ? this.ref.getBoundingClientRect().left + 300
      : window.innerWidth;
    const result = findClosestRootNode(this.props.editor.value, ev);
    const newState = { ...this.state };

    newState.active = ev.clientX < triggerPoint;

    if (result) {
      newState.closestRootNode = result.node;

      // do not show block menu when it's open, the paragraph isn't empty
      // or the current node is an embed.
      const hideToolbar =
        result.node.type !== "paragraph" ||
        !!result.node.text.trim() ||
        result.node.isVoid;

      if (hideToolbar) {
        newState.left = -1000;
        newState.active = false;
      } else {
        newState.left = Math.round(result.bounds.left - 20);
        newState.top = Math.round(result.bounds.top + window.scrollY);
      }
    }

    if (this.state.active) {
      if (this.mouseMoveTimeout) clearTimeout(this.mouseMoveTimeout);
      this.mouseMoveTimeout = setTimeout(this.setInactive, 2000);
    }

    if (!isEqual(newState, this.state)) {
      this.setState(newState);
    }
  };

  handleClick = (ev: SyntheticMouseEvent<>) => {
    ev.preventDefault();
    ev.stopPropagation();

    this.setState({ active: false });

    const { editor } = this.props;

    // remove any existing toolbars in the document as a fail safe
    editor.value.document.nodes.forEach(node => {
      if (node.type === "block-toolbar") {
        editor.setNodeByKey(node.key, {
          type: "paragraph",
          isVoid: false,
        });
      }
    });

    const node = this.state.closestRootNode;
    if (!node) return;

    // we're on an empty paragraph. just replace it with the block toolbar
    if (!node.text.trim() && node.type === "paragraph") {
      editor.setNodeByKey(node.key, {
        type: "block-toolbar",
        isVoid: true,
      });
    }
  };

  setRef = ref => {
    this.ref = ref;
  };

  render() {
    const { theme } = this.props;
    const style = { top: `${this.state.top}px`, left: `${this.state.left}px` };

    const canUseDOM = !!(
      typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
    );

    // Portals doesn't work good on SSR.
    if (!canUseDOM) {
      return null;
    }

    return (
      <React.Fragment>
        <span ref={this.setRef} />
        <Portal>
          <Trigger active={this.state.active} style={style}>
            <PlusIcon
              onClick={this.handleClick}
              color={theme.blockToolbarTrigger}
            />
          </Trigger>
        </Portal>
      </React.Fragment>
    );
  }
}

const Trigger = styled.div`
  position: absolute;
  z-index: ${props => {
    return props.theme.zIndex + 99;
  }}; /* must be below toolbar index */
  opacity: 0;
  background-color: ${props => props.theme.background};
  transition: opacity 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
    transform 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  line-height: 0;
  margin-left: -10px;
  box-shadow: inset 0 0 0 2px ${props => props.theme.blockToolbarTrigger};
  border-radius: 100%;
  transform: scale(0.9);
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.blockToolbarTrigger};

    svg {
      fill: ${props => props.theme.blockToolbarTriggerIcon};
    }
  }

  ${({ active }) =>
    active &&
    `
    transform: scale(1);
    opacity: .9;
  `};
`;

export default withTheme(BlockInsert);
