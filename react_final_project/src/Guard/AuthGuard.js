import React from 'react';
import { useAuthContext } from '../context/auth/AuthContextProvider';
import { Link } from 'react-router-dom';
import { SIGN_IN_PAGE, SIGN_UP_PAGE } from '../constants/routes';
const AuthGuard = ({ children }) => {
  const { state } = useAuthContext();
  return (
    <>
      {state.isAuthenticated ? (
        children
      ) : (
        <div className="account-modal-content">
          <h2>You are not AUTHENTICATED</h2>
          <h3>JustWatch Account</h3>

          <Link to={SIGN_IN_PAGE}>
            <button>Sign in</button>
          </Link>
          <Link to={SIGN_UP_PAGE}>
            <button>Create an account</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthGuard;
