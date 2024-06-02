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
  return (
    <section className={clsx(css.sectionMovieDetails)}>
      <button className={clsx(css.btnGoBack)}>Go Back</button>
      <div className={clsx(css.wrapperCard)}>
        <img className={clsx(css.imageCard)} />
        <h2 className={clsx(css.titleMovie)}></h2>
        <p className={clsx(css.rateMovie)}></p>
        <h3 className={clsx(css.overviewMovie)}></h3>
        <p className={clsx(css.overviewText)}></p>
        <h4 className={clsx(css.genres)}></h4>
        <p className={clsx(css.genrexText)}></p>
      </div>
    </section>
  );
}
