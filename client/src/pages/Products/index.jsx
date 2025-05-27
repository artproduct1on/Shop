import s from "./s.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { searchItemHelper } from "../../utils/helpers";
import CartProduct from "../../components/CardProduct";
import RouteTracker from "../../components/RouteTracker";
import FilterPrice from "../../components/Filter";
import { pageSwitcher } from "./utils.js";

function Products() {
  const { pathname } = useLocation();
  const params = useParams();

  const {
    categories: { data: dataCategories },
    products: { data: allProducts = [] }
  } = useSelector((state) => state.global);

  const targetCategory = params.id && searchItemHelper(dataCategories, params.id);
  const { pathArray, sectionTitle } = pageSwitcher(pathname, targetCategory);

  const [filter, setFilter] = useState({
    from: '',
    to: '',
    discounted: false,
    sort: 'default'
  });

  const categoryProducts = params.id
    ? allProducts.filter(product => String(product.categoryId) === params.id)
    : allProducts;

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
      applyPriceRangeFilter(categoryProducts)
    )
  );


  return (
   <>
    <RouteTracker pathArray={pathArray} />

    <section className={s.section}>
      <h1 className="section-title">{sectionTitle}</h1>
      <FilterPrice onFilterChange={setFilter} />

      {filteredProducts.length > 0 ?
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
