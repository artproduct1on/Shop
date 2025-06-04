import { useState } from "react";
import Loader from "../../components/UI/Loader";
import LinkPages from "../../components/UI/LinkPages";
import s from "./s.module.scss";
import CardCategory from "../../components/CardCategory";
import CardProduct from "../../components/CardProduct";
import Button from "../../components/UI/Button";
import Form from "../../components/Form";
import discountService from "../../services/discountService";
import { useFetchData } from "../../hooks/useFetchData";
import { API_GET } from "../../utils/constants";
import SectionHeader from "../../components/SectionHeader";

function Home() {
  const [formMessage, setFormMessage] = useState(null);

  const categories = useFetchData(API_GET.CATEGORIES + "all");
  const products = useFetchData(API_GET.PRODUCTS + "all");

  const categoriesArray = categories.data?.slice(0, 4);
  const productsArray = products.data?.filter((product) => product.discont_price !== null).slice(0, 4);

  const onSubmit = async (data) => setFormMessage(await discountService(data));

  return (
    <>
      <section className={s.banner}>
        <h1 className={s.bannerTitle}>
          Amazing Discounts <br />
          on Garden Products!
        </h1>
        <Button to="/sales" name="Check out" />
      </section>

      <section className={s.sectionCards}>
        <SectionHeader
          title="Categories"
          LinkPagesTitle="All categories"
          LinkPagesTo="/categories"
        />
        <div className={s.sectionCardsContainer}>
          {
            categories.loading ?
              <Loader />
              : categories.error ?
                <h3>Error: {categories.error}</h3>
                : categoriesArray.map((card) => <CardCategory key={card.id} category={card} />)
          }
        </div>

      </section>

      <section className={s.discount}>
        <h2 className={s.discountTitle}>5% off on the first order</h2>
        <Form onSubmit={onSubmit} formMessage={formMessage} />
      </section>

      <section className={s.sectionCards}>

        <SectionHeader
          title="Sale"
          LinkPagesTitle="All sale"
          LinkPagesTo="/sales"
        />

        <div className={s.sectionCardsContainer}>
          {
            products.loading ?
              <Loader />
              : products.error ?
                <h3>Error: {products.error}</h3>
                : productsArray.length === 0 ?
                  <h3>No sale products available</h3>
                  : productsArray.map((product) => <CardProduct key={product.id} product={product} />)
          }
        </div>
      </section>
    </>
  );
}

export default Home;
