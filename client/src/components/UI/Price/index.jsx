import s from "./s.module.scss"; 
import formatPrice from "../../../utils/formatPrice";
function Price({ discont_price, price, newPriceClass = "", oldPriceClass = "" }) {
  const hasDiscount = discont_price && discont_price < price;
  return (<>
    {hasDiscount ? (
      <>
        <span className={`${s.newPrice} ${newPriceClass}`}>${formatPrice(discont_price)}</span>
        <span className={`${s.oldPrice} ${oldPriceClass}`}>${formatPrice(price)}</span>
      </>
    ) : (
      <span className={`${s.newPrice} ${newPriceClass}`}>${price.toFixed(2)}</span>
    )}
  </>
  );
}

export default Price;
