import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  changeQuantity,
  clearCart,
} from "../../redux/slices/cartSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Button from "../../components/UI/Button";
import Loader from "../../components/UI/Loader";
import Price from "../../components/UI/Price";
import Icon from "../../components/UI/Icon";
import QuantityInput from "../../components/UI/QuantityInput";
import SectionHeader from "../../components/SectionHeader";

import s from "./s.module.scss";

const API_POST = {
  ORDER: "/api/order/send",
};

function Cart() {
  const dispatch = useDispatch();
  const { cartList, status } = useSelector((state) => state.cart);
  const [formMessage, setFormMessage] = useState(null);
  const [discount, setDiscount] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const subtotal = cartList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  let discountAmount = 0;
  if (discount) {
    if (discount.type === "percent") discountAmount = (subtotal * discount.value) / 100;
    else if (discount.type === "fixed") discountAmount = discount.value;
  }

  const total = Math.max(subtotal - discountAmount, 0);
  const itemCount = cartList.reduce((acc, item) => acc + item.quantity, 0);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "Name is required";
        if (value.length < 2) return "Enter at least 2 letters";
        if (value.length > 50) return "Enter no more than 50 letters";
        return true;
      case "phone":
        if (!value) return "Phone number is required";
        if (!/^\+?[0-9\s\-()]{7,20}$/.test(value)) return "Invalid phone number";
        return true;
      case "email":
        if (!value) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email format";
        return true;
      default:
        return true;
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      customer: data,
      products: cartList.map(({ id, quantity }) => ({ id, quantity })),
      discount,
      total,
    };

    try {
      await fetch(API_POST.ORDER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setFormMessage({ type: "success", text: "Order placed successfully!" });
      dispatch(clearCart());
      reset();
    } catch {
      setFormMessage({ type: "error", text: "Failed to place order." });
    }
  };

  if (status === "loading") return <Loader />;
  if (status === "failed") return <div className={s.cart}>Error loading cart</div>;
  if (cartList.length === 0) {
    return (
      <section className={s.sectionCartIsEmpty}>
        <SectionHeader
          title="Shopping cart"
          LinkPagesTitle="Back to the store"
          LinkPagesTo="/"
        />
        <p>Looks like you have no items in your basket currently.</p>
        <Button
          name="Continue Shopping"
          to="/products"
          variant="green"
          className={s.buttonCartisEmpty}
        />
      </section>
    );
  }

  return (
    <>
      <section className={s.sectionCart}>
        <SectionHeader
          title="Shopping cart"
          LinkPagesTitle="Back to the store"
          LinkPagesTo="/"
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
          <div className={s.summaryFormCart}>
            <h2>Order details</h2>
            <p>{itemCount} items</p>
             <p>Total
              <span className={s.totalPriceCart}>${total.toFixed(2)}</span>
             </p>
          </div>

          <input
            className={s.input}
            type="text"
            placeholder="Name"
            {...register("name", { validate: (v) => validateField("name", v) })}
          />
          {errors.name && <p className={s.error}>{errors.name.message}</p>}

          <input
            className={s.input}
            type="tel"
            placeholder="Phone Number"
            {...register("phone", { validate: (v) => validateField("phone", v) })}
          />
          {errors.phone && <p className={s.error}>{errors.phone.message}</p>}

          <input
            className={s.input}
            type="email"
            placeholder="Email"
            {...register("email", { validate: (v) => validateField("email", v) })}
          />
          {errors.email && <p className={s.error}>{errors.email.message}</p>}

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

{
  /* <p className={s.total}>Total: ${formatPrice(total)}</p> */
}