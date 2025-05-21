import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "../../features/globalSlice";
import { Link } from "react-router-dom";
import s from "./s.module.scss";

function Home() {
  const dispatch = useDispatch();
  const {
    categories: { data: categories, status: categoryStatus, error: categoryError },
    products: { data: products, status: productsStatus, error: productsError },
    urlCategories,
    urlProducts,
  } = useSelector((state) => state.global);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategories(urlCategories));
    }
    if (productsStatus === "idle") {
      dispatch(fetchProducts(urlProducts));
    }
  }, [dispatch, categoryStatus, urlCategories, urlProducts, productsStatus]);

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
          <h2 className={s.categoriesTitle}>Categories</h2>
        </div>
        <div className={s.categoryGrid}>
          {categories.slice(0, 4).map((category) => (
            <Link
              to={`/categories/${category.id}`}
              key={category.id}
              className={s.categoryCard}
            >
              <img
                src={`http://localhost:3333${category.image}`}
                alt={category.title}
                className={s.categoryImage}
              />
              <p className={s.categoryName}>{category.title}</p>
            </Link>
          ))}
        </div>
        <div className={s.actions}>
          <Link to="/categories" className={s.allCategories}>
            All categories
          </Link>
        </div>
      </section>

      {/* Скидки */}
      <section className={s.section} style={{ marginTop: "7.24rem" }}>
        <div className={s.sectionHeader}>
          <h2 className={s.saleTitle}>Sale</h2>
        </div>
        <div className={s.saleGrid}>
          {saleProducts.length > 0 ? (
            saleProducts.map((product) => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className={s.saleCard}
              >
                <div className={s.imageWrapper}>
                  {product.discont_price &&
                    product.discont_price < product.price && (
                    <span className={s.badge}>
                        -
                      {Math.round(
                        100 -
                            (product.discont_price / product.price) * 100
                      )}
                        %
                    </span>
                  )}
                  <img
                    src={`http://localhost:3333${product.image}`}
                    alt={product.title}
                    className={s.saleImage}
                  />
                </div>
                <div className={s.productInfo}>
                  <p className={s.productTitle}>{product.title}</p>
                  <div className={s.priceBlock}>
                    {product.discont_price &&
                    product.discont_price < product.price ? (
                        <>
                          <span className={s.newPrice}>
                          ${product.discont_price.toFixed(2)}
                          </span>
                          <span className={s.oldPrice}>
                          ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className={s.newPrice}>
                        ${product.price.toFixed(2)}
                        </span>
                      )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No sale products available</p>
          )}
        </div>
        <div className={s.actions}>
          <Link to="/products" className={s.allCategories}>
            on sale
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
