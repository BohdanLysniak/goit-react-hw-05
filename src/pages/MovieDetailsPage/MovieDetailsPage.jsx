import clsx from "clsx";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getMovieDetails } from "../../serviceAPI/tmdbApi";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const defaultImg = "https://stock.adobe.com/ua/search?k=default";

  const { moviesId } = useParams();

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        if (!moviesId) return;
        setError(false);
        setLoading(true);
        const dataMoviesDetails = await getMovieDetails(moviesId);
        setMovieDetails(dataMoviesDetails);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetails();
  }, [moviesId]);

  console.log(movieDetails);

  return (
    <>
      {movieDetails && (
        <section className={clsx(css.sectionMovieDetails)}>
          <button className={clsx(css.btnGoBack)}>Go Back</button>
          <div className={clsx(css.wrapperCard)}>
            <img
              className={clsx(css.imageCard)}
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                  : defaultImg
              }
              alt={movieDetails.title}
            />
            <h2 className={clsx(css.titleMovie)}>{movieDetails.title}</h2>
            <p className={clsx(css.rateMovie)}>
              User score: {Math.floor((movieDetails.vote_average * 100) / 10)}%
            </p>
            <h3 className={clsx(css.overviewMovie)}>Overview</h3>
            <p className={clsx(css.overviewText)}>{movieDetails.overview}</p>
            <h4 className={clsx(css.genres)}></h4>
            <p className={clsx(css.genrexText)}></p>
          </div>
        </section>
      )}
      {isLoading && <Loader />}
      {error && <p>Something went wrong. Please, reload the page</p>}

      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
}
