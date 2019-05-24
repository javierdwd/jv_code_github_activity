'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Commit = require('./Commit');

var _Commit2 = _interopRequireDefault(_Commit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Repository(props) {
  var name = props.name,
      id = props.id,
      url = props.url,
      description = props.description,
      commits = props.commits,
      commitListUrl = props.commitListUrl;


  return _react2.default.createElement(
    'article',
    { className: 'c-git-activity__repository c-git-repository' },
    _react2.default.createElement(
      'h1',
      { className: 'c-git-repository__name' },
      _react2.default.createElement(
        'a',
        {
          href: url,
          className: 'c-git-repository__link',
          rel: 'noopener noreferrer',
          target: '_blank' },
        name
      )
    ),
    _react2.default.createElement(
      'p',
      { className: "c-git-repository__description" },
      description
    ),
    commits && commits.length ? _react2.default.createElement(
      'div',
      { className: 'c-git-activity__commits' },
      commits.map(function (x) {
        return _react2.default.createElement(_Commit2.default, _extends({
          key: x.id
        }, x));
      }),
      _react2.default.createElement(
        'a',
        {
          href: commitListUrl,
          className: 'c-git-repository__commits-all',
          rel: 'noopener noreferrer',
          target: '_blank' },
        'View all'
      )
    ) : null
  );
}

exports.default = Repository;
module.exports = exports['default'];