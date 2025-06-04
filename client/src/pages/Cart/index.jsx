import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  changeQuantity,
  clearCart,
} from "../../redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/UI/Button";
import Loader from "../../components/UI/Loader";
import Button from "../../components/UI/Button";

import Price from "../../components/UI/Price";
import Icon from "../../components/UI/Icon";
import QuantityInput from "../../components/UI/QuantityInput";
import SectionHeader from "../../components/SectionHeader";


const LOCAL_STORAGE_KEYS = {
  CART: "cart_state",
  DISCOUNT: "discount_request",
};

const API_POST = {
  ORDER: "/api/order/send",
};

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(null);
  const [formMessage, setFormMessage] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onChange" });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CART)) || [];
    const savedDiscount = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.DISCOUNT)) || null;
    setCartItems(savedCart);
    setDiscount(savedDiscount);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  let discountAmount = 0;
  if (discount) {
    if (discount.type === "percent") discountAmount = (subtotal * discount.value) / 100;
    else if (discount.type === "fixed") discountAmount = discount.value;
  }
  const dispatch = useDispatch();
  const { cartList, status } = useSelector((state) => state.cart);
  console.log(cartList);

  if (status === "loading") {
    return <Loader></Loader>;
  }
  if (status === "failed") {
    return <div className={s.cart}>Error loading cart</div>;
  }
  if (cartList.length === 0) {
    return (
      <>
        <section className={s.sectionCartIsEmpty}>
          <SectionHeader
            title="Shopping cart"
            LinkPagesTitle="Back to the store"
            LinkPagesTo="/"
          ></SectionHeader>
          <p>Looks like you have no items in your basket currently.</p>
          <Button
            name="Continue Shopping"
            to="/products"
            variant="green"
            className = {s.buttonCartisEmpty}
          ></Button>
        </section>
      </>
    );
  }
  const total = cartList.reduce(
    (sum, item) => sum + (item.discont_price || item.price) * item.quantity,
    0
  );

  const totalForm = Math.max(subtotal - discountAmount, 0);

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
      products: cartItems.map(({ id, quantity }) => ({ id, quantity })),
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
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CART);
      setCartItems([]);
      reset();
    } catch {
      setFormMessage({ type: "error", text: "Failed to place order." });
    }
  };

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
              <img src={item.image} className={s.cartImg}></img>
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
      </section>
       <section className={s.sectionFormCart}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.formCart}>
        <div className={s.summary}>
          <h2 className={s.orderDetails}>Order details</h2>
          <p>{itemCount} items</p>
          <p>Total ${totalForm.toFixed(2)}</p>
        </div>

        <input
          className={s.input}
          type="text"
          placeholder="Name"
          {...register("name", { validate: value => validateField("name", value) })}
        />
        {errors.name && <p className={s.error}>{errors.name.message}</p>}

        <input
          className={s.input}
          type="tel"
          placeholder="Phone"
          {...register("phone", { validate: value => validateField("phone", value) })}
        />
        {errors.phone && <p className={s.error}>{errors.phone.message}</p>}

        <input
          className={s.input}
          type="email"
          placeholder="Email"
          {...register("email", { validate: value => validateField("email", value) })}
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