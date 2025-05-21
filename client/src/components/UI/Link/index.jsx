import React from "react";
import { Link } from "react-router-dom";
import s from "./s.module.scss";

function LinkPages({ link, nameLink }) {
  return (
    <Link to={link} className={s.link}>{nameLink} 
    </Link>
  );
}
export default LinkPages;
