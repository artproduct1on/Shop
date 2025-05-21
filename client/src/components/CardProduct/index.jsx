import React from "react";
import { Link } from "react-router-dom";
import s from "./s.module.scss";

function CardProduct({ product }) {
  const { id, image, title, price, discont_price } = product;
  const hasDiscount = discont_price && discont_price < price;
  const discountPercent = hasDiscount
    ? Math.round(100 - (discont_price / price) * 100)
    : null;

  return (
    <Link to={`/products/${id}`} className={s.saleCard}>
      <div className={s.imageWrapper}>
        {hasDiscount && <span className={s.badge}>-{discountPercent}%</span>}
        <img src={image} alt={title} className={s.saleImage} />
      </div>
      <div className={s.productInfo}>
        <p className={s.productTitle}>{title}</p>
        <div className={s.priceBlock}>
          {hasDiscount ? (
            <>
              <span className={s.newPrice}>${discont_price.toFixed(2)}</span>
              <span className={s.oldPrice}>${price.toFixed(2)}</span>
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
