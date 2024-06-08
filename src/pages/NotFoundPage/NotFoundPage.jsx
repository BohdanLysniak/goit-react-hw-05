import clsx from "clsx";
import css from "../NotFoundPage/NotFoundPage.module.css";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className={clsx(css.errorPageWrapper)}>
      <p>
        Page not found. Please, go to <Link to="/">Home page</Link>{" "}
      </p>
    </div>
  );
}
