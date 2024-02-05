import Data from '../../api/data';
import { useAuthContext } from '../../context/auth/AuthContextProvider';
import { logOutAction } from '../../context/auth/actions';

const Home = () => {
  const { state, dispatch } = useAuthContext();
  const { user } = state;

  return (
    <div className="home">
      {user && (
        <div className="username-profile">
          <p>Welcome, {user.userName}</p>
        </div>
      )}
      <Data></Data>
      <button
        onClick={() => {
          dispatch(logOutAction());
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Home;
