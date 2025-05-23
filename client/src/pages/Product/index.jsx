import { useParams } from "react-router-dom";
import RouteTracker from "../../components/RouteTracker";
import { useSelector } from "react-redux";
import { searchItemHelper } from "../../utils/helpers";

function Product() {
  const {
    categories: { data: dataCategories, status: categoryStatus, error: categoryError },
    products: { data: dataProducts, status: productsStatus, error: productsError },
  } = useSelector((state) => state.global);

  const params = useParams();

  const targetProduct = searchItemHelper(dataProducts, params.id);
  const targetCategory = searchItemHelper(dataCategories, targetProduct.categoryId);

  const pathArray = [
    {
      link: "/categories",
      title: "Categories",
    },
    {
      link: "/categories/" + params.id,
      title: targetCategory.title,
    },
    {
      link: "",
      title: targetProduct.title,
    },
  ];

  return <>
    <RouteTracker pathArray={pathArray} />
    <h1>Product</h1>
  </>;
}

export default Product;
