import s from "./s.module.scss";
import { formatPrice } from "../../../utils/helpers";

function Price({
  price,
  discont,
  className = "",
  variant = "small",
  quantity = 1,
}) {

  if (!price) return <p>No Price</p>;

  return discont && discont < price ? (
    <p
      className={`${s.newPrice} ${className}`}
      data-variant={variant}
    >
      ${formatPrice(discont)}

      <span
        className={s.oldPrice}
        data-variant={variant}
      >
        ${formatPrice(price)}
      </span>

    </p>
  ) : (
    <p
      data-variant={variant}
      className={`${s.newPrice} ${className}`}
    >
      ${formatPrice(price)}
    </p>
  );

}

export default Price;
