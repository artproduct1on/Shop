import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import s from "./s.module.scss";
import Button from "../../components/UI/Button";
import img from "../../assets/img/discount_form.png";
import Input from "../../components/UI/Input";

function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onSubmit" });

  const [formMessage, setFormMessage] = useState(null);

  useEffect(() => {
    setFormMessage(null);
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        if (value.length > 50) return "Name must be under 50 characters";
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

  const onSubmit = (data) => {
    const storedData = JSON.parse(localStorage.getItem("discountData"));
    const isDuplicate =
      storedData &&
      storedData.phone === data.phone &&
      storedData.email === data.email;

    if (isDuplicate) {
      setFormMessage({ type: "error", text: "Wrong input. Try again" });
      return;
    }

    localStorage.setItem(
      "discountData",
      JSON.stringify({
        phone: data.phone,
        email: data.email,
      })
    );

    setFormMessage({
      type: "success",
      text: "The discount has been successfully sent to your email.",
    });
    reset();
  }

  return (
    <>
      <section className={s.banner}>
        <h1 className={s.bannerTitle}>
          Amazing Discounts <br />
          on Garden Products!
        </h1>
        <Button to="/all-sales" name="Check out" />
      </section>

      <section className={s.discount}>
        <h2 className={s.discountTitle}>5% off on the first order</h2>

           <div className={s.discountContent}>
          <form onSubmit={handleSubmit(onSubmit)} className={s.discountForm} noValidate>
            <Input
              className={s.discountInput}
              type="text"
              placeholder="Name"
              {...register("name", {
                validate: (value) => validateField("name", value),
              })}
            />

            <Input
              className={s.discountInput}
              type="tel"
              placeholder="Phone Number"
              {...register("phone", {
                validate: (value) => validateField("phone", value),
              })}
            />

            <Input
              className={s.discountInput}
              type="email"
              placeholder="Email"
              {...register("email", {
                validate: (value) => validateField("email", value),
              })}
            />

            {Object.keys(errors).length > 0 && (
              <p className={s.error}>
                {errors.name?.message || errors.phone?.message || errors.email?.message}
              </p>
            )}

            {formMessage && (
              <p className={formMessage.type === "success" ? s.success : s.error}>
                {formMessage.text}
              </p>
            )}

            <Button name="Get a discount" type="submit" variant="white" className={s.discountButton} />
          </form>
          <img className={s.discountImage} src={img} alt="disc" />
        </div>
      </section>
    </>
  );
}

export default Home;