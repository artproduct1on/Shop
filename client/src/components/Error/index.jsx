import Button from "../UI/Button";
import s from "./s.module.scss";
function Error({ error, className = ""}) {

  return (
    <section
      className={`${s.errorSection} ${className}`}
    >
      <h2 className={`section-title ${s.errorTitle}`}>Error</h2>
      <p className={s.errorText}>{error}</p>
      <Button
        name="Reload page"
        onClick={() => window.location.reload()}
      />
    </section>
  );
}

export default Error;
