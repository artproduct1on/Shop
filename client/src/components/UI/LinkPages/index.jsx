import { Link } from "react-router-dom";
import s from "./s.module.scss";

function LinkPages({
  to,
  title = "",
  className = "",
  devider = false
}) {

  return <div className={`${s.container} ${className}`}>
    {devider && <hr className={s.sectionCardsDivider} />}
    <Link
      to={to}
      className={`${s.link} ${!to && s.disabled}`}
    >
      {title}
    </Link>
  </div>;
}
export default LinkPages;
