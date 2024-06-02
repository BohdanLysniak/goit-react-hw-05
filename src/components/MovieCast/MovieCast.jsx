import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../serviceAPI/tmdbApi";
import css from "./MovieCast.module.css";
import Loader from "../Loader/Loader";

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { moviesId } = useParams();

  const defaultImg = "https://stock.adobe.com/ua/search?k=default";

  useEffect(() => {
    async function fetchCast() {
      try {
        setLoading(true);
        setError(false);
        const results = await getMovieCast(moviesId);
        setCast(results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCast();
  }, [moviesId]);

  return (
    <>
      <ul className={clsx(css.list)}>
        {cast.length > 0 &&
          cast.map(list => (
            <li className={clsx(css.item)} key={list.id}>
              <img
                className={clsx(css.img)}
                src={
                  list.profile_path
                    ? `https://image.tmdb.org/t/p/w500${list.profile_path}`
                    : defaultImg
                }
                alt={list.name}
              />
              <h4 className={clsx(css.name)}>{list.name}</h4>
              {list.character && (
                <p className={clsx(css.descr)}>as {list.character}</p>
              )}
            </li>
          ))}
      </ul>
      {isLoading && <Loader />}
      {error && <p>Something went wrong. Please, reload the page</p>}
    </>
  );
}
