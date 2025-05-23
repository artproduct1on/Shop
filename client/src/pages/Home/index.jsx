import { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/UI/Loader";
import LinkPages from "../../components/UI/LinkPages";
import s from "./s.module.scss";
import CardCategory from "../../components/CardCategory";
import CardProduct from "../../components/CardProduct";
import Button from "../../components/UI/Button";
import Form from "../../components/Form";
import discountService from "../../services/discountService";

function Home() {
  const [formMessage, setFormMessage] = useState(null);

  const {
    categories: { data: dataCategories, status: categoryStatus, error: categoryError },
    products: { data: dataProducts, status: productsStatus, error: productsError },
  } = useSelector((state) => state.global);

  const categoriesArray = dataCategories?.slice(0, 4);
  const productsArray = dataProducts?.filter((product) => product.discont_price !== null).slice(0, 4);

  const onSubmit = async (data) => setFormMessage(await discountService(data));

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
          title="On sale"
          className={s.sectionCardsLink}
        />

      </section>
    </>
  );
}

export default Home;
