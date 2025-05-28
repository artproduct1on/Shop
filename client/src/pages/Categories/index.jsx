import RouteTracker from "../../components/RouteTracker";
import CardCategory from "../../components/CardCategory";
import { useFetchData } from "../../hooks/useFetchData";
import { API_GET } from "../../utils/constants";
import Loader from "../../components/UI/Loader";
import s from "./s.module.scss";

function Categories() {

  const { data, error, loading } = useFetchData(API_GET.CATEGORIES + "all");

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
        loading ?
          <Loader />
          : error ?
            <h3>Error: {error}</h3>
            : data.map((card) => <CardCategory key={card.id} category={card} />)
      }
    </div>
  </>;
}

export default Categories;
