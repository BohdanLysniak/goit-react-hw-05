import clsx from "clsx";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams
} from "react-router-dom";
import { getMovieDetails } from "../../serviceAPI/tmdbApi";
import Loader from "../../components/Loader/Loader";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const defaultImg = "https://stock.adobe.com/ua/search?k=default";

  const { moviesId } = useParams();

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

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

  return (
    <>
      {movieDetails && (
        <section className={clsx(css.sectionMovieDetails)}>
          <div className={clsx(css.wrapperImage)}>
            <img
              className={clsx(css.imageCard)}
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                  : defaultImg
              }
              alt={movieDetails.title}
              width="320"
            />
          </div>
          <div className={clsx(css.description)}>
            <h2 className={clsx(css.titleMovie)}>{movieDetails.title}</h2>
            <p className={clsx(css.rateMovie)}>
              User score: {Math.floor((movieDetails.vote_average * 100) / 10)}%
            </p>
            <h3 className={clsx(css.overviewMovie)}>Overview:</h3>
            <p className={clsx(css.overviewText)}>{movieDetails.overview}</p>
            <h4 className={clsx(css.genres)}></h4>
            <p className={clsx(css.genrexText)}></p>

            <ul className={clsx(css.listCastAndRewievs)}>
              <li className={clsx(css.link)}>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
              <li className={clsx(css.link)}>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li className={clsx(css.link)}>
                <Link to={backLinkRef.current}>Go back</Link>
              </li>
            </ul>

            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </section>
      )}
      {isLoading && <Loader />}
      {error && <NotFoundPage />}
    </>
  );
}
