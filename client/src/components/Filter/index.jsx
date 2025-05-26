import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import s from "./s.module.scss";

const FilterPrice = ({ onFilterChange }) => {
  const location = useLocation();

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [discounted, setDiscounted] = useState(false);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    onFilterChange({
      from: priceFrom,
      to: priceTo,
      discounted,
      sort,
    });
  }, [priceFrom, priceTo, discounted, sort]);

  const priceFromHeandler = (e) => {
    const value = Number(e.target.value);
    if (value >= 0 || e.target.value === "") {
      setPriceFrom(e.target.value);
    }
  };

  const PriceToHeandler = (e) => {
    const value = Number(e.target.value);
    if (value >= 0 || e.target.value === "") {
      setPriceTo(e.target.value);
    }
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
          onChange={priceFromHeandler}
        />

        <input
          className={s.filterInput}
          type="number"
          placeholder="to"
          min={priceFrom}
          value={priceTo}
          onChange={PriceToHeandler}
        />
      </div>

      {location.pathname !== "/sales" && (
        <div className={s.filterContainer}>
          <label className={s.label} htmlFor="checkboxDiscount">Discounted items</label>
          <input
            className={s.checkbox}
            id="checkbox"
            type="checkbox"
            checked={discounted}
            onChange={(e) => setDiscounted(e.target.checked)}
          />
        </div>
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
