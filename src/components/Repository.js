import React from 'react';

function Repository(props) {
  const {
    name,
    id,
    url,
    description,
    commits,
  } = props;

  return (
    <div className="repository">
      <span className="name">({name})</span>
    </div>
  );
}

export default Repository;