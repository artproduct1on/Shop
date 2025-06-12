import s from "./s.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  changeQuantity,
  clearCart,
} from "../../redux/slices/cartSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { API_POST } from "../../utils/constants";
import { totalPrice, validateField } from "../../utils/helpers";
import { post } from "../../utils/api";

import Button from "../../components/UI/Button";
import Loader from "../../components/UI/Loader";
import Price from "../../components/UI/Price";
import Icon from "../../components/UI/Icon";
import QuantityInput from "../../components/UI/QuantityInput";
import SectionHeader from "../../components/SectionHeader";
import Input from "../../components/UI/Input";
import Error from "../../components/Error";

function Cart() {
  const dispatch = useDispatch();
  const { cartList, status, error } = useSelector((state) => state.cart);
  const [formMessage, setFormMessage] = useState(null);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const payload = {
      customer: data,
      products: cartList,
    };

    try {
      await post(API_POST.ORDER, JSON.stringify(payload));
      setFormMessage({ type: "success", text: "Order placed successfully!" });
      setIsOrderConfirmed(true);
    } catch {
      setFormMessage({ type: "error", text: "Failed to place order." });
    }
  };

  const handleCloseModal = () => {
    setIsOrderConfirmed(false);
    dispatch(clearCart()); 
    reset(); 
  };

  if (status === "loading") return <Loader />;
  if (status === "failed")
    return <Error error={error?.message || "error"} className={s.error} />;

  if (cartList.length === 0 && !isOrderConfirmed) {
    return (
      <section className={s.sectionCartIsEmpty}>
        <SectionHeader
          title="Shopping cart"
          LinkPagesTitle="Back to the store"
          LinkPagesTo="/"
        />
        <p className={s.sectionCartIsEmptyText}>
          Looks like you have no items in your basket currently.
        </p>
        <Button
          name="Continue Shopping"
          to="/products"
          variant="green"
          className={s.buttonCartisEmpty}
        />
      </section>
    );
  }

  const totalPriceFormated = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalPrice(cartList));

  const itemCount = cartList.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {isOrderConfirmed && (
        <div className={s.modal} onClick={handleCloseModal}>
          <div className={s.modalOverlay} onClick={(e) => e.stopPropagation()}>
            <div className={s.closeIcon} onClick={handleCloseModal}></div>
          <div className={s.modalContent}>
            <h2>Congratulations!</h2>
            <p>Your order has been successfully placed on the website.</p>
            <p>A manager will contact you shortly to confirm your order.</p>
            </div>
          </div>
        </div> 
      )}
      <section className={s.sectionCart}>
        <SectionHeader
          title="Shopping cart"
          LinkPagesTitle="Back to the store"
          LinkPagesTo="/"
          classNameLink={s.sectionCartHeaderLink}
        />

        <ul className={s.cartList}>
          {cartList.map((item) => (
            <li key={item.id} className={s.cartItem}>
              <img src={item.image} className={s.cartImg} alt={item.title} />
              <div className={s.cartContent}>
                <h3 className={s.cartContentTitle}>{item.title}</h3>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className={s.removeButton}
                >
                  <Icon id="clear" />
                </button>

                <QuantityInput
                  className={s.cartContentQuantity}
                  value={item.quantity}
                  min={1}
                  max={100}
                  onQuantityChange={(num) =>
                    dispatch(changeQuantity({ id: item.id, num }))
                  }
                />

                <Price
                  className={s.cartContentPrice}
                  price={item.price}
                  discont={item.discont_price}
                  quantity={item.quantity}
                  variant="small"
                />
              </div>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit(onSubmit)} className={s.formCart}>
          <div className={s.formCartSummary}>
            <h2 className={s.formCartSummaryTitle}>Order details</h2>
            <p className={s.formCartSummaryText}>{itemCount} items</p>
            <p className={s.formCartSummaryTotal}>
              Total
              <span className={s.formCartSummaryTotalPrice}>
                ${totalPriceFormated}
              </span>
            </p>
          </div>

          <Input
            variant="background"
            type="text"
            placeholder="Name"
            error={errors.name?.message}
            register={{
              ...register("name", {
                validate: (v) => validateField("name", v),
              }),
            }}
          />

          <Input
            variant="background"
            type="tel"
            placeholder="Phone Number"
            error={errors.phone?.message}
            register={{
              ...register("phone", {
                validate: (value) => validateField("phone", value),
              }),
            }}
          />

          <Input
            variant="background"
            type="email"
            placeholder="Email"
            error={errors.email?.message}
            register={{
              ...register("email", {
                validate: (value) => validateField("email", value),
              }),
            }}
          />
            {formMessage && (
              <p className={formMessage.type === "success" ? s.success : s.error}>
                {formMessage.text}
              </p>
            )}

            <Button name="Order" type="submit" />
          </form>
        </section>
    </>
  );
}

export default Cart;