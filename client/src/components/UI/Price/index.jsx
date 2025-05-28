import s from "./s.module.scss";
import formatPrice from "../../../utils/formatPrice";

function Price({
  price,
  discont,
  className = "",
  variant = "small"
}) {

  if (!price) return <p>No Price</p>;

  return discont && discont < price ? (
    <span data-variant={variant} className={`${s.newPrice} ${className}`}>
      ${formatPrice(discont)}
      <span data-variant={variant} className={s.oldPrice}>
        ${formatPrice(price)}
      </span>
    </span>
  ) : (
    <p data-variant={variant} className={`${s.newPrice} ${className}`}>
      ${price.toFixed(2)}
    </p>
  );

}

export default Price;
