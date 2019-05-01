import React from 'react';

function User({ user, login }) {
  return (
    <div className="user">
      <span className="login">({login})</span>

      <span className="profile-name">{user.name}</span>
      <span className="profile-url">{user.url}</span>
    </div>
  );
}

export default User;