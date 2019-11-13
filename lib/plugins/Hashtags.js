"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hashtagRegex = require("hashtag-regex");

var _hashtagRegex2 = _interopRequireDefault(_hashtagRegex);

var _slateInstantReplace = require("slate-instant-replace");

var _slateInstantReplace2 = _interopRequireDefault(_slateInstantReplace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regex = (0, _hashtagRegex2.default)();

function Hashtags() {
  return (0, _slateInstantReplace2.default)(function (editor, lastWord) {
    if (!lastWord) return;
    if (!editor.props.onClickHashtag) return;

    var match = lastWord.match(regex);

    // captures when "#" added before existing characters
    if (lastWord === "#") {
      var startText = editor.value.startText;

      var text = startText.text;
      var _match = regex.exec(text);

      if (_match) {
        editor.unwrapInline({ type: "hashtag" }).moveStartTo(startText.key, _match.index).moveEndTo(startText.key, _match.index + _match[0].length).wrapInline({ type: "hashtag" }).moveToStart().moveForward(1);
      }

      // captures when characters added after a "#"
    } else if (match) {
      var diff = lastWord.length - match[0].length;

      editor.unwrapInline({ type: "hashtag" }).moveStartBackward(lastWord.length).moveEndBackward(diff).wrapInline({ type: "hashtag" }).moveForward(diff).moveToEnd();
    } else {
      editor.unwrapInline({ type: "hashtag" });
    }
  });
}

exports.default = Hashtags;