import clsx from "clsx";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../serviceAPI/tmdbApi";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { moviesId } = useParams();

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        setLoading(true);
        setError(false);
        const response = await getMovieReviews(moviesId);
        setReviews(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieReviews();
  }, [moviesId]);

  console.log(reviews);

  return (
    <>
      <ul className={css.list}>
        {reviews.length > 0 ? (
          reviews.map(list => (
            <li className={clsx(css.item)} key={list.id}>
              <h4 className={clsx(css.name)}>{list.author}</h4>
              <p className={clsx(css.text)}>{list.content}</p>
            </li>
          ))
        ) : (
          <li>
            <p className={clsx(css.textNotReviews)}>
              We don`t have any reviews for this movie.
            </p>
          </li>
        )}
      </ul>
      {isLoading && <Loader />}
      {error && <p>Something went wrong. Please, reload the page</p>}
    </>
  );
}
