import s from "./s.module.scss";
import { useParams } from "react-router-dom";
import { API_GET } from "../../utils/constants";
import Loader from "../../components/UI/Loader";
import RouteTracker from "../../components/RouteTracker";
import { useFetchData } from "../../hooks/useFetchData";

function Product() {
  const { productId } = useParams();

  const { data: {
    product,
    category
  }, loading, error } = useFetchData(API_GET.PRODUCTS + productId);

  if (loading) return <Loader />;
  if (!product) return <h2>Have not a product!</h2>;

  const pathArray = [
    {
      link: "/categories",
      title: "Categories",
    },
    {
      link: "/categories/" + product.categoryId,
      title: category.title,
    },
    {
      link: "",
      title: product.title,
    },
  ];

  console.log(product);

  return <>
    <RouteTracker pathArray={pathArray} />

    <section className={s.section}>
      <h1 className={`section-title ${s.titel}`}>{product.title}</h1>
      <img
        src={product.image}
        alt="Image of Product"
      />
      <p>{product.description}</p>
    </section>
  </>;

}

export default Product;

