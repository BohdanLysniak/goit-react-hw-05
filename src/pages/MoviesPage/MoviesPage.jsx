import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesByQuery } from "../../serviceAPI/tmdbApi";
import SearchMovies from "../../components/SearchMovies/SearchMovies";
import MovieList from "../../components/MovieList/MovieList";
import { Toaster } from "react-hot-toast";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieTitle = searchParams.get("movieTitle") ?? "";

  const handleSubmit = newMovieTitle => {
    searchParams.set("movieTitle", newMovieTitle);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    async function fetchMoviesByQuery() {
      try {
        const { results } = await getMoviesByQuery(movieTitle);
        setMovies(results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMoviesByQuery();
  }, [movieTitle]);

  console.log(movieTitle);

  return (
    <div>
      <Toaster />
      <SearchMovies onSubmit={handleSubmit} />
      {movies.length > 0 && <MovieList moviesList={movies} />}
    </div>
  );
}
