import s from "./s.module.scss";

const DiscountCheckbox = ({
  discounted = false,
  onChangeReset
}) => {
  const handleChange = (e) => {
    onChangeReset(e.target.checked);
  };

  return (
    <div className={s.filterContainer}>
      <label className={s.label} htmlFor="checkboxDiscount">Discounted items</label>
      <input
        className={s.checkbox}
        id="checkboxDiscount"
        type="checkbox"
        checked={discounted}
        onChange={handleChange}
      />
    </div>
  );
};

export default DiscountCheckbox;

