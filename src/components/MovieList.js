import React from 'react';
import MovieData from './MovieData';

const MovieList = ({ handleMovieClick }) => {
  return (
    <div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {MovieData.map((movie) => (
          <li
            key={movie.id}
            onClick={() => handleMovieClick(movie)}
            style={{ cursor: 'pointer' }}
          >
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
