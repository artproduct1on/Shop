import s from "./s.module.scss";
import { Link } from "react-router-dom";

function Button({
  to = null,
  type = "button",
  onClick,
  name,
  variant = "green",
}) {
  const className = `${s.button} ${variant === "green" ? s.green : s.white}`;

  if (to) return (
    <Link
      to={to}
      className={className}
      name={name}
      title={name}
    >
      {name}
    </Link>
  );

  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
      name={name}
      title={name}
    >
      {name}
    </button>
  );
}

export default Button; 
