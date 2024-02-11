import React from 'react';
import { useAuthContext } from '../../context/auth/AuthContextProvider';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { state } = useAuthContext();
  const { user } = state;
  console.log(state)

  if (!user) {
    return <div>No user provided</div>;
  }

  return (
    <div className="user-account">
      <h2>User Profile</h2>
      {user && (
        <>
          <p>Username: {user.userName}</p>
          <p>Email: {user.email}</p>
          <p>Iet: {user.iat}</p>
          <p>Exp: {user.exp}</p>
          <p>ID: {user.userID}</p>
          <Link to={`/`}><button>Back</button></Link>
        </>
      )}
    </div>
  );
};

export default UserProfile;
