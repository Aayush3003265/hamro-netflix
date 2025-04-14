import { useState, useEffect } from "react";

const OMDB_API_KEY = '589afbe';
export function useMovies(query){
     const [movies, setMovies] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
     const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const controller = new AbortController();
        const fetchMovie = async () => {
          try {
            setErrorMessage('');
            setIsLoading(true);
            const response = await fetch(
              `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`,
              {
                signal: controller.signal,
              }
            );
            if (!response.ok) throw new Error('Network Error');
            const data = await response.json();
            if (!data.Search) throw new Error('Movie Not found');
            // console.log(data.Search);
            setMovies(data.Search);
            setErrorMessage('');
          } catch (error) {
            if (error.name === 'AbortError') return;
            console.error('Something went wrong', error);
            setErrorMessage(error.message);
          } finally {
            setIsLoading(false);
          }
        };
        if (query.length < 3) {
          // !query
          setMovies([]);
          setErrorMessage('');
          return;
        }
        fetchMovie();
        return () => {
          controller.abort();
        };
      }, [query]);
      return{
        movies,
        isLoading,
        errorMessage
      }
}