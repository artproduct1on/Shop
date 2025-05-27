import { Link } from "react-router-dom";
import s from "./s.module.scss";
import formatPrice from "../../utils/formatPrice";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import Badge from "../UI/Baige";
import Price from "../UI/Price";

function CardProduct({ product }) {
  const { id, image, title, price, discont_price, categoryId } = product;
  const dispatch = useDispatch();

  function clickHeandler(e) {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <Link to={`/categories/${categoryId}/${id}`} className={s.card}>

      <Badge price={price} discont_price={discont_price} />

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
          <Price
            price={price}
            discont_price={discont_price} />
        </div>
      </div>
    </Link>
  );
}

export default CardProduct;
