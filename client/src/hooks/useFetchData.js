import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../utils/api";

export const useFetchData = (path) => {
  const navigate = useNavigate();

  const [data, setData] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await get(path);
      if (!data) return navigate("/not-found", { replace: true });
      setData(data);

    } catch (err) {
      console.error("Error fetching product data:", err);
      if (err.response && err.response.status === 404) {
        navigate("/not-found", { replace: true });
      } else {
        setError("Product data could not be loaded. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};
