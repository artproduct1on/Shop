import s from "./s.module.scss";
import img from "../../assets/img/404.svg";
import Button from "../../components/UI/Button";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className={s.section}>
      <img
        className={s.images}
        src={img}
        alt="status 404"
      />

      <hgroup className={s.hgroup}>
        <h1 className={`section-title ${s.sectionTitle}`}>Page Not Found</h1>
        <p className={s.subTitle}>
          We’re sorry, the page you requested could not be found. <br />
          Please go back to the homepage.
        </p>
      </hgroup>

      <Button
        name="Go Home"
        to="/"
      />
    </section>
  );
}

export default NotFound;
