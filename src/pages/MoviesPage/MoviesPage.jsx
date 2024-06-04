import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesByQuery } from "../../serviceAPI/tmdbApi";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function fetchMoviesByQuery() {
      try {
        const response = await getMoviesByQuery();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMoviesByQuery();
  }, []);
  return <div></div>;
}
