import { Link } from 'react-router-dom';
import Data from '../../api/data';
import { useAuthContext } from '../../context/auth/AuthContextProvider';
import { logOutAction } from '../../context/auth/actions';
import { FormattedMessage } from 'react-intl';

const Home = () => {
  const { state, dispatch } = useAuthContext();
  const { user } = state;

  return (
    <div className="home">
      {user && (
        <Link to={`/user/${user.userName}`}>
          <div className="user-info">
            <p>
              <i className="fa-solid fa-user user-icon"></i>
              <FormattedMessage id="welcome" defaultMessage={`Welcome,`}/> {user.userName}
            </p>
          </div>
        </Link>
      )}

      <Data></Data>
      <button
        className="button-log-out"
        onClick={() => {
          dispatch(logOutAction());
        }}
      >
        <FormattedMessage id='logout' defaultMessage={'Log out'} />
      </button>
    </div>
  );
};

export default Home;
