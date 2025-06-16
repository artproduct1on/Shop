import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice";
import s from "./s.module.scss";
import Button from "../UI/Button";
import Badge from "../UI/Badge";
import Price from "../UI/Price";

function CardProduct({ product }) {

  const {
    id,
    image,
    title,
    price,
    discont_price,
    categoryId,
  } = product;

  const dispatch = useDispatch();

  function clickHeandler(e) {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <Link
      to={`/categories/${categoryId}/${id}`}
      className={s.card}
    >

      <Badge
        price={price}
        discont={discont_price}
        className={s.badge}
      />

      <img
        loading="lazy"
        className={s.img}
        src={image}
        alt={title}
      />

      <Button
        className={s.overlayButton}
        name="Add to cart"
        variant="orange"
        onClick={clickHeandler}
      />

      <div className={s.productInfo}>
        <p className={s.productInfoTitle}>{title}</p>
        <Price
          price={price}
          discont={discont_price}
        />
      </div>
    </Link>
  );
}

export default CardProduct;
