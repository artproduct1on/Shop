import Icon from "../Icon";
import s from "./s.module.scss";
function QuantityInput({
  min = 1,
  max = 50,
  value = 1,
  onQuantityChange,
  className
}) {

  const checkMin = value <= min;
  const checkMax = value >= max;

  return (
    <div className={`${s.quantityInput} ${className}`}>
      <button
        onClick={() => !checkMin && onQuantityChange(-1)}
        disabled={checkMin}
        className={s.button}
      >
        <Icon id="minus" />
      </button>
      <span className={s.value}>{value}</span>
      <button
        onClick={() => !checkMax && onQuantityChange(1)}
        disabled={checkMax}
        className={s.button}
      >
        <Icon id="plus" />
      </button>
    </div>
  );
}

export default QuantityInput;
