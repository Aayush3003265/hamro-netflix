// import { Children, useEffect, useState } from "react";
// import RatingStar from "./RatingStar";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     // Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


// export default function App() {
//   const [movies, setMovies] = useState([]);
//   const [query, setQuery] = useState("");
//   const [isLoading, setisLoading] = useState(false)
//   // const [watched, setWatched] = useState(tempWatchedData)
//   const omdb_api_key = 'd2d20cf3'
//   // const movie_Name = 'Batman'

//   useEffect(() => {
//     const MovieName = async () => {
//       try {
//         setisLoading(true)
//         const movies = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${omdb_api_key}&s=${query}`)
//         const movieData = await movies.json()
//         if (!movieData.Search) throw new Error('MOVIE NOT FOUND')
//         setMovies(movieData.Search)
//         console.log(movieData.Search);
//         setisLoading(false)
//       } catch (err) {
//         console.log(err, 'error ');
//       }
//     }
//     MovieName()
//   }, [query])


//   return (
//     <>
//       <NavBar>
//         <Logo />
//         <SearchBar query={query} setQuery={setQuery} />
//         <MovieResultLength movies={movies} />
//       </NavBar>
//       <Main >
//         <MovieListBox movies={movies}>
//           <MovieListItem2 movies={movies} />
//         </MovieListBox>
//         <Box />
//       </Main>

//     </>
//   );
// }
// const NavBar = ({ children }) => {
//   return (
//     <>
//       <nav className="nav-bar">
//         {children}
//       </nav>
//     </>
//   )
// }

// const Logo = () => {
//   return (
//     <>
//       <div className="logo">
//         <span role="img">🍿</span>
//         <h1>usePopcorn</h1>
//       </div>
//     </>
//   )
// }

// const SearchBar = ({ query, setQuery }) => {
//   return (
//     <>
//       <input
//         className="search"
//         type="text"
//         placeholder="Search movies..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//     </>
//   )
// }
// function MovieResultLength({ movies }) {
//   return (
//     <>
//       <p className="num-results">
//         Found <strong>{movies.length}</strong> results
//       </p>
//     </>
//   )
// }

// const Main = ({ children }) => {
//   return (
//     <>
//       <main className="main">
//         {children}
//       </main>
//     </>
//   )
// }

// //left
// const MovieListBox = ({ children }) => {
//   const [isOpen1, setIsOpen1] = useState(true);

//   return (
//     <>
//       <div className="box">
//         <button
//           className="btn-toggle"
//           onClick={() => setIsOpen1((open) => !open)}
//         >
//           {isOpen1 ? "–" : "+"}
//         </button>
//         {isOpen1 && (
//           { children }
//         )}
//       </div>
//     </>
//   )
// }

// const MovieListItem2 = ({ movies }) => {
//   return (
//     <>
//       <ul className="list">
//         {movies?.map((movie) => (
//           <li key={movie.imdbID}>
//             <img src={movie.Poster} alt={`${movie.Title} poster`} />
//             <h3>{movie.Title}</h3>
//             <div>
//               <p>
//                 <span>🗓</span>
//                 <span>{movie.Year}</span>
//               </p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </>
//   )
// }

// const Box = () => {
//   const [isOpen2, setIsOpen2] = useState(true);
//   const [watched, setWatched] = useState(tempWatchedData);
//   return (
//     <>
//       <div className="box">
//         <button
//           className="btn-toggle"
//           onClick={() => setIsOpen2((open) => !open)}
//         >
//           {isOpen2 ? "–" : "+"}
//         </button>
//         {isOpen2 && (
//           <>
//             <WatchSummary watched={watched} />
//             <List watched={watched} />
//           </>
//         )}
//       </div>
//     </>
//   )
// }
// const WatchSummary = ({ watched }) => {
//   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
//   const avgUserRating = average(watched.map((movie) => movie.userRating));
//   const avgRuntime = average(watched.map((movie) => movie.runtime));
//   return (
//     <>
//       <div className="summary">
//         <h2>Movies you watched</h2>
//         <div>
//           <p>
//             <span>#️⃣</span>
//             <span>{watched.length} movies</span>
//           </p>
//           <p>
//             <span>⭐️</span>
//             <span>{avgImdbRating}</span>
//           </p>
//           <p>
//             <span>🌟</span>
//             <span>{avgUserRating}</span>
//           </p>
//           <p>
//             <span>⏳</span>
//             <span>{avgRuntime} min</span>
//           </p>
//         </div>
//       </div>
//     </>
//   )
// }

// const List = ({ watched }) => {
//   return (
//     <>
//       <ul className="list">
//         {watched.map((movie) => (
//           <MovieListItem key={movie.imdbID} movie={movie} />
//         ))}
//       </ul>
//     </>
//   )
// }

// const MovieListItem = ({ movie }) => {
//   return (
//     <>
//       <li>
//         <img src={movie.Poster} alt={`${movie.Title} poster`} />
//         <h3>{movie.Title}</h3>
//         <div>
//           <p>
//             <span>⭐️</span>
//             <span>{movie.imdbRating}</span>
//           </p>
//           <p>
//             <span>🌟</span>
//             <span>{movie.userRating}</span>
//           </p>
//           <p>
//             <span>⏳</span>
//             <span>{movie.runtime} min</span>
//           </p>
//         </div>
//       </li>
//     </>
//   )
// }