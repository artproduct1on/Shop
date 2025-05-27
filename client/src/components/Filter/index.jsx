import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DiscountCheckbox from "../UI/Checkbox/index";
import s from "./s.module.scss";

const FilterPrice = ({ onFilterChange }) => {
  const location = useLocation();

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [discounted, setDiscounted] = useState(false);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    setPriceFrom("");
    setPriceTo("");
    setDiscounted(false);
    setSort("default");
  }, [location.pathname]);

  useEffect(() => {
    onFilterChange({
      from: priceFrom,
      to: priceTo,
      discounted,
      sort,
    });
  }, [priceFrom, priceTo, discounted, sort]);

  const priceFromHandler = (e) => {
    const value = Number(e.target.value);
    if (value >= 0 || e.target.value === "") {
      setPriceFrom(e.target.value);
    }
  };

  const priceToHandler = (e) => {
    const value = Number(e.target.value);
    if (value >= 0 || e.target.value === "") {
      setPriceTo(e.target.value);
    }
  };

  const resetFilter = (checked) => {
    setPriceFrom("");
    setPriceTo("");
    setSort("default");
    setDiscounted(checked);
  };

  return (
    <fieldset className={s.filter}>
      <div className={s.filterContainer}>
        <label className={s.label}>Price</label>
        <input
          className={s.filterInput}
          type="number"
          placeholder="from"
          min="0"
          value={priceFrom}
          onChange={priceFromHandler}
        />

        <input
          className={s.filterInput}
          type="number"
          placeholder="to"
          min={priceFrom || "0"}
          value={priceTo}
          onChange={priceToHandler}
        />
      </div>

      {location.pathname !== "/sales" && (
        <DiscountCheckbox
          discounted={discounted}
          onChangeReset={resetFilter}
        />
      )}

      <div className={s.filterContainer}>
        <label className={s.label} htmlFor="sort">Sorted</label>
        <select
          className={s.select}
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">by default</option>
          <option value="newest">newest</option>
          <option value="price_desc">price: high-low</option>
          <option value="price_asc">price: low-high</option>
        </select>
      </div>
    </fieldset>
  );
};

export default FilterPrice;
