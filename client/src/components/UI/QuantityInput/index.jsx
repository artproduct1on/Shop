import s from "./s.module.scss";
function QuantityInput({
  min = 1,
  max = 100,
  value = 1,
  onQuantityChange,
  className
}) {
  return (
    <div className={`${s.quantityInput} ${className}`}>
      <button
        onClick={() => onQuantityChange(1)}
        disabled={value <= min}
        className={s.button}
      >
        -
      </button>
      <span className={s.value}>{value}</span>
      <button
        onClick={() => onQuantityChange(-1)}
        disabled={value >= max}
        className={s.button}
      >
        +
      </button>
    </div>
  );
}

export default QuantityInput;
