import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import { getMoviesByQuery } from "../../serviceAPI/tmdbApi";
import SearchMovies from "../../components/SearchMovies/SearchMovies";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  // const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = event => {
    event.preventDefault();
    setQuery("");
  };

  console.log(movies);

  useEffect(() => {
    async function fetchMoviesByQuery() {
      try {
        const { results } = await getMoviesByQuery();
        setMovies(results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMoviesByQuery();
  }, []);
  return (
    <div>
      <SearchMovies value={query} onChange={setQuery} onSubmit={handleSubmit} />
      {movies.length > 0 && <MovieList moviesList={movies} />}
    </div>
  );
}
