import s from "./s.module.scss";
import { Fragment } from "react";
import LinkPages from "../UI/LinkPages";

function RouteTracker({ pathArray = [] }) {

  return (
    <nav className={s.nav}>
      <LinkPages
        to="/"
        title="Main Page"
      />
      {
        pathArray.length > 0 &&
        pathArray.map(i => (
          <Fragment key={i.link}>
            <hr className={s.hr} />
            <LinkPages
              to={i.link !== "" && i.link}
              title={i.title}
            />
          </Fragment>
        ))
      }
    </nav>
  );
}

export default RouteTracker;
