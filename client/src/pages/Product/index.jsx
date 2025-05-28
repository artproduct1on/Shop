import Button from "../../components/UI/Button";
import s from "./s.module.scss";
import { redirect, useParams } from "react-router-dom";
import { API_GET } from "../../utils/constants";
import Loader from "../../components/UI/Loader";
import RouteTracker from "../../components/RouteTracker";
import { useFetchData } from "../../hooks/useFetchData";
import QuantityInput from "../../components/UI/QuantityInput";

function Product() {
  const { productId } = useParams();

  const { data, loading, error } = useFetchData(API_GET.PRODUCTS + productId, true);

  if (loading) return <Loader />;
  if (!data.product) return <h2>Have not a product!</h2>;

  const { product } = data;

  const pathArray = [
    {
      link: "/categories",
      title: "Categories",
    },
    {
      link: "/categories/" + product.categoryId,
      title: data.category.title,
    },
    {
      link: "",
      title: product.title,
    },
  ];

  return <>
    <RouteTracker pathArray={pathArray} />

    <section className={s.section}>
      <h1 className={`section-title ${s.titel}`}>{product.title}</h1>
      <img
        src={product.image}
        alt="Image of Product"
      />
      <QuantityInput className={s.quantity} />
      <Button name={"lol"} onClick={{}} />
      <h2 className={s.descriptionTitle}>{product.title}</h2>
      <p className={s.descriptionText}>{product.description}</p>
      <button>Read more</button>

    </section>
  </>;

}

export default Product;

