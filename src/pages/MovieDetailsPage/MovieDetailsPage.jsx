import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../serviceAPI/tmdbApi";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        if (!id) return;
        setError(false);
        setLoading(true);
        const dataMoviesDetails = await getMovieDetails(id);
        setMovieDetails(dataMoviesDetails);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(true);
      }
    }
    fetchMovieDetails();
  }, [id]);

  console.log(movieDetails);

  return ( {movieDetails && (    <section className={clsx(css.sectionMovieDetails)}>
      <button className={clsx(css.btnGoBack)}>Go Back</button>
      <div className={clsx(css.wrapperCard)}>
        <img className={clsx(css.imageCard)} />
        <h2 className={clsx(css.titleMovie)}>{movieDetails.title}</h2>
        <p className={clsx(css.rateMovie)}>{movieDetails.vote_average}</p>
        <h3 className={clsx(css.overviewMovie)}>Overview</h3>
        <p className={clsx(css.overviewText)}>{movieDetails.overview}</p>
        <h4 className={clsx(css.genres)}></h4>
        <p className={clsx(css.genrexText)}></p>
      </div>
    </section>)}
  );
}
