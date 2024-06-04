import clsx from "clsx";
import css from "./SearchMovies.module.css";

export default function SearchMovies({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={clsx(css.form)}>
      <input
        name="search"
        type="text"
        value={value}
        onChange={event => onChange(event.target.value)}
        autoComplete="off"
        autoFocus
        placeholder="Search movie..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
