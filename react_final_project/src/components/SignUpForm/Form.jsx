import React, { useState } from 'react';
import { signUp } from '../../api/auth';
import { HOME_PAGE, SIGN_IN_PAGE } from '../../constants/routes';
import { Link, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { emailRegex } from '../../utils/Regex';
import { FormattedMessage } from 'react-intl';

const Form = () => {
  const [info, setInfo] = useState({
    userName: '',
    password: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signUpHandler = (e) => {
    e.preventDefault();
    if (!info.userName || !info.email || !info.password) {
      setError('You must fill in all fields');
      return;
    }

    if (!emailRegex.test(info.email)) {
      setError('Invalid email format');
      return;
    }

    setLoading(true);

    signUp(info)
      .then(() => {
        navigate(SIGN_IN_PAGE, { state: { success: true } });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="sign-in" action="">
      <label htmlFor="userName">
        <FormattedMessage id="user_name" defaultMessage={`User Name`} />
      </label>
      <div className="input-container">
        <input
          className="input-field"
          autoComplete="true"
          type="text"
          name="userName"
          onChange={(e) => {
            setInfo((prev) => {
              return { ...prev, [e.target.name]: e.target.value };
            });
          }}
        />
        <i className="fa-solid fa-user user-icon"></i>
      </div>

      <label htmlFor="email">
        <FormattedMessage id="user_email" defaultMessage={`Email`} />
      </label>
      <div className="input-container">
        <input
          className="input-field"
          autoComplete="true"
          type="text"
          name="email"
          onChange={(e) => {
            setInfo((prev) => {
              return { ...prev, [e.target.name]: e.target.value };
            });
          }}
        />
        <i className="fa-solid fa-envelope user-email"></i>
      </div>
      <label htmlFor="password">
        <FormattedMessage id="user_password" defaultMessage={`Password`} />
      </label>
      <div className="input-container">
        <input
          className="input-field"
          type="password"
          name="password"
          onChange={(e) => {
            setInfo((prev) => {
              return { ...prev, [e.target.name]: e.target.value };
            });
          }}
        />
        <i className="fa-solid fa-lock password-icon"></i>
      </div>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {loading && (
        <div className="bar-loader" style={{}}>
          <BarLoader color="#ffd000de" />
        </div>
      )}

      <button onClick={signUpHandler}>
        <FormattedMessage id="submit" defaultMessage={`Submit`} />
      </button>

      <Link to={HOME_PAGE}>
        <button>
          <FormattedMessage
            id="back_to_home"
            defaultMessage={`Back to home page`}
          />
        </button>
      </Link>
    </form>
  );
};

export default Form;
