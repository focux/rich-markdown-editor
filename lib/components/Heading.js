"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Heading6 = exports.Heading5 = exports.Heading4 = exports.Heading3 = exports.Heading2 = exports.Heading1 = exports.StyledHeading = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function Heading(props) {
  var editor = props.editor,
      children = props.children,
      _props$level = props.level,
      level = _props$level === undefined ? 1 : _props$level,
      attributes = props.attributes,
      className = props.className;


  var Component = "h" + (level + (editor.props.headingsOffset || 0));

  return React.createElement(
    Component,
    _extends({}, attributes, { className: className }),
    children
  );
}

var StyledHeading = exports.StyledHeading = (0, _styledComponents2.default)(Heading).withConfig({
  displayName: "Heading__StyledHeading",
  componentId: "sc-11dvfr8-0"
})(["display:flex;align-items:center;position:relative;"]);

var Heading1 = exports.Heading1 = function Heading1(props) {
  return React.createElement(StyledHeading, _extends({ level: 1 }, props));
};
var Heading2 = exports.Heading2 = function Heading2(props) {
  return React.createElement(StyledHeading, _extends({ level: 2 }, props));
};
var Heading3 = exports.Heading3 = function Heading3(props) {
  return React.createElement(StyledHeading, _extends({ level: 3 }, props));
};
var Heading4 = exports.Heading4 = function Heading4(props) {
  return React.createElement(StyledHeading, _extends({ level: 4 }, props));
};
var Heading5 = exports.Heading5 = function Heading5(props) {
  return React.createElement(StyledHeading, _extends({ level: 5 }, props));
};
var Heading6 = exports.Heading6 = function Heading6(props) {
  return React.createElement(StyledHeading, _extends({ level: 6 }, props));
};