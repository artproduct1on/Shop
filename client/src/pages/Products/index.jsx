import { useState } from "react";
import s from "./s.module.scss";
import { useFetchData } from "../../hooks/useFetchData.js";
import Loader from "../../components/UI/Loader";
import { useParams, useLocation } from "react-router-dom";
import CartProduct from "../../components/CardProduct";
import RouteTracker from "../../components/RouteTracker";
import Filter from "../../components/Filter";
import { pageSwitcher } from "./utils.js";
import { API_GET } from "../../utils/constants.js";

function Products() {
  const [filterProducts, setFilterProducts] = useState({
    from: "",
    to: "",
    discounted: false,
    sort: { value: "default", title: "by default" }
  });

  const { pathname } = useLocation();
  const { categoryId } = useParams();

  const { data, loading, error } = useFetchData(
    categoryId ? API_GET.CATEGORIES + categoryId : API_GET.PRODUCTS + "all"
  );

  const info = !loading && pageSwitcher(pathname, data);

  const applyPriceRangeFilter = (products) => {
    const from = Number(filterProducts.from);
    const to = Number(filterProducts.to);

    return products.filter(product => {
      const actualPrice = product.discont_price && product.discont_price < product.price
        ? product.discont_price
        : product.price;

      const meetsFrom = !from || actualPrice >= from;
      const meetsTo = !to || actualPrice <= to;

      if (from && to && to < from) return false;

      return meetsFrom && meetsTo;
    });
  };

  const applyDiscountFilter = (products) =>
    filterProducts.discounted
      ? products.filter(product => product.discont_price && product.discont_price < product.price)
      : products;

  const applySort = (products) => {
    const sorted = [...products];

    switch (filterProducts.sort.value) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "price_desc":
        return sorted.sort((a, b) => {
          const aPrice = a.discont_price && a.discont_price < a.price ? a.discont_price : a.price;
          const bPrice = b.discont_price && b.discont_price < b.price ? b.discont_price : b.price;
          return bPrice - aPrice;
        });
      case "price_asc":
        return sorted.sort((a, b) => {
          const aPrice = a.discont_price && a.discont_price < a.price ? a.discont_price : a.price;
          const bPrice = b.discont_price && b.discont_price < b.price ? b.discont_price : b.price;
          return aPrice - bPrice;
        });
      default:
        return sorted;
    }
  };

  if (loading || !info) return <Loader />;

  const filteredProducts = applySort(applyDiscountFilter(applyPriceRangeFilter(info.productsList)));

  return (
    <>
      <RouteTracker pathArray={info.pathArray} />

      <section className={s.section}>
        <h1 className="section-title">{info.sectionTitle}</h1>
        <Filter onFilterChange={setFilterProducts} />

        {info.productsList.length > 0 ?
          <ul className={s.productsList}>
            {filteredProducts.map(product =>
              <li key={product.id} className={s.productsListItem}>
                <CartProduct product={product} />
              </li>
            )}
          </ul>
          : <h3 className={s.noProducts}>No products found</h3>
        }
      </section >
    </>
  );
}

export default Products;
