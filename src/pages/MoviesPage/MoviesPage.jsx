import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesByQuery } from "../../serviceAPI/tmdbApi";
import SearchMovies from "../../components/SearchMovies/SearchMovies";
import MovieList from "../../components/MovieList/MovieList";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Loader from "../../components/Loader/Loader";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieTitle = searchParams.get("movieTitle") ?? "";

  const notifyEmpty = () =>
    toast.error("There are no results for your request", {
      position: "top-center"
    });

  const handleSubmit = newMovieTitle => {
    searchParams.set("movieTitle", newMovieTitle);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (movieTitle === "") return;
    async function fetchMoviesByQuery() {
      try {
        setError(false);
        setIsLoading(true);
        const { results } = await getMoviesByQuery(movieTitle);
        if (results.length === 0) {
          setMovies([]);
          notifyEmpty();
        }
        setMovies(results);
        console.log(results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoviesByQuery();
  }, [movieTitle]);

  return (
    <div>
      <Toaster />
      {isLoading && <Loader />}
      {error && <NotFoundPage />}
      <SearchMovies onSubmit={handleSubmit} />
      {movies.length > 0 && <MovieList moviesList={movies} />}
    </div>
  );
}
