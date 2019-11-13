"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _slate = require("slate");

var _Contents = require("../components/Contents");

var _Contents2 = _interopRequireDefault(_Contents);

var _Toolbar = require("../components/Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import BlockInsert from "../components/BlockInsert";
function ChromePlugin() {
  function renderEditor(props, editor, next) {
    var children = next();

    return React.createElement(
      React.Fragment,
      null,
      !props.readOnly && React.createElement(_Toolbar2.default, { value: editor.value, editor: editor }),
      children
    );
  }

  return { renderEditor: renderEditor };
}

exports.default = ChromePlugin;