import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <p>
        Page not found. Please, go to <Link to="/">Home page</Link>{" "}
      </p>
    </>
  );
}
