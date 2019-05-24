"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Commit(props) {
  var commitedDate = props.commitedDate,
      message = props.message;


  return _react2.default.createElement(
    "div",
    { className: "c-git-commit" },
    _react2.default.createElement(
      "div",
      { className: "c-git-commit__message", title: message },
      message
    )
  );
}

exports.default = Commit;
module.exports = exports["default"];