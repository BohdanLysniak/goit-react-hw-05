import clsx from "clsx";
import css from "./SearchMovies.module.css";

export default function SearchMovies(e) {
  return (
    <form onSubmit={} className={clsx(css.form)}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        autoComplete="off"
        autoFocus
        placeholder="Search movie..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
