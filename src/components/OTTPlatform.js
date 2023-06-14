import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OTTPlatform.css';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';

const OTTPlatform = () => {
  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('trending');
  const [ setWatchlist] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bannerPoster, setBannerPoster] = useState('');
  const [showSignUpBox, setShowSignUpBox] = useState(false);
  
    const [selectedMovie, setSelectedMovie] = useState(null);

  


  useEffect(() => {
    const fetchBannerPoster = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: 'ace5fca28d2863ef4ca0375d8388c468',
          },
        });
        if (response.status === 200) {
          const randomIndex = Math.floor(Math.random() * response.data.results.length);
          const posterPath = response.data.results[randomIndex].poster_path;
          setBannerPoster(posterPath);
        }
      } catch (error) {
        console.error('Error fetching banner poster:', error);
      }
    };

    fetchBannerPoster();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: 'ace5fca28d2863ef4ca0375d8388c468',
          },
        });
        if (response.status === 200) {
          setMovies(response.data.results);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    const fetchTvSeries = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/tv/popular', {
          params: {
            api_key: 'ace5fca28d2863ef4ca0375d8388c468',
          },
        });
        if (response.status === 200) {
          setTvSeries(response.data.results);
        }
      } catch (error) {
        console.error('Error fetching TV series:', error);
      }
    };

    const fetchDocumentaries = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: 'ace5fca28d2863ef4ca0375d8388c468',
            with_genres: '99', // Genre ID for documentaries
            certification_country: 'US', // Change to your desired country if applicable
            certification: 'G', // Suitable certification for documentaries (e.g., 'G', 'PG')
          },
        });
        if (response.status === 200) {
          setDocumentaries(response.data.results);
        }
      } catch (error) {
        console.error('Error fetching documentaries:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: {
            api_key: 'ace5fca28d2863ef4ca0375d8388c468',
          },
        });
        if (response.status === 200) {
          setCategories(response.data.genres);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchMovies();
    fetchTvSeries();
    fetchDocumentaries();
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
          params: {
            api_key: 'ace5fca28d2863ef4ca0375d8388c468',
          },
        });
        if (response.status === 200) {
          setTrendingMovies(response.data.results);
        }
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleSignUpClick = () => {
    setShowSignUpBox(!showSignUpBox);
  };
  

  const handleAddToWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
  };

  const handleSearch = () => {
    // Perform search based on the searchQuery state
    console.log('Performing search for:', searchQuery);
  };
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  let content = null;

  
    switch (activeTab) {
      case 'movies':
        content = (
          <div>
            <h1>Movies</h1>
            <div className="movie-grid">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="movie-poster"
                  onClick={() => handleMovieClick(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className="movie-description">
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <button onClick={() => handleAddToWatchlist(movie)}>Add to Watchlist</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;
  

    case 'tvSeries':
      content = (
        <div>
          <h1>TV Series</h1>
          <div className="series-grid">
            {tvSeries.map((series) => (
              <div key={series.id} className="series-poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                  alt={series.name}
                />
                <div className="series-description">
                  <h2>{series.name}</h2>
                  <p>{series.overview}</p>
                  <button onClick={() => handleAddToWatchlist(series)}>Add to Watchlist</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      break;

    case 'documentaries':
      content = (
        <div>
          <h1>Documentaries</h1>
          <div className="documentary-grid">
            {documentaries.map((documentary) => (
              <div key={documentary.id} className="documentary-poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500${documentary.poster_path}`}
                  alt={documentary.title}
                />
                <div className="documentary-description">
                  <h2>{documentary.title}</h2>
                  <p>{documentary.overview}</p>
                  <button onClick={() => handleAddToWatchlist(documentary)}>
                    Add to Watchlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      break;

    case 'categories':
      content = (
        <div>
          <h1>Categories</h1>
          {Array.isArray(categories) ? (
            categories.map((category) => (
              <div key={category.id}>
                <h2>{category.name}</h2>
                {/* Render additional category details */}
              </div>
            ))
          ) : (
            <p>No categories found.</p>
          )}
        </div>
      );
      break;

    case 'trending':
      content = (
        <div>
          <h1>Trending Movies</h1>
          <div className="trending-grid">
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="trending-poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="trending-description">
                  <h2>{movie.title}</h2>
                  <p>{movie.overview}</p>
                  <button onClick={() => handleAddToWatchlist(movie)}>Add to Watchlist</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      break;

    default:
      content = null;
  }
  return (
    <div className="ott-platform">
         <MovieList handleMovieClick={handleMovieClick} />
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} handleAddToWatchlist={handleAddToWatchlist} />
      )}
      <div className="header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <button className="signup-button" onClick={handleSignUpClick}>
          Sign Up
        </button>
      </div>

      {showSignUpBox && (
        <div className="signup-box">
          <h2>Sign Up</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}
  
  
      

      <div className="tabs">
        <button
          className={activeTab === 'trending' ? 'active' : ''}
          onClick={() => handleTabClick('trending')}
        >
          Trending
        </button>
        <button
          className={activeTab === 'movies' ? 'active' : ''}
          onClick={() => handleTabClick('movies')}
        >
          Movies
        </button>
        <button
          className={activeTab === 'tvSeries' ? 'active' : ''}
          onClick={() => handleTabClick('tvSeries')}
        >
          TV Series
        </button>
        <button
          className={activeTab === 'documentaries' ? 'active' : ''}
          onClick={() => handleTabClick('documentaries')}
        >
          Documentaries
        </button>
        <button
          className={activeTab === 'categories' ? 'active' : ''}
          onClick={() => handleTabClick('categories')}
        >
          Categories
        </button>
      </div>
      <div className="banner">
        {bannerPoster && (
          <img className="banner-poster" src={`https://image.tmdb.org/t/p/w500${bannerPoster}`} alt="Banner Poster" />
        )}
        <div className="banner-overlay">
          <div className="banner-content">
            <h2 className="banner-title">{movies.length > 0 && movies[0].title}</h2>
            <p className="banner-description">{movies.length > 0 && movies[0].overview}</p>
            <div className="banner-buttons">
              <button>Play</button>
              <button>Share</button>
              <button onClick={() => handleAddToWatchlist(movies.length > 0 && movies[0])}>
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      


      <div className="content">{content}</div>
      <footer class="footer">
  <div class="footer-links">
    <div class="footer-column">
      <a href="https://www.example.com">About Us</a>
      <a href="https://www.example.com">Contact Us</a>
      <a href="https://www.example.com">Help Center</a>
      <a href="https://www.example.com">Career</a>
    </div>
    <div class="footer-column">
      <a href="https://www.example.com">Account</a>
      <a href="https://www.example.com">Manage Account</a>
      <a href="https://www.example.com">Buy Gift Card</a>
      <a href="https://www.example.com">Redeem Gift Card</a>
    </div>
    <div class="footer-column">
      <a href="https://www.example.com">Privacy</a>
      <a href="https://www.example.com">Terms and Conditions</a>
      <a href="https://www.example.com">Cookies</a>
      <a href="https://www.example.com">FAQ</a>
    </div>
  </div>
</footer>




    </div>
    </div>
 )} ;
;









export default OTTPlatform;