import React from 'react';
import { useAuthContext } from '../../context/auth/AuthContextProvider';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { state } = useAuthContext();
  const { user } = state;

  if (!user) {
    return <div>No user provided</div>;
  }

  return (
    <div className="user-account">
      <h2><i class="fa-solid fa-user user-icon"></i>User Profile</h2>
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
