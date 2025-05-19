import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Button from "../UI/Button";
import img from "../../assets/img/discount_form.png";
import "./DiscountForm.scss";

function DiscountForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    setMessage(null);
    setMessageType(null);
  }, []);

  const onSubmit = (data) => {
    if (messageType === "success") {
      setMessage(null);
      setMessageType(null);
    }

    if (errors.name || errors.phone || errors.email) {
      setMessage("Please fill all fields correctly");
      setMessageType("error");
      return;
    }

    const storedData = JSON.parse(localStorage.getItem("discountData"));
    const isDuplicate =
      storedData &&
      storedData.phone === data.phone &&
      storedData.email === data.email;

    if (isDuplicate) {
      setMessage("Wrong input. Try again");
      setMessageType("error");
      return;
    }

    localStorage.setItem("discountData", JSON.stringify({
      phone: data.phone,
      email: data.email,
    }));

    setMessage("The discount has been successfully sent to your email.");
    setMessageType("success");
    reset();
  };

  return (
    <section className="discount-section">
      <h2 className="section-title">5% off on the first order</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="discount-section__form"
      >
        <input
          className="discount-section__input"
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        <input
          type="tel"
          placeholder="Phone number"
          {...register("phone", {
            required: true,
            pattern: /^\+?[0-9\s\-()]{7,20}$/,
          })}
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+\.\S+$/,
          })}
        />

        {message && (
          <p className={messageType === "success" ? "success-message" : "error-message"}>
            {message}
          </p>
        )}

        <Button
          name="Get a discount"
          type="submit"
          variant="white"
        />
      </form>

      <img
        className="discount-image"
        src={img}
        alt="disc"
      />
    </section>
  );
}

export default DiscountForm;
