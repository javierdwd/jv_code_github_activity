import React from 'react';

function User(_ref) {
  var user = _ref.user,
      login = _ref.login;

  return React.createElement(
    "div",
    { className: "c-git-activity__user c-git-user" },
    React.createElement(
      "span",
      { className: "c-git-user__name" },
      user.name
    ),
    React.createElement(
      "a",
      {
        href: user.url,
        className: "c-git-user__url",
        rel: "noopener noreferrer",
        target: "_blank" },
      React.createElement(
        "span",
        { className: "c-git-user__login" },
        login
      )
    )
  );
}

export default User;