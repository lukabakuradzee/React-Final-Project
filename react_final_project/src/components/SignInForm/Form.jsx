import React, { useState } from 'react';
import { useAuthContext } from '../../context/auth/AuthContextProvider';
import { signIn } from '../../api/auth';
import { logInAction } from '../../context/auth/actions';
import { HOME_PAGE } from '../../constants/routes';
import { BarLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const Form = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    userName: '',
    password: '',
    error: '',
  });
  const [loading, setLoading] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setInfo((prev) => ({
      ...prev,
      error: '',
    }));

    signIn(info)
      .then((data) => {
        dispatch(logInAction(data));
        navigate(HOME_PAGE);
      })
      .catch((err) => {
        setInfo((prev) => ({ ...prev, error: err.message }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="sign-in">
      <label htmlFor="username">
        <FormattedMessage id="user_name" defaultMessage={`User Name`} />
      </label>
      <div className="input-container">
        <input
          className="input-field"
          autoComplete="true"
          value={info.userName}
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

      <label htmlFor="password">
        <FormattedMessage id="user_password" defaultMessage={`Password`} />
      </label>
      <div className="input-container">
        <input
          className="input-field"
          autoComplete="true"
          type="password"
          value={info.password}
          name="password"
          onChange={(e) => {
            setInfo((prev) => {
              return { ...prev, [e.target.name]: e.target.value };
            });
          }}
        />
        <i className="fa-solid fa-lock password-icon"></i>
      </div>
      {loading && (
        <div className="bar-loader" style={{}}>
          <BarLoader color="#ffd000de" />
        </div>
      )}
      {info.error && <h4>{info.error}</h4>}
      <button onClick={submitHandler}>
        <FormattedMessage id="submit" defaultMessage={`Submit`} />
      </button>
      <Link className="back-home" to={HOME_PAGE}>
        <button>
          <FormattedMessage
            id="back_to_home"
            defaultMessage={`Back To Home Page`}
          />
        </button>
      </Link>
    </form>
  );
};

export default Form;
