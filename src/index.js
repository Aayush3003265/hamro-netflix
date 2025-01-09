import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import RatingStar from "./RatingStar";
import Accordionn from "./accordion"

const Test = () => {
  const [movieRating, setMovieRating] = useState(0)
  return (
    <div>
      <RatingStar
        color={'blue'}
        size={32}
        MaxRating={10}
        setMovieRating={setMovieRating} />
      {/* <RatingStar setMovieRating={setMovieRating} /> */}
      <h1>this movie is {movieRating} rated</h1>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Accordionn /> */}
    <App />
    {/* <RatingStar color={'red'} size={32} /> */}
    {/* <Test /> */}
    {/* <RatingStar /> */}
    {/* <RatingStar color={'#ffc419'} size={64} MaxRating={25} />  */}
  </React.StrictMode>
);


