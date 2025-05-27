import s from "./s.module.scss";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { searchItemHelper } from "../../utils/helpers";
import RouteTracker from "../../components/RouteTracker";
import productsPageSwitcher from "../../utils/productsPageSwitcher";

function Products() {
  const { pathname } = useLocation();
  const params = useParams();

  const {
    categories: { data: dataCategories, status: categoryStatus, error: categoryError },
  } = useSelector((state) => state.global);
  const targetCategory = params.id && searchItemHelper(dataCategories, params.id);

  // Function for switching between "All sales", "All products" and "Products of Category"
  const { pathArray, sectionTitle } = productsPageSwitcher(pathname, targetCategory);

  return <>
    <RouteTracker pathArray={pathArray} />
    <section className={s.section}>
      <h1 className="section-title">{sectionTitle}</h1>
    </section>
  </>;
}

export default Products;
