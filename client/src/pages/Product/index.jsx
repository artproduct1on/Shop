import Button from "../../components/UI/Button";
import s from "./s.module.scss";
import { useParams } from "react-router-dom";
import { API_GET } from "../../utils/constants";
import Loader from "../../components/UI/Loader";
import RouteTracker from "../../components/RouteTracker";
import { useFetchData } from "../../hooks/useFetchData";
import QuantityInput from "../../components/UI/QuantityInput";
import Badge from "../../components/UI/Badge";
import Price from "../../components/UI/Price";
import ExpandableText from "../../components/ExpandableText";
import { addToCart } from "../../redux/slices/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

function Product() {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { productId } = useParams();
  const { data, loading, error } = useFetchData(API_GET.PRODUCTS + productId, true);

  if (loading || !data.product) return <Loader />;

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

  function onQuantityChange(num) {
    setQuantity(prev => prev + num);
  };

  function onAddToCart() {
    dispatch(addToCart({ ...product, quantity: quantity }));
    setQuantity(1);
  };

  return <>
    <RouteTracker pathArray={pathArray} />

    <section className={s.section}>
      <h1 className={s.title}>{product.title}</h1>
      <img
        className={s.img}
        src={product.image}
        alt="Image of Product"
      />

      <div className={s.actions}>
        <div className={s.actionsInfo}>
          <Price
            className={s.actionsPrice}
            price={product.price * quantity}
            discont={product.discont_price * quantity}
            variant="medium"
          />
          <Badge
            className={s.actionsBadge}
            price={product.price}
            discont={product.discont_price}
          />
        </div>
        <QuantityInput
          className={s.actionsQuantity}
          value={quantity}
          onQuantityChange={onQuantityChange}
        />
        <Button
          className={s.actionsButton}
          name="Add to cart"
          onClick={onAddToCart}
        />
      </div>
      <ExpandableText
        title="Description"
        text={product.description}
        maxLength={400}
        className={s.discription}
      />

    </section>
  </>;

}

export default Product;

