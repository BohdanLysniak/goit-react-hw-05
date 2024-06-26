import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesByQuery } from "../../serviceAPI/tmdbApi";
import SearchMovies from "../../components/SearchMovies/SearchMovies";
import MovieList from "../../components/MovieList/MovieList";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Loader from "../../components/Loader/Loader";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import css from "./MoviesPage.module.css";
import clsx from "clsx";

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
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoviesByQuery();
  }, [movieTitle]);

  return (
    <div className={clsx(css.MoviePageWrapper)}>
      <Toaster />
      <SearchMovies onSubmit={handleSubmit} />
      {movies.length > 0 && <MovieList moviesList={movies} />}
      {isLoading && <Loader />}
      {error && <NotFoundPage />}
    </div>
  );
}
