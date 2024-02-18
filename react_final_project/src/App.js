import './App.scss';
import AppRoutes from './Routes';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HOME_PAGE } from './constants/routes';
import FavoriteMoviesModal from './components/MovieDetails/FavoriteMoviesModal';
import { IntlProvider } from 'react-intl';
import kaTranslations from './translations/kaTranslations/ka.json';
import LanguageSelector from './translations/LanguageSelector/LanguageSelector';
import Cookies from 'js-cookie';

function App() {
  const [locale, setLocale] = useState(Cookies.get('locale') || 'en');
  const messages = locale === 'ka' ? kaTranslations : {};

  const handleLanguageChange = (selectedLocale) => {
    setLocale(selectedLocale);
  };



  return (
    <IntlProvider locale={locale} messages={messages}>
      <div className="App">
        <LanguageSelector onLanguageChange={handleLanguageChange} />
        <FavoriteMoviesModal />
        <Link to={HOME_PAGE}>
          <h1>
            <i class="fab fa-google-play"></i>JustWatch
          </h1>
        </Link>
        <AppRoutes />
      </div>
    </IntlProvider>
  );
}

export default App;
