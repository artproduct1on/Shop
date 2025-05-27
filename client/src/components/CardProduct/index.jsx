import { Link } from "react-router-dom";
import s from "./s.module.scss";
import formatPrice from "../../utils/formatPrice";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

function CardProduct({ product }) {
  const { id, image, title, price, discont_price } = product;
  const hasDiscount = discont_price && discont_price < price;
  const discountPercent = hasDiscount
    ? Math.round(100 - (discont_price / price) * 100)
    : null;
  const dispatch = useDispatch();

  function clickHeandler(e) {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <Link to={`/products/${id}`} className={s.card}>

      {hasDiscount && <span className={s.badge}>-{discountPercent}%</span>}

      <img className={s.img} src={image} alt={title} />

      <Button
        className={s.overlayButton}
        name="Add to cart"
        variant="orange"
        onClick={clickHeandler}
      />

      <div className={s.productInfo}>
        <p className={s.productTitle}>{title}</p>
        <div className={s.priceBlock}>
          {hasDiscount ? (
            <>
              <span className={s.newPrice}>${formatPrice(discont_price)}</span>
              <span className={s.oldPrice}>${formatPrice(price)}</span>
            </>
          ) : (
            <span className={s.newPrice}>${price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CardProduct;
