import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeCartFromLocalStorage } from "../redux/slices/cartSlice";

const useAppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCartFromLocalStorage());

  }, [dispatch]);
};

export default useAppInitializer;
