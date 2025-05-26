import s from "./s.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { searchItemHelper } from "../../utils/helpers";
import CartProduct from "../../components/CardProduct";
import RouteTracker from "../../components/RouteTracker";
import productsPageSwitcher from "../../utils/productsPageSwitcher";
import FilterPrice from "../../components/Filter";

function Products() {
  const { pathname } = useLocation();
  const params = useParams();

  const {
    categories: { data: dataCategories },
    products: { data: dataProducts }
  } = useSelector((state) => state.global);

  const targetCategory = params.id && searchItemHelper(dataCategories, params.id);
  const { pathArray, sectionTitle } = productsPageSwitcher(pathname, targetCategory);

  const [filter, setFilter] = useState({
    from: '',
    to: '',
    discounted: false,
    sort: 'default'
  });

  const applyPriceRangeFilter = (products) => {
    const from = Number(filter.from);
    const to = Number(filter.to);

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
    filter.discounted
      ? products.filter(product => product.discont_price && product.discont_price < product.price)
      : products;

  const applySort = (products) => {
    const sorted = [...products];

    switch (filter.sort) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'price_desc':
        return sorted.sort((a, b) => {
          const aPrice = a.discont_price && a.discont_price < a.price ? a.discont_price : a.price;
          const bPrice = b.discont_price && b.discont_price < b.price ? b.discont_price : b.price;
          return bPrice - aPrice;
        });
      case 'price_asc':
        return sorted.sort((a, b) => {
          const aPrice = a.discont_price && a.discont_price < a.price ? a.discont_price : a.price;
          const bPrice = b.discont_price && b.discont_price < b.price ? b.discont_price : b.price;
          return aPrice - bPrice;
        });
      default:
        return sorted;
    }
  };

  const filteredProducts = applySort(
    applyDiscountFilter(
      applyPriceRangeFilter(dataProducts)
    )
  );

  return (
    <>
      <RouteTracker pathArray={pathArray} />
      <section className={s.section}>
        <h1 className="section-title">{sectionTitle}</h1>
      </section>

      <div className={s.filterContainer}>
        <FilterPrice onFilterChange={setFilter} />
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <CartProduct key={product.id} product={product} />
          ))
        ) : (
          <p className={s.noProducts}>No products found</p>
        )}
      </div>
    </>
  );
}

export default Products;
