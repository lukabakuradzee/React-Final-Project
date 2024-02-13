import React from 'react';
import { useAuthContext } from '../../context/auth/AuthContextProvider';
import { Link } from 'react-router-dom';
import { logOutAction } from '../../context/auth/actions';

const UserProfile = () => {
  const { state, dispatch} = useAuthContext();
  const { user } = state;

  if (!user) {
    return <div>No user provided</div>;
  }

  return (
    <div className="user-account">
      <h2>
        <i class="fa-solid fa-user user-icon"></i>User Profile
      </h2>
      {user && (
        <>
          <p>Username: {user.userName}</p>
          <p>Email: {user.email}</p>
          <p>Iet: {user.iat}</p>
          <p>Exp: {user.exp}</p>
          <p>ID: {user.userID}</p>
          <div className='user-profile-buttons-box'>
          <Link to={`/`}>
            <button>Back</button>
          </Link>
          <button
            className="button-log-out"
            onClick={() => {
              dispatch(logOutAction());
            }}
          >
            Log Out
          </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
