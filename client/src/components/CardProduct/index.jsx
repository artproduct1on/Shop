import React from "react";
import { Link } from "react-router-dom";
import s from "./s.module.scss";
import formatPrice from "../../utils/formatPrice";

function CardProduct({ product }) {
  const { id, image, title, price, discont_price, categoryId } = product;
  const hasDiscount = discont_price && discont_price < price;
  const discountPercent = hasDiscount
    ? Math.round(100 - (discont_price / price) * 100)
    : null;

  return (
    <Link to={`/categories/${categoryId}/${id}`} className={s.saleCard}>
      <div className={s.imageWrapper}>
        {hasDiscount && <span className={s.badge}>-{discountPercent}%</span>}
        <img src={image} alt={title} className={s.saleImage} />
      </div>
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
