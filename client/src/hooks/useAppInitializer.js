import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeCartFromLocalStorage } from "../redux/slices/cartSlice";
import { fetchCategories, fetchProducts } from "../redux/slices/globalSlice";

const useAppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCartFromLocalStorage());
    dispatch(fetchCategories());
    dispatch(fetchProducts());

  }, [dispatch]);
};

export default useAppInitializer;
