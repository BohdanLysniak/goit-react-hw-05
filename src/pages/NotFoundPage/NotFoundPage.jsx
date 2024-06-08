import clsx from "clsx";
import css from "../NotFoundPage/NotFoundPage.module.css";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className={clsx(css.errorPageWrapper)}>
      <p className={clsx(css.text)}>
        Page not found. Please, go to
        <br />
        <Link to="/" className={clsx(css.linkHome)}>
          Home page
        </Link>
      </p>
    </div>
  );
}
