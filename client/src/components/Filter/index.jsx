import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DiscountCheckbox from "../UI/Checkbox/index";
import s from "./s.module.scss";
import Select from "../UI/Select";

const FilterPrice = ({ onFilterChange }) => {
  const location = useLocation();

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [discounted, setDiscounted] = useState(false);
  const [sort, setSort] = useState({ value: "default", title: "by default" });

  const resetFilter = (checked) => {
    setPriceFrom("");
    setPriceTo("");
    setSort({ value: "default", title: "by default" });
    setDiscounted(checked);
  };

  useEffect(() => resetFilter(), [location.pathname]);

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

        <Select
          id="sort"
          value={sort}
          onChange={(i) => setSort(i)}
          options={[
            { value: "default", title: "by default" },
            { value: "newest", title: "newest" },
            { value: "price_desc", title: "price: high-low" },
            { value: "price_asc", title: "rice: low-high" },
          ]}
        />

      </div>
    </fieldset>
  );
};

export default FilterPrice;
