export const fetchData = async () => {
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '12eaa2c047msh237261d4664f961p17b89djsn90feffa1c8d3',
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
      },
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return Array.isArray(result) ? result : [result];
    } catch (error) {
      throw new Error('Failed to fetch movie data :', +error.message);
    }
  };