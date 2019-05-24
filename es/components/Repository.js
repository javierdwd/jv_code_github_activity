var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import Commit from './Commit';

function Repository(props) {
  var name = props.name,
      id = props.id,
      url = props.url,
      description = props.description,
      commits = props.commits,
      commitListUrl = props.commitListUrl;


  return React.createElement(
    'article',
    { className: 'c-git-activity__repository c-git-repository' },
    React.createElement(
      'h1',
      { className: 'c-git-repository__name' },
      React.createElement(
        'a',
        {
          href: url,
          className: 'c-git-repository__link',
          rel: 'noopener noreferrer',
          target: '_blank' },
        name
      )
    ),
    React.createElement(
      'p',
      { className: "c-git-repository__description" },
      description
    ),
    commits && commits.length ? React.createElement(
      'div',
      { className: 'c-git-activity__commits' },
      commits.map(function (x) {
        return React.createElement(Commit, _extends({
          key: x.id
        }, x));
      }),
      React.createElement(
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

export default Repository;