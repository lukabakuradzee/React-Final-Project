import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MovieCard from '../components/Cards/MovieCard';
import Search from '../components/Search/Search';
import { signIn } from '../api/auth';
import { MemoryRouter } from 'react-router-dom';
import Form from '../components/SignInForm/Form';
import { fetchData } from '../api/fetchData';
import Data from '../api/data';
import routes from '../config/routes';
import AuthGuard from '../Guard/AuthGuard';
import GustGuard from '../Guard/GustGuard';
import Home from '../pages/Home/Home';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import NotFound from '../pages/not-found';
import UserProfile from '../components/UserProfile/UserProfile';
import { AuthContextProvider } from '../context/auth/AuthContextProvider';

// MovieCard Test Component
const movie = {
  id: 1,
  title: 'Test Movie',
  image: 'test-image.jpg',
  rating: 8.5,
  year: 2022,
  genre: ['Action', 'Adventure'],
  description: 'This is a test movie description.',
};

// Test suite for the MovieCard component
describe('MovieCard', () => {
  test('renders movie details correctly', () => {
    render(<MovieCard movie={movie} />);

    expect(screen.getByText(movie.title)).toBeInTheDocument();
    expect(screen.getByAltText(movie.title)).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${movie.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`Year: ${movie.year}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Genre: ${movie.genre.join(', ')}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Description: ${movie.description}`),
    ).toBeInTheDocument();
  });
});

// Search Component

describe('Search component', () => {
  it('renders correctly', () => {
    render(<Search data={[]} />);
    const inputElement = screen.getByPlaceholderText('Search...');
    expect(inputElement).toBeInTheDocument();
  });

  it('filters data correctly based on search input', () => {
    const data = [
      {
        id: 1,
        title: 'Movie 1',
        year: 2022,
        genre: ['Action', 'Drama'],
        image: 'movie1.jpg',
      },
      {
        id: 2,
        title: 'Movie 2',
        year: 2021,
        genre: ['Comedy', 'Romance'],
        image: 'movie2.jpg',
      },
      {
        id: 3,
        title: 'Movie 3',
        year: 2020,
        genre: ['Sci-Fi', 'Adventure'],
        image: 'movie3.jpg',
      },
    ];
    render(<Search data={data} />);

    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'Movie 1' } });

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('Action, Drama')).toBeInTheDocument();
    expect(screen.queryByText('Movie 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Movie 3')).not.toBeInTheDocument();
  });

  it('clears search input and filtered data when Escape key is pressed', () => {
    const data = [
      {
        id: 1,
        title: 'Movie 1',
        year: 2022,
        genre: ['Action', 'Drama'],
        image: 'movie1.jpg',
      },
    ];

    render(<Search data={data} />);

    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'Movie' } });
    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });

    expect(inputElement.value).toBe('');
    expect(screen.queryByText('Movie 1')).not.toBeInTheDocument();
  });
});

//  Sign in Form

jest.mock('../api/auth', () => ({
  signIn: jest.fn(),
}));

describe('Form Component', () => {
  it('renders the form correctly', () => {
    render(
      <MemoryRouter>
        <AuthContextProvider>
          <Form />
        </AuthContextProvider>
      </MemoryRouter>,
    );
    expect(screen.getByLabelText('User Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Back To Home Page' }),
    ).toBeInTheDocument();
  });

  it('submits the form and logs successfully', async () => {
    const fakeUserData = {
      username: 'testuser',
      password: 'password',
    };
    signIn.mockResolvedValue(fakeUserData);
    render(
      <MemoryRouter>
        <AuthContextProvider>
          <Form />
        </AuthContextProvider>
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText('User Name'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(signIn).toHaveBeenCalledTimes(1));
    expect(window.location.pathname).toEqual('/home');
  });

  it('displays an error message if login fails', async () => {
    const errorMessage = 'Invalid credentials';
    signIn.mockRejectedValue(new Error(errorMessage));

    render(
      <MemoryRouter>
        <AuthContextProvider>
          <Form />
        </AuthContextProvider>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    // Wait for the error message to be displayed
    await screen.findByText(() =>
      expect(screen.getByText(errorMessage)).toBeInTheDocument(),
    );
  });
});

// Sign Up Form

jest.mock('../api/fetchData');

describe('Data component', () => {
  beforeEach(() => {
    fetchData.mockReset();
  });
  it('renders loading spinner while fetching data', () => {
    fetchData.mockResolvedValue([]);
    render(<Data />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders error message if fetching data fails', async () => {
    const errorMessage = 'Error fetching data';
    fetchData.mockRejectedValueOnce(new Error(errorMessage));
    render(<Data />);

    await screen.findByText(() =>
      expect(screen.getByText(errorMessage)).toBeInTheDocument(),
    );
  });

  it('renders movie cards after successfully fetching data', async () => {
    const testData = [
      { id: 1, title: 'Movie 1', image: 'movie1.jpg' },
      { id: 2, title: 'Movie 2', image: 'movie2.jpg' },
    ];
    fetchData.mockResolvedValueOnce(testData);
    render(<Data />);

    await waitFor(() =>
      expect(screen.getAllByTestId('movie-card')).toHaveLength(2),
    );
  });
});

//  Routes

describe('Route Configuration', () => {
  test.each(routes)(
    'should have correct configuration rate for % route',
    (route) => {
      expect(route).toHaveProperty('path');
      expect(route).toHaveProperty('Component');

      if (route.path === '/movie/:id' || route.path === '/user/:user') {
        jest.expect(route).toHaveProperty('Guard');
      } else {
        jest.expect(route).not.toHaveProperty('Guard');
      }

      switch (route.path) {
        case '/':
          jest.expect(route.path).toBe('/');
          jest.expect(route.Component).toBe(Home);
          break;
        case '/signin':
          jest.expect(route.path).toBe('/signin');
          jest.expect(route.Component).toBe(SignIn);
          jest.expect(route.Guard).toBe(GustGuard);
          break;
        case '/signup':
          jest.expect(route.path).toBe('/signup');
          jest.expect(route.Component).toBe(SignUp);
          jest.expect(route.Guard).toBe(GustGuard);
          break;
        case '/movie/:id':
          jest.expect(route.path).toBe('/movie/:id');
          jest.expect(route.Component).toBe(MovieDetails);
          jest.expect(route.Guard).toBe(AuthGuard);
          break;
        case '/user/:user':
          jest.expect(route.path).toBe('/user/:user');
          jest.expect(route.Component).toBe(UserProfile);
          jest.expect(route.Guard).toBe(AuthGuard);
          break;
        case '*':
          jest.expect(route.path).toBe('*');
          jest.expect(route.Component).toBe(NotFound);
          break;
        default:
          throw new Error(`Unexpected route: ${route.path}`);
      }
    },
  );
});
