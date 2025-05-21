import React from "react";
import { Link } from "react-router-dom";
import s from "./s.module.scss";

function CardCategory({category}) {
  return (
    <Link
      to={`/categories/${category.id}`}
      key={category.id}
      className={s.card}
    >
      <img
        src={category.image}
        alt={category.title}
        className={s.img}
      />
      <p className={s.title}>{category.title}</p>
    </Link>
  );
}

export default CardCategory;
