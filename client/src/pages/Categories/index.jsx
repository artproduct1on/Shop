import { useParams } from "react-router-dom";
import RouteTracker from "../../components/RouteTracker";
import { useSelector } from "react-redux";
import { searchItemHelper } from "../../utils/helpers";

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
    <h1>Categories</h1>
  </>;
}

export default Categories;
