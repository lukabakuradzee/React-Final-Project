import React, { useState } from 'react';
import { signUp } from '../../api/auth';
import { HOME_PAGE, SIGN_IN_PAGE } from '../../constants/routes';
import { Link, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

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
    setLoading(true);
    signUp(info)
      .then(() => {
        navigate(SIGN_IN_PAGE, { state: { success: true } });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="sign-in" action="">
      <label htmlFor="userName">UserName</label>
      <input
        autoComplete="true"
        type="text"
        name="userName"
        onChange={(e) => {
          setInfo((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
          });
        }}
      />
      <label htmlFor="email">Email</label>
      <input
        autoComplete="true"
        type="text"
        name="email"
        onChange={(e) => {
          setInfo((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
          });
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        onChange={(e) => {
          setInfo((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
          });
        }}
      />
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {loading && (
        <div className="bar-loader" style={{}}>
          <BarLoader color="#36d7b7" />
        </div>
      )}

      <button onClick={signUpHandler}>Submit</button>
      <button>
        <Link className="back-home" to={HOME_PAGE}>
          Back to home page
        </Link>
      </button>
    </form>
  );
};

export default Form;
