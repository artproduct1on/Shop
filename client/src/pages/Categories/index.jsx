import RouteTracker from "../../components/RouteTracker";
import { useSelector } from "react-redux";
import CardCategory from "../../components/CardCategory";
import Loader from "../../components/UI/Loader";
import s from "./s.module.scss"; 

function Categories() {

  const {
    categories: { data: dataCategories, status: categoryStatus, error: categoryError },
  } = useSelector((state) => state.global);

  const pathArray = [
    {
      link: "",
      title: "Categories",
    },
  ];

  return <>
    <RouteTracker pathArray={pathArray} />
    <div className={s.cardsContainer}>
      <h2 className={`section-title ${s.categoriesTitle}`}>Categories</h2>
      {
        categoryStatus === "idle" ||
              categoryStatus === "loading" ?
          <Loader />
          : categoryStatus === "failed" ?
            <h3>Error: {categoryError}</h3>
            : dataCategories.map((card) => <CardCategory key={card.id} category={card} />)
      }
    </div>
  </>;
}

export default Categories;
