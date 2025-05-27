import s from "./s.module.scss";
import { Link } from "react-router-dom";

function Button({
  to = null,
  type = "button",
  onClick,
  name,
  variant = "green",
  className
}) {
  const variantClass =
    `${s.button} ${variant === "green"
      ? s.green : variant === "orange"
        ? s.orange : s.white} ${className}`;

  if (to) return (
    <Link
      to={to}
      className={variantClass}
      name={name}
      title={name}
    >
      {name}
    </Link>
  );

  return (
    <button
      onClick={onClick}
      className={variantClass}
      type={type}
      name={name}
      title={name}
    >
      {name}
    </button>
  );
}

export default Button; 
