import {
  lazy,
  Suspense,
} from "react";
import {
  Route,
  Routes,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/UI/Loader";
import useAppInitializer from "./hooks/useAppInitializer";
import useScrollToTop from "./hooks/useScrollToTop";

const Home = lazy(() => import("./pages/Home"),);
const Products = lazy(() => import("./pages/Products"),);
const Product = lazy(() => import("./pages/Product"),);
const Categories = lazy(() => import("./pages/Categories"),);
const Cart = lazy(() => import("./pages/Cart"),);
const NotFound = lazy(() => import("./pages/NotFound"),);

function App() {

  useAppInitializer();
  useScrollToTop();

  return <>
    <Header />

    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/categories" element={<Categories />} />

        <Route path="/categories/:id/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Products />} />

        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>

    <Footer />
  </>;
};

export default App;
