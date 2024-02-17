import React from 'react';
import { useAuthContext } from '../../context/auth/AuthContextProvider';
import { Link } from 'react-router-dom';
import { logOutAction } from '../../context/auth/actions';
import { FormattedMessage } from 'react-intl';

const UserProfile = () => {
  const { state, dispatch} = useAuthContext();
  const { user } = state;

  if (!user) {
    return <div>No user provided</div>;
  }

  return (
    <div className="user-account">
      <h2>
        <i class="fa-solid fa-user user-icon"></i><FormattedMessage id='user_account' defaultMessage={`User Profile`}/>
      </h2>
      {user && (
        <>
          <p><FormattedMessage id='user_name' defaultMessage={`User Name`}/>: {user.userName}</p>
          <p><FormattedMessage id='user_email' defaultMessage={`Email`}/>: {user.email}</p>
          <p><FormattedMessage id='user_iat' defaultMessage={`Iat`}/>: {user.iat}</p>
          <p><FormattedMessage id='user_exp' defaultMessage={`Exp`}/>:{user.exp}</p>
          <p><FormattedMessage id='user_id' defaultMessage={`User ID`}/>: {user.userID}</p>
          <div className='user-profile-buttons-box'>
          <Link to={`/`}>
            <button><FormattedMessage id='back' defaultMessage={`Back`}/></button>
          </Link>
          <button
            className="button-log-out"
            onClick={() => {
              dispatch(logOutAction());
            }}
          >
            <FormattedMessage id='logout' defaultMessage={`Log Out`}/>
          </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
