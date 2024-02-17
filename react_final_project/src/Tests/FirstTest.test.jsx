import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from '../components/Cards/MovieCard';
import GenreFilter from '../components/Cards/GenreFilter';


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
      expect(screen.getByText(`Genre: ${movie.genre.join(', ')}`)).toBeInTheDocument();
      expect(screen.getByText(`Description: ${movie.description}`)).toBeInTheDocument();
    });
  
  });

  // Genre filter
  describe('GenreFilter', () => {
    const selectedGenres = ['Action', 'Comedy'];
    const handleGenreChange = jest.fn();
  
    test('renders checkboxes for each genre', () => {
      render(
        <GenreFilter
          selectedGenres={selectedGenres}
          handleGenreChange={handleGenreChange}
        />
      );
  
      const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Romance', 'History'];
      genres.forEach(genre => {
        const checkbox = screen.getByRole('checkbox', { name: genre });
        expect(checkbox).toBeInTheDocument();
      });
    });
  
    test('marks checkboxes as checked for selected genres', () => {
      render(
        <GenreFilter
          selectedGenres={selectedGenres}
          handleGenreChange={handleGenreChange}
        />
      );
  
      selectedGenres.forEach(genre => {
        const checkbox = screen.getByRole('checkbox', { name: genre });
        expect(checkbox).toBeChecked();
      });
    });
  
    test('calls handleGenreChange when checkbox is toggled', () => {
      render(
        <GenreFilter
          selectedGenres={selectedGenres}
          handleGenreChange={handleGenreChange}
        />
      );
  
      const checkbox = screen.getByRole('checkbox', { name: 'Drama' });
      fireEvent.click(checkbox);
      expect(handleGenreChange).toHaveBeenCalledWith('Drama');
    });
  });


