
import s from "./s.module.scss";

function Badge({ price, discont_price, newBadgeClass }) {
  const hasDiscount = discont_price && discont_price < price;
  const discountPercent = hasDiscount
    ? Math.round(100 - (discont_price / price) * 100)
    : null;
  return hasDiscount ? <span className={`${s.badge} ${newBadgeClass}`}>-{discountPercent}%</span> : null;
}

export default Badge; 
