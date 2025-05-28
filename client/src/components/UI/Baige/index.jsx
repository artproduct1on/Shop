
import s from "./s.module.scss";

function Badge({ price, discont, newBadgeClass }) {
  const hasDiscount = discont && discont < price;
  const discountPercent = hasDiscount
    ? Math.round(100 - (discont / price) * 100)
    : null;
  return hasDiscount ? <span className={`${s.badge} ${newBadgeClass}`}>-{discountPercent}%</span> : null;
}

export default Badge; 
