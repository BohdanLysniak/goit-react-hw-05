import clsx from "clsx";
import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ moviesList }) {
  const location = useLocation();

  const defaultImg = "https://stock.adobe.com/ua/search?k=default";
  return (
    <ul className={clsx(css.moviesList)}>
      {moviesList.map(
        ({ id, title, vote_average, poster_path, release_date }) => {
          return (
            <li className={clsx(css.moviesItem)} key={id}>
              <Link to={`/movies/${id}`} state={location}>
                <img
                  className={clsx(css.moviesImage)}
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w500${poster_path}`
                      : defaultImg
                  }
                  alt={title}
                />
                <h2 className={clsx(css.title)}>
                  Rating: {Math.ceil(vote_average)}
                </h2>
                <p className={clsx(css.dateText)}>
                  Release date:<br></br>
                  {release_date}
                </p>
              </Link>
            </li>
          );
        }
      )}
    </ul>
  );
}
