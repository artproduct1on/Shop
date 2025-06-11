import Button from "../UI/Button";
import s from "./s.module.scss";
function Errors( { error } ) {

  return (
    <section 
      className={s.errorSection}
    >
      <h2>Error</h2>
      <p>{error}</p>
      <Button
        name="Go Home"
        to="/"
      ></Button>
    </section>
  );
}

export default Errors;
