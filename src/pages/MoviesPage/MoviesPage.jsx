import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import { getMoviesByQuery } from "../../serviceAPI/tmdbApi";
import SearchMovies from "../../components/SearchMovies/SearchMovies";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieTitle = searchParams.get("movieTitle") && "";

  const changeMovieTitle = newMovieTitle => {
    searchParams.set("movieTitle", newMovieTitle);
    setSearchParams(searchParams);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setMovies("");
  };

  console.log(movies);

  useEffect(() => {
    async function fetchMoviesByQuery() {
      try {
        const { results } = await getMoviesByQuery(searchParams);
        setMovies(results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMoviesByQuery();
  }, [searchParams]);

  return (
    <div>
      <SearchMovies
        value={movieTitle}
        onChange={changeMovieTitle}
        onSubmit={handleSubmit}
      />
      {movies.length > 0 && <MovieList moviesList={movies} />}
    </div>
  );
}
