import { useEffect, useState } from "react";
import { getMovies } from "../../serviceAPI/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoadig] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoadig(true);
        setError(false);
        const { results } = await getMovies();
        setMovies(results);
        console.log(results);
      } catch (error) {
        setError(true);
      } finally {
        setLoadig(false);
      }
    }
    fetchMovies();
  }, []);
  return (
    <div className="">
      <h1>Trending movies today!</h1>
      {isLoading && <Loader />}
      {error && <p>Something went wrong. Pleas reload the page</p>}
      {movies.length > 0 && <MovieList moviesList={movies} />}
    </div>
  );
}
