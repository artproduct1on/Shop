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
import DiscountForm from "./components/Section_one/DiscountForm";
import PromoBanner from "./components/Section_three/PromoBanner";

const Home = lazy(() => import("./pages/Home"),);
const Products = lazy(() => import("./pages/Products"),);
const Product = lazy(() => import("./pages/Product"),);
const Categories = lazy(() => import("./pages/Categories"),);
const Cart = lazy(() => import("./pages/Cart"),);
const NotFound = lazy(() => import("./pages/NotFound"),);

function App() {

  return <>
    <Header />

    <Suspense fallback={<Loader />}>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <PromoBanner />
      <DiscountForm />

    </Suspense>

    <Footer />
  </>;
};

export default App;
