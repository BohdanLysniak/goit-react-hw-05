import clsx from "clsx";
import css from "./MovieList.module.css";

export default function MovieList({ moviesList }) {
  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
  return (
    <ul className={clsx(css.moviesList)}>
      {moviesList.map(({ id, title, vote_average, poster_path }) => {
        return (
          <li key={id}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : defaultImg
              }
              alt={title}
            />
            <h2>Rating: {vote_average}</h2>
          </li>
        );
      })}
    </ul>
  );
}
