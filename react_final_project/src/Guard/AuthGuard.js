import React from 'react';
import { useAuthContext } from '../context/auth/AuthContextProvider';
import { Link } from 'react-router-dom';
import { SIGN_IN_PAGE, SIGN_UP_PAGE } from '../constants/routes';
import { FormattedMessage } from 'react-intl';

const AuthGuard = ({ children }) => {
  const { state } = useAuthContext();
  return (
    <>
      {state.isAuthenticated ? (
        children
      ) : (
        <div className="account-modal-content">
          <h2><FormattedMessage id='authenticated_txt' defaultMessage={`You are not AUTHENTHICATED`}/></h2>
          <h3>JustWatch Account</h3>

          <Link to={SIGN_IN_PAGE}>
            <button><FormattedMessage id='user_authentication' defaultMessage={`Authorization`}/></button>
          </Link>
          <Link to={SIGN_UP_PAGE}>
            <button><FormattedMessage id='create_an_account' defaultMessage={`Create an account`}/></button>
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthGuard;
