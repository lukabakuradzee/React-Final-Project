import './App.scss';
import AppRoutes from './Routes';
import { Link } from 'react-router-dom';
import { HOME_PAGE } from './constants/routes';
import FavoriteMoviesModal from './components/MovieDetails/FavoriteMoviesModal';

function App() {
  return (
    <div className="App">
      <FavoriteMoviesModal/>
      <Link to={HOME_PAGE}>
        <h1>
          <i class="fab fa-google-play"></i>JustWatch
        </h1>
      </Link>
      <AppRoutes />
    </div>
  );
}

export default App;
