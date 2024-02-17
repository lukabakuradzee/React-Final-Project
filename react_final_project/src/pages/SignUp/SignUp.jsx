import React from "react";
import Form from "../../components/SignUpForm/Form";
import { FormattedMessage } from "react-intl";
const SignUp = () => {
  return (
    <div className="sign-up-page">
      <h2><FormattedMessage id="sign_up" defaultMessage={`Sign Up`} /></h2>
      <Form />
    </div>
  );
};

export default SignUp;
