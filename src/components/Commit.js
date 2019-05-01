import React from 'react';

function Commit(props) {
  const {commitedDate, message} = props;

  return (
    <div className="c-git-commit">
      <div className="c-git-commit__message" title={message}>
        {message}
      </div>
    </div>
  );
}

export default Commit;