"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function User(_ref) {
  var user = _ref.user,
      login = _ref.login;

  return _react2.default.createElement(
    "div",
    { className: "c-git-activity__user c-git-user" },
    _react2.default.createElement(
      "span",
      { className: "c-git-user__name" },
      user.name
    ),
    _react2.default.createElement(
      "a",
      {
        href: user.url,
        className: "c-git-user__url",
        rel: "noopener noreferrer",
        target: "_blank" },
      _react2.default.createElement(
        "span",
        { className: "c-git-user__login" },
        login
      )
    )
  );
}

exports.default = User;
module.exports = exports["default"];