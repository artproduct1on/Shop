import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getFromStorage, setToStorage } from "../../utils/localStorage";
import Loader from "../../components/UI/Loader";
import LinkPages from "../../components/UI/LinkPages";
import s from "./s.module.scss";
import CardCategory from "../../components/CardCategory";
import CardProduct from "../../components/CardProduct";
import Button from "../../components/UI/Button";
import Form from "../../components/Form";

function Home() {
  const [formMessage, setFormMessage] = useState(null);

  const {
    categories: { data: categories, status: categoryStatus, error: categoryError },
    products: { data: products, status: productsStatus, error: productsError },
  } = useSelector((state) => state.global);

  const categoriesArray = categories?.slice(0, 4);
  const productsArray = products?.filter((product) => product.discont_price !== null).slice(0, 4);

  useEffect(() => {
    setFormMessage(null);
  }, []);

  const onSubmit = (data) => {
    const storedData = getFromStorage("discountData");

    if (storedData &&
      storedData.phone === data.phone &&
      storedData.email === data.email) {
      setFormMessage({ type: "error", text: "Wrong input. Try again" });
      return;
    };

    setToStorage("discountData", {
      phone: data.phone,
      email: data.email,
    });

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

      <section className={s.sectionCards}>
        <h2 className="section-title">Categories</h2>
        <hr className={s.sectionCardsDivider} />
        <div className={s.sectionCardsContainer}>
          {
            categoryStatus === "idle" ||
              categoryStatus === "loading" ?
              <Loader />
              : categoryStatus === "failed" ?
                <h3>Error: {categoryError}</h3>
                : categoriesArray.map((card) => <CardCategory key={card.id} category={card} />)
          }
        </div>
        <LinkPages
          to="/categories"
          title="All categories"
          className={s.sectionCardsLink}
        />
      </section>

      <section className={s.discount}>
        <h2 className={s.discountTitle}>5% off on the first order</h2>
        <Form onSubmit={onSubmit} formMessage={formMessage} />
      </section>

      <section className={s.sectionCards}>
        <h2 className="section-title">Sale</h2>
        <hr className={s.sectionCardsDivider} />
        <div className={s.sectionCardsContainer}>
          {
            productsStatus === "idle" ||
              productsStatus === "loading" ?
              <Loader />
              : productsStatus === "failed" ?
                <h3>Error: {productsError}</h3>
                : productsArray.length === 0 ?
                  <h3>No sale products available</h3>
                  : productsArray.map((product) => <CardProduct key={product.id} product={product} />)
          }
        </div>
        <LinkPages
          to="/categories"
          title="All sales"
          className={s.sectionCardsLink}
        />

      </section>
    </>
  );
}

export default Home;
