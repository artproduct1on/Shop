import React from "react";
import CardCategory from "../../components/CardCategory";
import { useSelector } from "react-redux";
import Loader from "../../components/UI/Loader";
import s from "./s.module.scss";
function Categories() {
  const {
    categories: { data: categories, status: categoryStatus, error: categoryError },
  } = useSelector((state) => state.global);

  ;
  return (
    <>
     
      <div className={s.cardsContainer}>
        <h2 className={`section-title ${s.categoriesTitle}`}>Categories</h2>
        {
          categoryStatus === "idle" ||
              categoryStatus === "loading" ?
            <Loader />
            : categoryStatus === "failed" ?
              <h3>Error: {categoryError}</h3>
              : categories.map((card) => <CardCategory key={card.id} category={card} />)
        }
      </div>
    </>
  );
}

export default Categories;
