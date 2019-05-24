import React from 'react';

function Commit(props) {
  var commitedDate = props.commitedDate,
      message = props.message;


  return React.createElement(
    "div",
    { className: "c-git-commit" },
    React.createElement(
      "div",
      { className: "c-git-commit__message", title: message },
      message
    )
  );
}

export default Commit;