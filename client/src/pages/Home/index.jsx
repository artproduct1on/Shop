import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "../../features/globalSlice";
import { Link } from "react-router-dom";
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
      {/* Категории */}
      <section className={s.section}>
        <div className={s.sectionHeader}>
          <div className={s.sectionHeaderContent}>
            <h2 className="section-title">Categories</h2>
            <div className={s.sectionDivider}></div>
            <div className={`${s.actions} ${s.actionsHeader}`}>
              <Link to="/categories" className={s.allCategories}>All categories</Link>
            </div>
          </div>
        </div>

        <div className={s.categoryGrid}>
          {categories.slice(0, 4).map((card) => (
            <CardCategory key={card.id} category={card} />
          ))}
        </div>

        <div className={`${s.actions} ${s.actionsFooter}`}>
          <Link to="/categories" className={s.allCategories}>All categories</Link>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.sectionHeader}>
          <div className={s.sectionHeaderContent}>
            <h2 className="section-title">Sale</h2>
            <div className={s.sectionDivider}></div>
            <div className={`${s.actions} ${s.actionsHeader}`}>
              <Link to="/products" className={s.allCategories}>On sale</Link>
            </div>
          </div>
        </div>

        <div className={s.saleGrid}>
          {saleProducts.length > 0 ? (
            saleProducts.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))
          ) : (
            <p>No sale products available</p>
          )}
        </div>

        <div className={`${s.actions} ${s.actionsFooter}`}>
          <Link to="/products" className={s.allCategories}>On sale</Link>
        </div>
      </section>
    </>
  );
}

export default Home;
