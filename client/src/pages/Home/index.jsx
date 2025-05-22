import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "../../features/globalSlice";
import LinkPages from "../../components/UI/LinkPages";
import s from "./s.module.scss";
import CardCategory from "../../components/CardCategory";
import CardProduct from "../../components/CardProduct";

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

  if (categoryStatus === "loading") return <p>Loading categories...</p>;
  if (categoryStatus === "failed") return <p>Error: {categoryError}</p>;

  if (productsStatus === "loading") return <p>Loading products...</p>;
  if (productsStatus === "failed") return <p>Error: {productsError}</p>;

  const saleProducts = products.filter((product) => product.discont_price !== null).slice(0, 4);

  return (
    <>
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
