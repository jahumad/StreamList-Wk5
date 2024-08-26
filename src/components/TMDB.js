import React, { useState, useEffect } from 'react';

const TMDB = () => {
  const [movies, setMovies] = useState([]);

  // Pulls the API from TMDB
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7547c62f7b6684fa80439d75e1f90f72`);
      const data = await response.json();
      setMovies(data.results);
    };
  
    fetchMovies();
  }, []);

  // Displays the title, image, and info for each popular movie
  return (
    <div className="movie-container">
      <h1>Popular Movies</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
           
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TMDB;