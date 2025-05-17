import s from "./s.module.scss";
import { Link } from "react-router-dom";

function Button({
  to = null,
  type = "button",
  onClick,
  name,
}) {

  if (to) return (
    <Link
      to={to}
      className={s.button}
      name={name}
      title={name}
    >
      {name}
    </Link>
  );

  return (
    <button
      onClick={onClick}
      className={s.button}
      type={type}
      name={name}
      title={name}
    >
      {name}
    </button>
  );
}

export default Button;
