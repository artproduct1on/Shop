import { useState, useEffect } from "react";
import s from "./s.module.scss";
import Form from "../../components/Form";
import Button from "../../components/UI/Button";

function Home() {


  const [formMessage, setFormMessage] = useState(null);

  useEffect(() => {
    setFormMessage(null);
  }, []);

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
  };

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
        <Form onSubmit={onSubmit} formMessage={formMessage} />
      </section>
    </>
  );
}

export default Home;
