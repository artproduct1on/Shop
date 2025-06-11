import Button from "../UI/Button";
import s from "./s.module.scss";
function Error({ error }) {

  return (
    <section
      className={s.errorSection}
    >
      <h2>Error</h2>
      <p>{error}</p>
      <Button
        name="Go Home"
        onClick={() => window.location.reload()}
      />
    </section>
  );
}

export default Error;
