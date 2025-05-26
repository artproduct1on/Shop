import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import s from "./s.module.scss";

const FilterPrice = ({ onFilterChange }) => {
  const location = useLocation();

  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [discounted, setDiscounted] = useState(false);
  const [sort, setSort] = useState('default');

  useEffect(() => {
    onFilterChange({
      from: priceFrom,
      to: priceTo,
      discounted,
      sort,
    });
  }, [priceFrom, priceTo, discounted, sort]);

  return (
    <fieldset className={s.filter}>
      <div className={s.filterContainer}>
        <label>Price</label>
        <input
          className={s.filterInput}
          type="number"
          placeholder="from"
          min="0"
          value={priceFrom}
          onChange={(e) => {
          const value = Number(e.target.value);
            if (value >= 0 || e.target.value === "") {
              setPriceFrom(e.target.value);
            }
          }}
        />

        <input
          className={s.filterInput}
          type="number"
          placeholder="to"
          min="0"
          value={priceTo}
          onChange={(e) => {
          const value = Number(e.target.value);
            if (value >= 0 || e.target.value === '') {
              setPriceTo(e.target.value);
            }
          }}
        />
      </div>

      {location.pathname !== "/sales" && (
        <div className={s.filterContainer}>
          <label for="checkboxDiscount">Discounted items</label>
          <input
            id= "checkbox"
            type="checkbox"
            checked={discounted}
            onChange={(e) => setDiscounted(e.target.checked)}
          />
        </div>
      )}

      <div className={s.filterContainer}>
        <label for="sort">Sorted</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={s.sort}
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