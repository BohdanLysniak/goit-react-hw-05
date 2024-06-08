import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={clsx(css.navigation)}>
        <ul className={clsx(css.list)}>
          <li className={clsx(css.item)}>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return clsx(css.link, isActive && css.active);
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) => {
                return clsx(css.link, isActive && css.active);
              }}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
