
import { useState, useEffect, use } from 'react';
import RatingStar from './RatingStar';

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const OMDB_API_KEY = '589afbe';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [watched, setWatched] = useState(function () {
    const storedMovie = localStorage.getItem('watched');
    return JSON.parse(storedMovie);
  });

  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // Using Promise
  // useEffect(() => {
  //   fetch(
  //     `http://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_API_KEY}&s=${movieName}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setMovies(data.Search));
  // }, []);

  // Using Async Await
  useEffect(() => {
    const controller = new AbortController();
    const fetchMovie = async () => {
      try {
        setErrorMessage('');
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`,
          {
            signal: controller.signal
          }
        );
        if (!response.ok) throw new Error('Network Error');
        const data = await response.json();
        if (!data.Search) throw new Error('Movie Not found');
        console.log(data.Search);
        setMovies(data.Search);
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
    }
  }, [query]);

  function handleSelectMovie(movieId) {
    setSelectedMovieId(movieId);
  }

  function handleCloseMovieDetail(e) {
    setSelectedMovieId(null);
  }



  function onAddMovie(movieDetailObj) {
    setWatched((watched) => [...watched, movieDetailObj]);
  }
  const onDeleteMovie = (id) => {
    setWatched(watched => watched.filter((movie) => movie.imdbID !== id))
  }
  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [watched])

  return (
    <>
      <Navbar>
        <Logo />
        <Searchbar query={query} setQuery={setQuery} />
        <MovieResultLength movies={movies} />
      </Navbar>
      <Main>
        <MovieListBox>
          {isLoading && <Loader />}
          {!isLoading && errorMessage && (
            <ErrorMessage message={errorMessage} />
          )}
          {!isLoading && !errorMessage && (
            <MovieList movies={movies} onMovieSelect={handleSelectMovie} />
          )}
        </MovieListBox>
        <WatchedMovieListBox>
          {selectedMovieId ? (
            <MovieDetail
              movieId={selectedMovieId}
              onAddMovie={onAddMovie}
              watched={watched}
              handleCloseMovieDetail={handleCloseMovieDetail}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList onDeleteMovie={onDeleteMovie} watched={watched} />
            </>
          )}
        </WatchedMovieListBox>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return <div className="error">{message}</div>;
}

function Loader() {
  return <div className="loader">Loading......</div>;
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function MovieResultLength({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function MovieDetail({ movieId, handleCloseMovieDetail, onAddMovie, watched, }) {
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setuserRating] = useState();

  const isWatched = watched.map((movie) => movie.imdbID).includes(movieId)
  // console.log(isWatched, 'watched movie');
  const watchedUserRating = watched.find((movie) => movie.imdbID === movieId)?.userRating;
  useEffect(() => {
    function callBack(e) {
      if (e.key === 'Escape') {
        handleCloseMovieDetail();
      }
    }
    document.addEventListener('keydown', callBack);
    return () => {
      document.removeEventListener('keydown', callBack);
    }
  }, [])
  useEffect(() => {
    setIsLoading(true);
    async function getMovieDetailById() {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movieId}`
        );
        if (!response.ok) throw new Error('Something went wrong.');
        const data = await response.json();
        setMovieDetail(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetailById();
  }, [movieId]);

  useEffect(() => {
    if (movieDetail.Title) document.title = `Movie | ${movieDetail.Title}`
    return function () {
      document.title = 'Hamro Netflix';
    }
  }, [movieDetail])

  function handleOnAddWatchedMovie() {
    const newWatchedMovieObj = {
      imdbID: movieDetail.imdbID,
      Title: movieDetail.Title,
      Poster: movieDetail.Poster,
      imdbRating: Number(movieDetail.imdbRating),
      runtime: movieDetail.Runtime.split(' ').at(0),
      userRating,
    };
    onAddMovie(newWatchedMovieObj);
    handleCloseMovieDetail();
  }

  return (
    <div className="details"  >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovieDetail}>
              &larr;
            </button>
            <img
              src={movieDetail.Poster}
              alt={`This poster is for ${movieDetail.Title}`}
            />
            <div className="details-overview">
              <h1>{movieDetail.Title}</h1>
              <p>
                {movieDetail.Released} &bull; {movieDetail.Runtime}
              </p>
              <p>{movieDetail.Genre}</p>
              <p>
                <span>⭐️</span> {movieDetail.imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (<>
                <RatingStar setMovieRating={setuserRating} />
                {userRating ? <><button className="btn-add" onClick={handleOnAddWatchedMovie}>
                  + Add to list
                </button></> : ''}
              </>) : (<p>You have already rated this movie: {watchedUserRating}{''}
                <span>⭐️</span>
              </p>)}
            </div>
            <p>
              Plot: <em>{movieDetail.Plot}</em>
            </p>
            <p>
              Actor/Actress: <em>{movieDetail.Actors}</em>
            </p>
            <p>
              Directed By: <em>{movieDetail.Director}</em>
            </p>
          </section>
        </>
      )}
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Searchbar({ query, setQuery }) {
  useEffect(() => {
    const inputEl = document.querySelector('.search')
    inputEl.focus();
  }, [])
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

const MovieListBox = ({ children }) => {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? '–' : '+'}
      </button>
      {isOpen1 && children}
    </div>
  );
};

const WatchedMovieListBox = ({ children }) => {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && children}
    </div>
  );
};

function MovieList({ movies, onMovieSelect }) {
  return (
    <ul className="list list-movie">
      {movies?.map((movie) => (
        <MovieListItem
          movie={movie}
          key={movie.imdbID}
          onMovieSelect={onMovieSelect}
        />
      ))}
    </ul>
  );
}

function MovieListItem({ movie, onMovieSelect }) {
  return (
    <li onClick={() => onMovieSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>

    </li>
  );
}

const WatchedMovieList = ({ watched, onDeleteMovie }) => {
  return (
    <ul className="list">
      {watched.map((movie, index) => (
        <WatchedMovieListItem onDeleteMovie={onDeleteMovie} movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};

const WatchedMovieListItem = ({ movie, onDeleteMovie }) => {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button className='btn-delete' onClick={() => onDeleteMovie(movie.imdbID)}>X</button>
    </li>
  );
};

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
};
