import s from "./s.module.scss";
import { useState } from "react"
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { searchItemHelper } from "../../utils/helpers";
import RouteTracker from "../../components/RouteTracker";
import productsPageSwitcher from "../../utils/productsPageSwitcher";
import FilterPrice from "../../components/Filter/index.jsx";


function Products() {
  const { pathname } = useLocation();
  const params = useParams();

  const {
    categories: { data: dataCategories, status: categoryStatus, error: categoryError },
    products: { data: dataProducts = [], status: productsStatus, error: productsError }
  } = useSelector((state) => state.global);
  const targetCategory = params.id && searchItemHelper(dataCategories, params.id);

  // Function for switching between "All sales", "All products" and "Products of Category"
  const { pathArray, sectionTitle } = productsPageSwitcher(pathname, targetCategory);

  const [filter, setFilter] = useState({
    from: '',
    to: '',
    discounted: false,
    sort: 'default'
  });
  const getFilteredProducts = () => {
  let products = Array.isArray(dataProducts) ? [...dataProducts] : [];

  if (filter.from) {
    products = products.filter(product => {
      const discountedPrice = product.price * (1 - product.discount / 100);
      return discountedPrice >= Number(filter.from);
    });
  }

  if (filter.to) {
    products = products.filter(product => {
      const discountedPrice = product.price * (1 - product.discount / 100);
      return discountedPrice <= Number(filter.to);
    });
  }

  if (filter.discounted) {
    products = products.filter(product => product.discount > 0);
  }

  switch (filter.sort) {
    case 'newest':
      products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'price_desc':
      products.sort((a, b) => {
        const aPrice = a.price * (1 - a.discount / 100);
        const bPrice = b.price * (1 - b.discount / 100);
        return bPrice - aPrice;
      });
      break;
    case 'price_asc':
      products.sort((a, b) => {
        const aPrice = a.price * (1 - a.discount / 100);
        const bPrice = b.price * (1 - b.discount / 100);
        return aPrice - bPrice;
      });
      break;
    default:
      break;
  }

  return products;
};

  const filteredProducts = getFilteredProducts();

  return <>
    <RouteTracker pathArray={pathArray} />
    <section className={s.section}>
      <h1 className="section-title">{sectionTitle}</h1>

      
    </section>
     <div className={s.filterContainer}>
          <FilterPrice onFilterChange={setFilter} />
          {/* {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className={s.noProducts}>No products found</p>
          )} */}
        </div>
  </>;
}

export default Products;
