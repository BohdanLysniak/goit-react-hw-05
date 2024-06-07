import clsx from "clsx";
import css from "./SearchMovies.module.css";
import { Field, Formik, Form } from "formik";
import toast from "react-hot-toast";

export default function SearchMovies({ onSubmit }) {
  const notifyEmpty = () =>
    toast.error("Please enter text", {
      position: "top-center"
    });

  const handleSearch = (values, actions) => {
    if (!values.movieTitle.trim()) return notifyEmpty();
    onSubmit(values.movieTitle);
    actions.resetForm();
  };

  return (
    <Formik initialValues={{ movieTitle: "" }} onSubmit={handleSearch}>
      <Form className={clsx(css.form)}>
        <Field
          name="movieTitle"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie..."
        />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}
