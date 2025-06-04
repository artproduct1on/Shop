import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/UI/Button";
import s from "./s.module.scss";

const LOCAL_STORAGE_KEYS = {
  CART: "cart_state",
  DISCOUNT: "discount_request",
};

const API_POST = {
  ORDER: "/api/order/send",
};

function CartForm() {
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

  const total = Math.max(subtotal - discountAmount, 0);

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
    <section className={s.sectionFormCart}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.formCart}>
        <div className={s.summary}>
          <h2 className={s.orderDetails}>Order details</h2>
          <p>{itemCount} items</p>
          <p>Total ${total.toFixed(2)}</p>
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
  );
}

export default CartForm;
