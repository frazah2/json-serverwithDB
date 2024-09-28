import React, { useEffect, useState } from 'react';
import './Movie.css';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedActor, setSelectedActor] = useState(null);

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/movies');
        const moviesData = await response.json();
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Fetch actors
  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await fetch('http://localhost:5000/actors');
        const actorsData = await response.json();
        setActors(actorsData);
      } catch (error) {
        console.error('Error fetching actors:', error);
      }
    };

    fetchActors();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setSelectedActor(null);
  };

  const handleActorClick = (actor) => {
    setSelectedActor(actor);
  };

  const renderActors = (movie) => {
    return movie.actorIds.map((actorId) => {
      const actor = actors.find((a) => a.id === actorId);
      if (actor) {
        return (
          <li key={actor.id} onClick={() => handleActorClick(actor)} className="actor-item">
            {actor.name}
          </li>
        );
      }
      return null;
    });
  };

  const renderMovies = () => {
    return movies.map((movie) => (
      <li key={movie.id} onClick={() => handleMovieClick(movie)} className="movie-item">
        {movie.title}
      </li>
    ));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Movie Browser</h1>
      <ul className="movie-list">{renderMovies()}</ul>

      {selectedMovie && (
        <div className="actor-section">
          <h2>Actors in {selectedMovie.title}</h2>
          <ul className="actor-list">{renderActors(selectedMovie)}</ul>
        </div>
      )}

      {selectedActor && (
        <div className="movie-section">
          <h2>Movies with {selectedActor.name}</h2>
          <ul className="movie-list">
            {selectedActor.movieIds.map((movieId) => {
              const movie = movies.find((m) => m.id === movieId);
              return <li key={movie.id} className="movie-item">{movie.title}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Movie;
