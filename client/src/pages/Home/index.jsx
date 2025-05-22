import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "../../features/globalSlice";
import LinkPages from "../../components/UI/LinkPages";
import s from "./s.module.scss";
import CardCategory from "../../components/CardCategory";
import CardProduct from "../../components/CardProduct";
import Button from "../../components/UI/Button";
import Form from "../../components/Form";

function Home() {
  const dispatch = useDispatch();
  const {
    categories: { data: categories, status: categoryStatus, error: categoryError },
    products: { data: products, status: productsStatus, error: productsError },
  } = useSelector((state) => state.global);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategories());
    }
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, categoryStatus, productsStatus]);

  const saleProducts = products?.filter((product) => product.discont_price !== null).slice(0, 4);

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
  if (categoryStatus === "loading" || productsStatus === "loading") return <p>Loading ...</p>;
  if (categoryStatus === "failed" || productsStatus === "failed") return <p>Error: {categoryError || productsError}</p>;
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
          {categories.slice(0, 4).map((card) => (
            <CardCategory key={card.id} category={card} />
          ))}
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
          {saleProducts.length > 0 ? (
            saleProducts.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))
          ) : (
            <p>No sale products available</p>
          )}
        </div>
        <LinkPages
          to="/categories"
          title="On sale"
          className={s.sectionCardsLink}
        />

      </section>
    </>
  );
}

export default Home;
