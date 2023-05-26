import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './MovieDetails.css';

const MovieDetails = ({ movie, handleAddToWatchlist }) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [videoKey, setVideoKey] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=ace5fca28d2863ef4ca0375d8388c468`
        );
        setSimilarMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching similar movies:', error);
      }
    };

    const fetchMovieVideos = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=ace5fca28d2863ef4ca0375d8388c468`
        );
        const videos = response.data.results;
        const firstVideo = videos.find((video) => video.type === 'Trailer');
        if (firstVideo) {
          setVideoKey(firstVideo.key);
        }
      } catch (error) {
        console.error('Error fetching movie videos:', error);
      }
    };

    fetchSimilarMovies();
    fetchMovieVideos();

    // Scroll to top when the component is rendered
    window.scrollTo(0, 0);
  }, [movie.id]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="movie-details">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-description">
          <h3 className="movie-title">{movie.title}</h3>
          <p>{movie.overview}</p>
          <div className="movie-buttons">
            <button style={{ marginRight: '10px' }}>Play</button>
            <button style={{ marginRight: '10px' }}>Share</button>
            <button onClick={() => handleAddToWatchlist(movie)}>Add to Watchlist</button>
          </div>
        </div>
      </div>
  
      <div className="similar-movies">
        {similarMovies.map((similarMovie) => (
          <div key={similarMovie.id} className="similar-movie">
            <img
              src={`https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`}
              alt={similarMovie.title}
              className="similar-movie-image"
            />
            <p>{similarMovie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
        }  
export default MovieDetails;
