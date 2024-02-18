import './App.scss';
import AppRoutes from './Routes';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HOME_PAGE } from './constants/routes';
import FavoriteMoviesModal from './components/MovieDetails/FavoriteMoviesModal';
import { IntlProvider } from 'react-intl';
import kaTranslations from './translations/kaTranslations/ka.json';
import LanguageSelector from './translations/LanguageSelector/LanguageSelector';
import Cookies from 'js-cookie';

function App() {
  const [locale, setLocale] = useState(Cookies.get('locale') || 'en');

  const handleLanguageChange = (selectedLocale) => {
    setLocale(selectedLocale);
    Cookies.set('locale', selectedLocale);
    console.log('Setting locale: ', selectedLocale, {expires: 365})
  };

  const messages = locale === 'ka' ? kaTranslations : {};
  useEffect(() => {
    const storedLocale = localStorage.getItem('locale');
    console.log('Retrieved locale: ', storedLocale);
    if (storedLocale) {
      setLocale(storedLocale);
    }
  }, []);

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
