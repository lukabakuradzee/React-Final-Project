import React from 'react';
import { useLocation } from 'react-router';
import Form from '../../components/SignInForm/Form';
import { FormattedMessage } from 'react-intl';

const SignIn = () => {
  const location = useLocation();
  const success = location?.state?.success;
  return (
    <div className="sign-in-page">
      <h2><FormattedMessage id='login'defaultMessage={`Login`} /></h2>
      {success && <h1><FormattedMessage id='succesful_registration' defaultMessage={`Congratulations! You have successfully registered.`} /> </h1>}
      <Form />
    </div>
  );
};

export default SignIn;
