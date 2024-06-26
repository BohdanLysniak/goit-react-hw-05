import clsx from "clsx";
import { useEffect, useState } from "react";
import { getMovies } from "../../serviceAPI/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(false);
        const { results } = await getMovies();
        setMovies(results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);
  return (
    <div className={clsx(css.homePageWrapper)}>
      <h1 className={clsx(css.title)}>Trending movies today!</h1>
      {error && <NotFoundPage />}
      {movies.length > 0 && <MovieList moviesList={movies} />}
      {isLoading && <Loader />}
    </div>
  );
}
