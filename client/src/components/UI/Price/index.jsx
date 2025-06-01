import s from "./s.module.scss";
import formatPrice from "../../../utils/formatPrice";

function Price({
  price,
  discont,
  className = "",
  variant = "small",
  quantity = 1,
}) {

  if (!price) return <p>No Price</p>;
  const totalPrice = price * quantity;
  const totalDiscontPrice = discont ? discont * quantity : null;

  return discont && discont < price ? (
    <span data-variant={variant} className={`${s.newPrice} ${className}`}>
      ${formatPrice(totalDiscontPrice)}
      <span data-variant={variant} className={s.oldPrice}>
        ${formatPrice(totalPrice)}
      </span>
    </span>
  ) : (
    <p data-variant={variant} className={`${s.newPrice} ${className}`}>
      ${formatPrice(totalPrice)}
    </p>
  );

}

export default Price;
