import { Link } from "react-router-dom";
import s from "./s.module.scss";

function LinkPages({
  to,
  title = "",
  className = "",
}) {
  return (
    <Link
      to={to}
      className={`${s.link} ${className}`}
    >
      {title}
    </Link>
  );
}
export default LinkPages;
